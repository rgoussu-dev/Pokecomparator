import { Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Stack } from '../../atoms/stack/stack';
import { Cluster } from '../../atoms/cluster/cluster';
import { Button } from '../../atoms/button/button';
import { Box } from '../../atoms/box/box';
import { Grid } from '../../atoms/grid/grid';

/**
 * Represents the current state of pagination.
 */
export interface PaginationState {
  /** Current page number (1-indexed) */
  currentPage: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of items across all pages */
  totalItems: number;
  /** Calculated total number of pages */
  totalPages: number;
}

/**
 * Event emitted when page navigation occurs.
 */
export interface PageChangeEvent {
  /** The new page number to navigate to */
  page: number;
  /** The page size (may have changed if page size selector was used) */
  pageSize: number;
}

/**
 * A comprehensive paginated list component with support for both list and grid layouts.
 *
 * @description
 * The PaginatedList component provides a complete solution for displaying paginated
 * data with customizable layouts, page size selection, loading states, and empty states.
 * It supports both client-side and server-side pagination patterns and can render
 * items in either list or grid layouts using custom templates.
 *
 * Key features:
 * - Client-side and server-side pagination support
 * - List and grid layout modes
 * - Customizable item templates via ng-template
 * - Optional filter template for custom filtering UI
 * - Page size selector with configurable options
 * - Page number navigation with smart button limiting
 * - Previous/Next navigation buttons
 * - Loading state with visual feedback
 * - Empty state message
 * - Pagination info display (showing X-Y of Z items)
 * - Fully accessible navigation controls
 *
 * The component is designed to work with any data type and provides
 * complete flexibility through content projection and template refs.
 *
 * @example
 * Basic paginated list:
 * ```html
 * <pc-paginated-list
 *   [items]="pokemonList"
 *   [currentPage]="page"
 *   [pageSize]="20"
 *   [totalItems]="totalCount"
 *   (pageChange)="onPageChange($event)">
 *   <ng-template #itemTemplate let-pokemon let-i="index">
 *     <div>{{ pokemon.name }}</div>
 *   </ng-template>
 * </pc-paginated-list>
 * ```
 *
 * @example
 * Grid layout with custom page sizes:
 * ```html
 * <pc-paginated-list
 *   [items]="products"
 *   [currentPage]="currentPage"
 *   [pageSize]="pageSize"
 *   [totalItems]="total"
 *   [pageSizeOptions]="[12, 24, 48]"
 *   layout="grid"
 *   gridMinWidth="250px"
 *   (pageChange)="handlePageChange($event)"
 *   (pageSizeChange)="handlePageSizeChange($event)">
 *   <ng-template #itemTemplate let-product>
 *     <product-card [product]="product"></product-card>
 *   </ng-template>
 * </pc-paginated-list>
 * ```
 *
 * @example
 * With filter template and loading state:
 * ```html
 * <pc-paginated-list
 *   [items]="results"
 *   [currentPage]="page"
 *   [totalItems]="total"
 *   [loading]="isLoading"
 *   emptyMessage="No results found">
 *   <ng-template #filterTemplate>
 *     <pc-searchbar
 *       [(value)]="searchQuery"
 *       (searchSubmit)="search()">
 *     </pc-searchbar>
 *   </ng-template>
 *   <ng-template #itemTemplate let-item>
 *     <div>{{ item.title }}</div>
 *   </ng-template>
 * </pc-paginated-list>
 * ```
 *
 * @usageNotes
 * - For server-side pagination, provide `totalItems` and handle `pageChange` events
 * - For client-side pagination, slice your data array before passing to `items`
 * - The `itemTemplate` is required and receives the item and index as context
 * - Use `filterTemplate` to add custom search or filter controls above the list
 * - Set `showPageSizeSelector` to false to hide the page size dropdown
 * - Set `showPageNumbers` to false to show only prev/next buttons
 * - `maxPageButtons` controls how many page number buttons are visible at once
 * - Layout 'grid' uses the Grid component with configurable min width
 * - Layout 'list' uses Stack for vertical arrangement
 * - Page numbers are 1-indexed (first page is 1, not 0)
 * - When page size changes, automatically resets to page 1
 *
 * @see {@link PaginationState} for pagination state structure
 * @see {@link PageChangeEvent} for page change event structure
 * @see {@link Grid} for grid layout component
 * @see {@link Stack} for list layout component
 * @see {@link Button} for navigation buttons
 *
 * @publicApi
 */
@Component({
  selector: 'pc-paginated-list',
  imports: [CommonModule, Stack, Cluster, Button, Box, Grid],
  templateUrl: './paginated-list.html',
  styleUrl: './paginated-list.css',
  host: { 'data-pc-component': 'paginated-list' }
})
export class PaginatedList<T> {
  /** The items to display in the current page */
  @Input() items: T[] = [];

  /** Current page number (1-indexed) */
  @Input() currentPage = 1;

  /** Number of items per page */
  @Input() pageSize = 10;

  /** Total number of items (for server-side pagination) */
  @Input() totalItems = 0;

  /** Available page size options */
  @Input() pageSizeOptions: number[] = [10, 20, 50, 100];

  /** Whether to show the page size selector */
  @Input() showPageSizeSelector = true;

  /** Whether to show page numbers between prev/next */
  @Input() showPageNumbers = true;

  /** Maximum number of page buttons to show */
  @Input() maxPageButtons = 5;

  /** Loading state */
  @Input() loading = false;

  /** Empty state message */
  @Input() emptyMessage = 'No items to display';

  /** Layout mode for list items */
  @Input() layout: 'list' | 'grid' = 'list';

  /** Minimum item width for grid layout */
  @Input() gridMinWidth = '250px';

  /** Template for rendering each item */
  @ContentChild('itemTemplate') itemTemplate!: TemplateRef<{ $implicit: T; index: number }>;

  /** Template for custom filter section */
  @ContentChild('filterTemplate') filterTemplate!: TemplateRef<unknown>;

  /** Emitted when the page changes */
  @Output() pageChange = new EventEmitter<PageChangeEvent>();

  /** Emitted when page size changes */
  @Output() pageSizeChange = new EventEmitter<number>();

  /** Calculates total number of pages based on totalItems and pageSize */
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize) || 1;
  }

  /** Calculates the first item number on current page (1-indexed) */
  get startItem(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  /** Calculates the last item number on current page */
  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  /** Returns true if there is a previous page available */
  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  /** Returns true if there is a next page available */
  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  /** 
   * Calculates which page numbers should be visible based on current page and maxPageButtons.
   * Ensures current page is centered when possible.
   */
  get visiblePageNumbers(): number[] {
    const pages: number[] = [];
    const half = Math.floor(this.maxPageButtons / 2);
    let start = Math.max(1, this.currentPage - half);
    const end = Math.min(this.totalPages, start + this.maxPageButtons - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < this.maxPageButtons) {
      start = Math.max(1, end - this.maxPageButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  /** Returns current pagination state object */
  get paginationState(): PaginationState {
    return {
      currentPage: this.currentPage,
      pageSize: this.pageSize,
      totalItems: this.totalItems,
      totalPages: this.totalPages
    };
  }

  /**
   * Navigates to a specific page if valid.
   * @param page - The page number to navigate to (1-indexed)
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit({ page, pageSize: this.pageSize });
    }
  }

  /** Navigates to the previous page if available */
  goToPreviousPage(): void {
    if (this.hasPreviousPage) {
      this.goToPage(this.currentPage - 1);
    }
  }

  /** Navigates to the next page if available */
  goToNextPage(): void {
    if (this.hasNextPage) {
      this.goToPage(this.currentPage + 1);
    }
  }

  /**
   * Handles page size changes from the select dropdown.
   * Emits both pageSizeChange and pageChange (reset to page 1).
   * @param event - The select change event
   * @internal
   */
  onPageSizeChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newSize = parseInt(select.value, 10);
    this.pageSizeChange.emit(newSize);
    // Reset to first page when changing page size
    this.pageChange.emit({ page: 1, pageSize: newSize });
  }

  /**
   * TrackBy function for ngFor optimization.
   * @param index - The item index
   * @returns The index for tracking
   * @internal
   */
  trackByIndex(index: number): number {
    return index;
  }
}
