import { Component, Input } from '@angular/core';

@Component({
  selector: 'pc-label',
  templateUrl: './label.html',
  styleUrls: ['./label.css'],
  host: { 'data-pc-component': 'label' }
})
export class Label {
  @Input() text: string = '';
  @Input() for: string = '';
  @Input() required: boolean = false;
}
