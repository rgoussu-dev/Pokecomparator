import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../atoms/button/button';
import { Icon } from '../../atoms/icon/icon';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'pc-theme-toggle',
  standalone: true,
  imports: [CommonModule, Button, Icon],
  templateUrl: './theme-toggle.html',
  styleUrls: ['./theme-toggle.css'],
  host: { 'data-pc-component': 'theme-toggle' }
})
export class ThemeToggle {
  private readonly themeService = inject(ThemeService);
  
  readonly isDark = this.themeService.isDark;

  onToggle() {
    this.themeService.toggleTheme();
  }
}
