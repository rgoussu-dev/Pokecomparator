import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Size } from '../../types/size';

@Component({
  selector: 'stack',
  imports: [],
    templateUrl: './stack.html',
    styleUrl: './stack.css',
  encapsulation: ViewEncapsulation.None
})
export class Stack {
  @Input() space: Size = 's-1';
  @Input() recursive: boolean = false;
}
