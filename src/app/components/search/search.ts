import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonDisplay } from '../pokemon-display/pokemon-display';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule, PokemonDisplay],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  private readonly pokemonService = inject(PokemonService);

  searchInput = signal('');
  pokemon = signal<Pokemon | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);

  /**
   * Handle search submission
   */
  onSearch(): void {
    const input = this.searchInput().trim();

    if (!input) {
      this.error.set('Please enter a Pokemon name or ID');
      return;
    }

    // Validate input format
    const validPattern = /^[a-zA-Z0-9-]+$/;
    if (!validPattern.test(input)) {
      this.error.set('Only letters, numbers, and hyphens are allowed');
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.pokemon.set(null);

    // Smart detection: numeric input = ID, otherwise = name
    const isNumeric = /^\d+$/.test(input);

    const searchObservable = isNumeric
      ? this.pokemonService.getPokemonById(parseInt(input, 10))
      : this.pokemonService.getPokemonByName(input);

    searchObservable.subscribe({
      next: (pokemon) => {
        this.pokemon.set(pokemon);
        this.loading.set(false);
      },
      error: (error) => {
        this.error.set(error.message);
        this.loading.set(false);
      },
    });
  }

  /**
   * Handle Enter key press
   */
  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  /**
   * Check if search button should be disabled
   */
  isSearchDisabled(): boolean {
    return this.loading() || !this.searchInput().trim();
  }
}
