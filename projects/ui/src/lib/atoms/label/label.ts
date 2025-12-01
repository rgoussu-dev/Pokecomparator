import { Component, Input } from '@angular/core';

@Component({
  selector: 'pc-label',
  templateUrl: './label.html',
  styleUrls: ['./label.css']
})
export class Label {
  @Input() text: string = '';
  @Input() for: string = '';
  @Input() required: boolean = false;
}
