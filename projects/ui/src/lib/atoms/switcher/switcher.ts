import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ALL_SIZES, Size } from '../../types/size';
import { generateSignature, injectStyle, sanitizeCssValue } from '../helpers/atom-config-helper';

@Component({
  selector: 'pc-switcher',
  imports: [],
  templateUrl: './switcher.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Switcher implements OnInit, OnChanges {

  @Input() threshold: Size | string = 's2';
  @Input() gap: Size = 's1';
  @Input() limit: number = 4;
  ident?: string;
  config: { threshold: string; gap: string; limit: number; } | null = null;

  constructor() {
  }

  ngOnInit(): void {
    this.updateConfigAndSignature();
    this.updateStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.ident) return;
    // If any input that affects layout changed, refresh the injected style
    if (changes['threshold'] || changes['gap'] || changes['limit']) {
      this.updateConfigAndSignature();
      this.updateStyle();
    }
  }

  updateConfigAndSignature() {
    const threshold = ALL_SIZES.includes(this.threshold as Size) ? `var(--${this.threshold})` : sanitizeCssValue(this.threshold);
    const gap = ALL_SIZES.includes(this.gap as Size) ? `var(--${this.gap})` : sanitizeCssValue(this.gap);
    const limit = Math.max(1, Math.floor(Number(this.limit) || 1));
    this.config = {
      threshold,
      gap,
      limit
    };
    const signature = `pc-switcher-${generateSignature(this.config)}`
    this.ident = signature;
  }

  private generateStyle(signature: string, config: { gap: string; threshold: string; limit: number }): string {
    const { gap, threshold, limit } = config;
    return `
    .switcher[data-pc-switcher="${signature}"]{
      display: flex;
      flex-wrap: wrap;
      gap: ${gap};
    }

    .switcher[data-pc-switcher="${signature}"] > * {
        flex-grow: 1;
        flex-basis: calc((${threshold} - 100%) * 999);
    }

    .switcher[data-pc-switcher="${signature}"] > :nth-child(n+${limit+1}),
    .switcher[data-pc-switcher="${signature}"] > :nth-child(n+${limit+1}) ~ * {
        flex-basis: 100%;
    }
  `;
  }

  private updateStyle(): void {
    if (!this.config || !this.ident) return;

    const style = this.generateStyle(this.ident, this.config);
    injectStyle("pc-switcher",this.ident, style);
  }
}
