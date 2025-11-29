import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Size } from '../../types/size';

@Component({
  selector: 'pc-box',
  imports: [],
  templateUrl: './box.html',
  styleUrl: './box.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class Box {
  @Input() padding: Size = 's1';
  @Input() borderWidth: Size | null = null;
  @Input() backgroundColor?: string = undefined;
  @Input() color?: string = undefined;
}
