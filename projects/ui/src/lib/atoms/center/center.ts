import { Component, Input, SimpleChanges } from '@angular/core';
import { ALL_SIZES, Size } from '../../types/size';
import { generateSignature, injectStyle, sanitizeCssValue } from '../helpers/atom-config-helper';

@Component({
  selector: 'pc-center',
  imports: [],
  templateUrl: './center.html',
  styleUrl: './center.css',
})
export class Center {
  @Input() maxWidth: Size = 'measure';
  @Input() centerText: boolean = false;
  @Input() intrinsic: boolean = false;
  @Input() gutterWidth: Size | null = null;
  ident: string | null = null;
  config: { maxWidth: string; centerText: boolean; intrinsic: boolean; gutterWidth: string | null; } 
  | null = null;

    ngOnInit(): void {
    this.updateConfigAndSignature();
    this.updateStyle();
  }

    ngOnChanges(changes: SimpleChanges): void {
    if (!this.ident) return;
    if (changes['padding'] || changes['borderWidth'] || changes['backgroundColor'] || changes['color']) {
      this.updateConfigAndSignature();
      this.updateStyle();
    }
  }

  updateStyle() {
    if (!this.config || !this.ident) return;
    const style = this.generateStyle(this.ident, this.config);
    injectStyle('pc-center', this.ident, style);

  }
  updateConfigAndSignature() {
        const config = {
      maxWidth: ALL_SIZES.includes(this.maxWidth) ? `var(--${this.maxWidth})` : sanitizeCssValue(this.maxWidth),
      centerText: this.centerText,
      intrinsic: this.intrinsic,
      gutterWidth: this.gutterWidth == null ? null : ALL_SIZES.includes(this.gutterWidth) ? `var(--${this.gutterWidth})` : sanitizeCssValue(this.gutterWidth),
    };
    this.config = config;
    const signature = `pc-center-${generateSignature(config)}`;
    this.ident = signature;
  }

  private generateStyle(signature: string, config: { maxWidth: string; centerText: boolean; intrinsic: boolean; gutterWidth: string | null; }): string {
    const { maxWidth, centerText, intrinsic, gutterWidth } = config;
    return `
    .center[data-pc-center="${signature}"] {
        box-sizing: content-box;
        margin-inline: auto;
        max-inline-size: ${maxWidth};
        ${centerText ? 'text-align: center;' : ''}
        ${intrinsic ? '    display:flex; flex-direction: column; align-items: center;' : ''}
        ${gutterWidth != null ? `padding-inline-start: ${gutterWidth}; padding-inline-end: ${gutterWidth};` : ''}
  }
    `;
  }
}
