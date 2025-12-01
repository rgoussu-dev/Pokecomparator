import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Label } from '../../atoms/label/label';
import { CommonModule } from '@angular/common';
import { Box, Button, Cluster, Frame, Icon, ThemeToggle} from '@ui';

@Component({
  selector: 'pc-header',
  imports: [CommonModule, Label, Box, Cluster, Frame, Button, ThemeToggle],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  @Input() title: string | null = null;
  @Input() logoSrc: string | null = null; // image source for the logo
  @Input() links: Array<{ label: string; href: string, callback: () => void }> = [];
  @Input() subtitle: string | null = null;
  @Output() onThemeChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  handleThemeChange(isDark: boolean) {
    this.onThemeChange.emit(isDark);
  }
}
