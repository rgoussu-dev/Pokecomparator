import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Size, ALL_SIZES } from '../../types/size';
import { generateSignature, injectStyle, sanitizeCssValue } from '../helpers/atom-config-helper';

@Component({
  selector: 'pc-box',
  imports: [],
  templateUrl: './box.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Box implements OnInit, OnChanges {
  @Input() padding: Size | string = 's1';
  @Input() borderWidth: Size | string | null = null;
  @Input() borderRadius: Size | string | null = null;
  @Input() backgroundColor: string | null = null;
  @Input() color?: string = undefined;

  ident?: string;
  config: { padding: string; borderWidth: string | null; backgroundColor: string; color: string } | null = null;

  constructor(private el: ElementRef) {}

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

  updateConfigAndSignature() {
    const padding = ALL_SIZES.includes(this.padding as Size) 
    ? `var(--${this.padding})` 
    : sanitizeCssValue(this.padding);
    const borderWidth = this.borderWidth != null ? (ALL_SIZES.includes(this.borderWidth as Size) 
    ? `var(--${this.borderWidth})`
     : sanitizeCssValue(this.borderWidth as string)) 
     : null;
    const borderRadius = this.borderRadius != null ? (ALL_SIZES.includes(this.borderRadius as Size) 
    ? `var(--${this.borderRadius})`
    : sanitizeCssValue(this.borderRadius as string)) 
    : null;
    const backgroundColor = sanitizeCssValue(this.backgroundColor || 'transparent');
    const color = sanitizeCssValue(this.color || 'inherit');

    this.config = {
      padding,
      borderWidth,
      backgroundColor,
      color
    };

    const signature = `pc-box-${generateSignature(this.config)}`;
    this.ident = signature;
  }

  private generateStyle(signature: string, config: { 
    padding: string; 
    borderWidth: string | null; 
    backgroundColor: string; 
    color: string }): string {

    const { padding, borderWidth, backgroundColor, color } = config;
    return `
    .box[data-pc-box="${signature}"] {
        padding: ${padding};
        ${backgroundColor != null && `background-color: ${backgroundColor};`}
        ${color != null && `color: ${color};`}
        ${borderWidth != null && borderWidth !== '0' &&  `border: ${borderWidth} solid;`}
        ${borderWidth == null || borderWidth === '0' 
          ? `border: 0 solid; outline: var(--s-1) solid transparent; outline-offset: calc(var(--s-1) * -1);` : ``}  
    }
    .box[data-pc-box="${signature}"] * {
      color: inherit;
    }`; 
  }

  private updateStyle(): void {
    if (!this.config || !this.ident) return;
    const style = this.generateStyle(this.ident, this.config);
    injectStyle('pc-box', this.ident, style);
  }
}
