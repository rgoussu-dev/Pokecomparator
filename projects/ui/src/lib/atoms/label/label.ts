import { Component, Input } from '@angular/core';

/**
 * A semantic label component for form inputs and interactive elements.
 *
 * @description
 * The Label component provides a standardized way to label form inputs
 * and other interactive elements. It properly associates labels with their
 * corresponding inputs using the 'for' attribute, improving accessibility
 * and user experience. The component also supports required field indicators.
 *
 * Key features:
 * - Proper form input association via 'for' attribute
 * - Required field indicator with asterisk
 * - Consistent styling across the application
 * - Accessibility-friendly with proper ARIA attributes
 * - Works seamlessly with other form components
 *
 * @example
 * Basic label for text input:
 * ```html
 * <pc-label text="Username" for="username-input"></pc-label>
 * <pc-input id="username-input" ariaLabel="Username"></pc-input>
 * ```
 *
 * @example
 * Required field label:
 * ```html
 * <pc-label text="Email" for="email-input" [required]="true"></pc-label>
 * <pc-input id="email-input" type="email" ariaLabel="Email address"></pc-input>
 * ```
 *
 * @example
 * Label in a complete form group:
 * ```html
 * <div class="form-group">
 *   <pc-label text="Password" for="pwd" [required]="true"></pc-label>
 *   <pc-input
 *     id="pwd"
 *     type="password"
 *     [value]="password"
 *     (valueChange)="password = $event"
 *     ariaLabel="Password">
 *   </pc-input>
 * </div>
 * ```
 *
 * @usageNotes
 * - Always set the `for` attribute to match the ID of the associated input
 * - Use `required` to indicate mandatory fields with an asterisk (*)
 * - The asterisk is automatically hidden from screen readers (aria-hidden="true")
 * - Label text should be concise and descriptive
 * - Clicking the label will focus the associated input (native browser behavior)
 * - For better UX, place labels above or to the left of their inputs
 *
 * @see {@link InputAtom} for text input component
 * @see {@link Button} for button component
 *
 * @publicApi
 */
@Component({
  selector: 'pc-label',
  templateUrl: './label.html',
  styleUrls: ['./label.css'],
  host: { 'data-pc-component': 'label' }
})
export class Label {
  /** The text content of the label. Should clearly describe the associated input. */
  @Input() text = '';
  
  /** 
   * The ID of the input element this label is associated with.
   * Must match the ID attribute of the target input for proper association.
   */
  @Input() for = '';
  
  /** 
   * Whether the associated field is required.
   * When true, displays an asterisk (*) next to the label text.
   */
  @Input() required = false;
}
