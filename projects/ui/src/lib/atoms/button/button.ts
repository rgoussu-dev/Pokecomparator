import { Component, Input } from '@angular/core';

/**
 * A versatile button component with multiple variants and sizes.
 *
 * @description
 * The Button component is a core interactive element in the UI library that provides
 * consistent styling and behavior across the application. It supports multiple visual
 * variants (primary, secondary, ghost), different sizes (sm, md, lg), and accessibility
 * features. The component automatically handles disabled states and can be configured
 * to span the full width of its container.
 *
 * Key features:
 * - Three visual variants for different hierarchies of actions
 * - Three size options for various layout contexts
 * - Full-width mode for mobile-friendly layouts
 * - Rounded corners option for softer visual treatment
 * - Built-in accessibility with ARIA label support
 * - Native HTML button types (button, submit, reset)
 *
 * @example
 * Basic usage with primary variant:
 * ```html
 * <pc-button (click)="handleClick()">
 *   Click me
 * </pc-button>
 * ```
 *
 * @example
 * Secondary button with custom size:
 * ```html
 * <pc-button variant="secondary" size="lg">
 *   Large Button
 * </pc-button>
 * ```
 *
 * @example
 * Full-width submit button with loading state:
 * ```html
 * <pc-button
 *   type="submit"
 *   variant="primary"
 *   [fullWidth]="true"
 *   [disabled]="isLoading"
 *   ariaLabel="Submit registration form">
 *   {{ isLoading ? 'Submitting...' : 'Submit' }}
 * </pc-button>
 * ```
 *
 * @example
 * Ghost button with rounded corners:
 * ```html
 * <pc-button
 *   variant="ghost"
 *   [rounded]="true"
 *   ariaLabel="Close dialog">
 *   Close
 * </pc-button>
 * ```
 *
 * @usageNotes
 * - Use `primary` variant for the main call-to-action on a page or section
 * - Use `secondary` variant for alternative or less important actions
 * - Use `ghost` variant for subtle actions or when button needs to blend with background
 * - Always provide `ariaLabel` when the button content is not descriptive text (e.g., icons only)
 * - The `type` input defaults to 'button' to prevent accidental form submissions
 * - Set `fullWidth` to true for mobile-friendly or card-based layouts
 * - Use `rounded` for a softer, friendlier appearance in marketing or onboarding contexts
 *
 * @publicApi
 */
@Component({
  selector: 'pc-button',
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
  host: { 'data-pc-component': 'button' }
})
export class Button {
  /** The HTML button type attribute. Defaults to 'button' to prevent accidental form submissions. */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  
  /** Whether the button is disabled. When true, button cannot be clicked and appears visually disabled. */
  @Input() disabled = false;
  
  /** 
   * Visual variant of the button.
   * - `primary`: Main call-to-action with high visual prominence
   * - `secondary`: Alternative action with medium prominence
   * - `ghost`: Subtle action with minimal visual weight
   */
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  
  /** 
   * Size of the button.
   * - `sm`: Small size for compact layouts
   * - `md`: Medium size (default) for most use cases
   * - `lg`: Large size for hero sections or primary actions
   */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  
  /** 
   * Optional ARIA label for accessibility. 
   * Should be provided when button content is not descriptive (e.g., icon-only buttons).
   */
  @Input() ariaLabel?: string;
  
  /** 
   * Whether button should span full width of container.
   * Useful for mobile layouts and card-based designs.
   */
  @Input() fullWidth = false;
  
  /** 
   * Whether button should have rounded corners.
   * Provides a softer, friendlier appearance.
   */
  @Input() rounded = false;
  
}
