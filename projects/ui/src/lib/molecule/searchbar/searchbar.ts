import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Label } from '../../atoms/label/label';
import { InputAtom } from '../../atoms/input/input';
import { Box, Button, Center, Cluster, Icon, Stack } from '@ui';
@Component({
  selector: 'pc-searchbar',
  imports: [Label, InputAtom, Cluster, Stack, Icon, Button],
  templateUrl: './searchbar.html',
  host: { 'data-pc-component': 'searchbar' }
})
export class Searchbar {
  @Input() value: string = '';
  @Input() placeholder: string ='';
  @Input() label: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() buttonIcon: string | null= null;
  @Input() buttonLabel: string | null= null;
  @Output() valueChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();


  onInputChange(val: string) {
    this.valueChange.emit(val);
  }

  onSearch() {
    this.search.emit(this.value);
  }
}
