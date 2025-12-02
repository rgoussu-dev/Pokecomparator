import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Label } from '../../atoms/label/label';
import { InputAtom } from '../../atoms/input/input';
import { Button } from '../../atoms/button/button';
import { Cluster } from '../../atoms/cluster/cluster';
import { Icon } from '../../atoms/icon/icon';
import { Stack } from '../../atoms/stack/stack';

/**
 * A search input component with optional label and submit button.
 *
 * @description
 * The Searchbar molecule combines an input field with an optional label and
 * submit button to create a complete search interface. It supports two-way
 * data binding and emits events for both value changes and search submissions.
 *
 * Key features:
 * - Text input with two-way binding
 * - Optional label with required indicator
 * - Optional search button with icon support
 * - Real-time value change events
 * - Explicit search submit events
 * - Disabled state support
 * - Customizable placeholder text
 * - Accessible with proper labels
 *
 * The component is commonly used for search functionality in catalogs,
 * lists, and data tables.
 *
 * @example
 * Basic searchbar with value binding:
 * ```html
 * <pc-searchbar
 *   [value]="searchQuery"
 *   (valueChange)="searchQuery = $event"
 *   placeholder="Search Pokemon..."
 *   label="Search">
 * </pc-searchbar>
 * ```
 *
 * @example
 * Searchbar with submit button:
 * ```html
 * <pc-searchbar
 *   [value]="query"
 *   (valueChange)="onQueryChange($event)"
 *   (searchSubmit)="onSearch($event)"
 *   placeholder="Enter search term"
 *   label="Search"
 *   buttonIcon="#icon-search"
 *   buttonLabel="Search">
 * </pc-searchbar>
 * ```
 *
 * @example
 * Required searchbar with disabled state:
 * ```html
 * <pc-searchbar
 *   [value]="searchTerm"
 *   (valueChange)="searchTerm = $event"
 *   [required]="true"
 *   [disabled]="isLoading"
 *   label="Required Search"
 *   placeholder="Type to search...">
 * </pc-searchbar>
 * ```
 *
 * @usageNotes
 * - Use `valueChange` for real-time filtering as user types
 * - Use `searchSubmit` for explicit search actions (e.g., with a button)
 * - The button is only shown when `buttonLabel` or `buttonIcon` is provided
 * - Set `required` to true to show asterisk on label
 * - The component uses Stack layout for vertical arrangement
 * - Input changes emit on every keystroke for live search functionality
 * - Button click triggers searchSubmit with current value
 * - Combine with paginated-list for complete search experiences
 *
 * @see {@link InputAtom} for the underlying input component
 * @see {@link Button} for the search button
 * @see {@link Label} for the label component
 * @see {@link PaginatedList} for search result display
 *
 * @publicApi
 */
@Component({
  selector: 'pc-searchbar',
  imports: [Label, InputAtom, Cluster, Stack, Icon, Button],
  templateUrl: './searchbar.html',
  host: { 'data-pc-component': 'searchbar' }
})
export class Searchbar {
  /** Current search value. Supports two-way binding. */
  @Input() value = '';
  
  /** Placeholder text shown when input is empty. */
  @Input() placeholder ='';
  
  /** Label text displayed above the search input. */
  @Input() label = '';
  
  /** Whether the search input is disabled. */
  @Input() disabled = false;
  
  /** Whether the search field is required. Shows asterisk on label when true. */
  @Input() required = false;
  
  /** Icon href for the search button. Button hidden when null. */
  @Input() buttonIcon: string | null= null;
  
  /** Text label for the search button. Button hidden when null. */
  @Input() buttonLabel: string | null= null;
  
  /** Emitted whenever the input value changes. Enables two-way binding. */
  @Output() valueChange = new EventEmitter<string>();
  
  /** Emitted when the search button is clicked or Enter is pressed. */
  @Output() searchSubmit = new EventEmitter<string>();

  /**
   * Handles input value changes and emits valueChange event.
   * @param val - The new input value
   * @internal
   */
  onInputChange(val: string) {
    this.valueChange.emit(val);
  }

  /**
   * Handles search submission and emits searchSubmit event.
   * @internal
   */
  onSearch() {
    this.searchSubmit.emit(this.value);
  }
}
