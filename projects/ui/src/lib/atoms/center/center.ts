import { Component, Input } from '@angular/core';
import { Size } from '../../types/size';

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
}
