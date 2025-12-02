import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from '../../atoms/button/button';
import { Icon } from '../../atoms/icon/icon';
import { ThemeService } from '../../services/theme.service';

/**
 * A toggle button for switching between light and dark themes.
 *
 * @description
 * The ThemeToggle component provides a simple button interface for toggling
 * between light and dark color themes. It integrates with the ThemeService
 * to persist theme preference and update the application-wide theme.
 *
 * Key features:
 * - One-click theme switching
 * - Visual feedback showing current theme
 * - Persists theme preference via ThemeService
 * - Icon changes based on current theme
 * - Accessible button implementation
 * - Reactive using Angular signals
 *
 * The component displays a sun icon for light theme and moon icon for dark theme,
 * allowing users to easily identify and toggle the current theme state.
 *
 * @example
 * Basic theme toggle in header:
 * ```html
 * <pc-header>
 *   <pc-theme-toggle></pc-theme-toggle>
 * </pc-header>
 * ```
 *
 * @example
 * Standalone theme toggle:
 * ```html
 * <pc-theme-toggle></pc-theme-toggle>
 * ```
 *
 * @usageNotes
 * - Automatically syncs with ThemeService for theme state
 * - Theme preference is typically stored in localStorage via ThemeService
 * - The toggle button uses appropriate ARIA labels for accessibility
 * - Icon automatically updates to reflect current theme
 * - Works application-wide through the ThemeService
 * - Component is standalone and can be used independently
 * - Typically placed in header or navigation components
 * - No configuration needed - works out of the box
 *
 * @see {@link ThemeService} for theme state management
 * @see {@link Button} for the underlying button component
 * @see {@link Icon} for icon display
 * @see {@link Header} for common placement location
 *
 * @publicApi
 */
@Component({
  selector: 'pc-theme-toggle',
  standalone: true,
  imports: [CommonModule, Button, Icon],
  templateUrl: './theme-toggle.html',
  styleUrls: ['./theme-toggle.css'],
  host: { 'data-pc-component': 'theme-toggle' }
})
export class ThemeToggle {
  /** Theme service for managing application theme state. @internal */
  private readonly themeService = inject(ThemeService);
  
  /** Signal indicating whether dark theme is currently active. */
  readonly isDark = this.themeService.isDark;

  /**
   * Toggles between light and dark themes.
   * @internal
   */
  onToggle() {
    this.themeService.toggleTheme();
  }
}
