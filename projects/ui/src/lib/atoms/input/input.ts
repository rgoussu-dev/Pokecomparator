import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * A flexible input component for text entry and form data collection.
 *
 * @description
 * The InputAtom component provides a standardized text input field with support
 * for various input types, two-way data binding, and accessibility features.
 * It handles user input events and emits changes to allow parent components
 * to react to user interactions.
 *
 * Key features:
 * - Support for multiple HTML input types (text, password, email, number, etc.)
 * - Two-way data binding through value input and valueChange output
 * - Built-in disabled state handling
 * - Placeholder text support
 * - Accessibility with ARIA labels
 * - Consistent styling across the application
 *
 * @example
 * Basic text input:
 * ```html
 * <pc-input
 *   [value]="userName"
 *   (valueChange)="userName = $event"
 *   placeholder="Enter your name"
 *   ariaLabel="User name">
 * </pc-input>
 * ```
 *
 * @example
 * Password input with disabled state:
 * ```html
 * <pc-input
 *   type="password"
 *   [value]="password"
 *   (valueChange)="onPasswordChange($event)"
 *   [disabled]="isLoading"
 *   placeholder="Enter password"
 *   ariaLabel="Password">
 * </pc-input>
 * ```
 *
 * @example
 * Email input with validation:
 * ```html
 * <pc-input
 *   type="email"
 *   [value]="email"
 *   (valueChange)="validateEmail($event)"
 *   placeholder="user@example.com"
 *   ariaLabel="Email address">
 * </pc-input>
 * ```
 *
 * @example
 * Number input for quantity:
 * ```html
 * <pc-input
 *   type="number"
 *   [value]="quantity"
 *   (valueChange)="updateQuantity($event)"
 *   placeholder="0"
 *   ariaLabel="Quantity">
 * </pc-input>
 * ```
 *
 * @usageNotes
 * - Always provide a descriptive `ariaLabel` for accessibility
 * - Use appropriate `type` attribute to leverage browser validation and mobile keyboards
 * - The component emits on every input event, allowing real-time validation
 * - Consider pairing with `pc-label` component for form field labels
 * - Use `placeholder` to provide hints, not as a replacement for labels
 * - Handle `valueChange` events in parent component for form state management
 *
 * @see {@link Label} for labeling form inputs
 *
 * @publicApi
 */
@Component({
  selector: 'pc-input',
  templateUrl: './input.html',
  styleUrls: ['./input.css'],
  host: { 'data-pc-component': 'input' }
})
export class InputAtom {
  /** Current value of the input field. */
  @Input() value = '';
  
  /** Placeholder text shown when input is empty. Should provide a hint about expected input. */
  @Input() placeholder = '';
  
  /** Whether the input is disabled. When true, input cannot be edited and appears visually disabled. */
  @Input() disabled = false;
  
  /** 
   * HTML input type attribute.
   * Supports: text, password, email, number, tel, url, search, etc.
   * Affects keyboard type on mobile devices and browser validation.
   */
  @Input() type = 'text';
  
  /** 
   * ARIA label for accessibility.
   * Should describe the purpose of the input field for screen readers.
   */
  @Input() ariaLabel = '';
  
  /** Emits the new value whenever the input changes. Enables two-way data binding. */
  @Output() valueChange = new EventEmitter<string>();

  /**
   * Handles input events and emits the new value.
   * @param event - The native input event
   * @internal
   */
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.valueChange.emit(input.value);
  }
}
