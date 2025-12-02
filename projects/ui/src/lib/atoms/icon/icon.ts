import { ChangeDetectionStrategy, Component, ElementRef, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { generateSignature, injectStyle, sanitizeCssValue } from '../helpers/atom-config-helper';
import { ALL_SIZES, Size } from '../../types/size';

/**
 * An icon component for displaying SVG icons from a sprite sheet.
 *
 * @description
 * The Icon component provides a standardized way to display SVG icons throughout
 * the application using an SVG sprite system. It dynamically generates styles
 * based on configuration, supports custom spacing, and includes accessibility
 * features. The component uses Angular's OnPush change detection for optimal
 * performance.
 *
 * Key features:
 * - SVG sprite-based icon system for performance
 * - Configurable spacing between icon and adjacent content
 * - Dynamic style generation with unique signatures
 * - Automatic sizing relative to font size (1cap)
 * - Accessibility support with ARIA labels
 * - Proper baseline alignment with text
 * - Automatic cleanup on component destroy
 *
 * The component generates unique CSS classes based on configuration,
 * allowing multiple instances with different settings to coexist.
 *
 * @example
 * Basic icon usage:
 * ```html
 * <pc-icon iconHref="#icon-search" label="Search"></pc-icon>
 * ```
 *
 * @example
 * Icon with custom spacing:
 * ```html
 * <pc-icon
 *   iconHref="#icon-user"
 *   space="s-2"
 *   label="User profile">
 * </pc-icon>
 * ```
 *
 * @example
 * Icon with text content (inline):
 * ```html
 * <pc-icon iconHref="#icon-warning" space="s-1" label="Warning">
 *   Important Notice
 * </pc-icon>
 * ```
 *
 * @example
 * Icon with custom pixel spacing:
 * ```html
 * <pc-icon
 *   iconHref="#icon-star"
 *   space="8px"
 *   label="Favorite">
 * </pc-icon>
 * ```
 *
 * @usageNotes
 * - The `iconHref` should reference an icon in the SVG sprite (format: #icon-name)
 * - Use `space` input to control spacing between icon and adjacent content
 * - Spacing can be a CSS custom property (e.g., 's-1', 's-2') or custom value (e.g., '10px')
 * - Always provide a `label` when the icon conveys meaning (not purely decorative)
 * - When label is provided, the component adds role="img" for screen readers
 * - Icons automatically size to 1cap (approximately 0.75em) for consistent alignment
 * - The component cleans up generated styles and attributes on destroy
 * - Use with pc-button for icon buttons
 *
 * @see {@link Button} for button component that can contain icons
 * @see Size type definition for available spacing sizes
 *
 * @publicApi
 */
@Component({
  selector: 'pc-icon',
  template: `
    <span class="with-icon" [attr.data-pc-icon]="ident" [attr.aria-label]="label ? label : null" [attr.role]="label ? 'img' : null">
      <svg class="icon" [attr.data-pc-icon]="ident">
        <use [attr.href]="iconHref"></use>
      </svg>
    </span>
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'data-pc-component': 'icon' }
})
export class Icon implements OnInit, OnChanges, OnDestroy {
  /** 
   * Spacing between icon and adjacent content.
   * Can be a Size token (s-5 through s5) or a custom CSS value (e.g., '10px', '1rem').
   * When null, no spacing is applied.
   */
  @Input() space: Size | string | null = null;
  
  /** 
   * Accessible label for the icon.
   * When provided, adds aria-label and role="img" for screen readers.
   * Should describe the meaning or purpose of the icon.
   */
  @Input() label: string | null = null;
  
  /** 
   * Reference to the icon in the SVG sprite.
   * Format: #icon-name (e.g., #icon-search, #icon-user)
   */
  @Input() iconHref = '';

  /** Unique identifier for this icon instance, generated from configuration. @internal */
  ident?: string;
  
  /** Current configuration object used for style generation. @internal */
  config: { space: string | null; label: string | null } | null = null;

  private readonly element = inject(ElementRef);

  ngOnInit(): void {
    this.updateConfigAndSignature();
    this.updateStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.ident) return;
    if (changes['space'] || changes['label']) {
      this.updateConfigAndSignature();
      this.updateStyle();
    }
  }

  /**
   * Updates the configuration and generates a unique signature.
   * @internal
   */
  updateConfigAndSignature() {
    const space = this.space === null ? null:  ALL_SIZES.includes(this.space as Size) ? `var(--${this.space})` : sanitizeCssValue(this.space as string);
    const label = this.label;
    this.config = { space, label };
    const signature = `pc-icon-${generateSignature(this.config)}`;
    this.ident = signature;
  }

  ngOnDestroy(): void {
    try {
      const host = this.element.nativeElement as HTMLElement;
      host.removeAttribute('data-pc-icon');
      host.classList.remove('with-icon');
    } catch {
      console.warn('Could not clean up Icon attributes on destroy');
    }
  }

  /**
   * Generates CSS styles for this icon instance.
   * @param signature - Unique identifier for this configuration
   * @param config - Configuration object with spacing
   * @returns CSS string
   * @internal
   */
  private generateStyle(signature: string, config: { space: string | null; label: string | null }): string {
    const { space } = config;
    return `
        .icon[data-pc-icon="${signature}"] {
        width: 0.75em;
        width: 1cap;
        height: 0.75em;
        height: 1cap;
        ${space !== null ? `margin-inline-end: ${space};` : ''}
      }
      .with-icon[data-pc-icon="${signature}"] {
        display: inline-flex;
        align-items: baseline;
      }
 
    `;
  }

  /**
   * Injects the generated styles and updates host attributes.
   * @internal
   */
  private updateStyle(): void {
    if (!this.config || !this.ident) return;
    const style = this.generateStyle(this.ident, this.config);
    injectStyle('pc-icon', this.ident, style);
    const host = this.element.nativeElement as HTMLElement;
    host.classList.add('with-icon');
    host.setAttribute('data-pc-icon', this.ident);
  }
}
