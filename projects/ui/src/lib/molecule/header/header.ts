import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Label } from '../../atoms/label/label';
import { CommonModule } from '@angular/common';
import { Box } from '../../atoms/box/box';
import { Cluster } from '../../atoms/cluster/cluster';
import { Frame } from '../../atoms/frame/frame';
import { Button } from '../../atoms/button/button';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { NavigationService } from '../../services/navigation.service';

/**
 * A comprehensive header component for application navigation and branding.
 *
 * @description
 * The Header molecule provides a standardized navigation bar with support for
 * branding (logo and title), navigation links, theme switching, and custom
 * actions. It combines multiple atomic components to create a cohesive
 * application header that works across all microfrontends.
 *
 * Key features:
 * - Logo display with click handling
 * - Application title and optional subtitle
 * - Navigation links with callbacks
 * - Integrated theme toggle
 * - Responsive layout using Cluster
 * - Consistent styling across microfrontends
 * - NavigationService integration for routing
 *
 * The component is designed to be the primary navigation element and should
 * typically be placed at the top of the application layout.
 *
 * @example
 * Basic header with title and logo:
 * ```html
 * <pc-header
 *   title="PokeComparator"
 *   logoSrc="/assets/logo.png"
 *   (logoClick)="navigateHome()">
 * </pc-header>
 * ```
 *
 * @example
 * Full-featured header with navigation:
 * ```html
 * <pc-header
 *   title="PokeComparator"
 *   subtitle="Compare your favorite Pokemon"
 *   logoSrc="/assets/logo.png"
 *   [links]="navigationLinks"
 *   (logoClick)="goToHome()">
 * </pc-header>
 *
 * // In component:
 * navigationLinks = [
 *   { label: 'Catalog', href: '/catalog', callback: () => this.router.navigate(['/catalog']) },
 *   { label: 'Compare', href: '/compare', callback: () => this.router.navigate(['/compare']) }
 * ];
 * ```
 *
 * @example
 * Header with custom navigation:
 * ```html
 * <pc-header
 *   title="My App"
 *   [links]="[
 *     { label: 'Home', href: '/', callback: navigateHome },
 *     { label: 'About', href: '/about', callback: navigateAbout }
 *   ]">
 * </pc-header>
 * ```
 *
 * @usageNotes
 * - Place at the top of your application layout
 * - Each navigation link should have label, href, and callback
 * - The callback function is called when the link is clicked
 * - Use logoClick event to handle logo/brand click actions
 * - The component automatically includes a theme toggle
 * - NavigationService is injected for internal navigation handling
 * - Links are displayed in a horizontal cluster that wraps on small screens
 * - The header uses consistent spacing and styling from the design system
 * - Subtitle is optional and displayed below the title when provided
 *
 * @see {@link ThemeToggle} for theme switching functionality
 * @see {@link Button} for navigation buttons
 * @see {@link Cluster} for link layout
 * @see {@link NavigationService} for navigation handling
 *
 * @publicApi
 */
@Component({
  selector: 'pc-header',
  imports: [CommonModule, Label, Box, Cluster, Frame, ThemeToggle, Button],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  host: { 'data-pc-component': 'header' }
})
export class Header {
  /** 
   * Main title text displayed in the header.
   * Typically the application or feature name.
   */
  @Input() title: string | null = null;
  
  /** 
   * Logo image source URL.
   * When provided, displays a logo image that can be clicked.
   */
  @Input() logoSrc: string | null = null;
  
  /** 
   * Navigation links array.
   * Each link object should contain: label (display text), href (URL), and callback (click handler).
   */
  @Input() links: { label: string; href: string, callback: () => void }[] = [];
  
  /** 
   * Optional subtitle text displayed below the title.
   * Useful for taglines or context information.
   */
  @Input() subtitle: string | null = null;
  
  /** 
   * Event emitted when the logo is clicked.
   * Typically used to navigate to the home page.
   */
  @Output() logoClick: EventEmitter<void> = new EventEmitter<void>();

  /** Navigation service for handling route changes. @internal */
  readonly navigationService = inject(NavigationService);

  /**
   * Handles logo click events and emits logoClick output.
   * @internal
   */
  onLogoClick(): void {
    this.logoClick.emit();
  }
}
