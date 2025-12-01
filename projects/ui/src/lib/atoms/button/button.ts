import { Component, Input } from '@angular/core';

@Component({
  selector: 'pc-button',
  templateUrl: './button.html',
  styleUrls: ['./button.css']
})
export class Button {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() ariaLabel?: string;
  @Input() fullWidth: boolean = false;
  @Input() rounded: boolean = false;
  
}
