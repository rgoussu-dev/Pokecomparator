import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../services/pokemon.service';
import { ComparisonService } from '../../services/comparison.service';

type SearchMode = 'view' | 'compare';
type CompareSlot = 'slot1' | 'slot2';

@Component({
  selector: 'app-pokemon-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-search.html',
  styleUrl: './pokemon-search.css',
})
export class PokemonSearch {
  private readonly pokemonService = inject(PokemonService);
  private readonly comparisonService = inject(ComparisonService);

  searchQuery = signal<string>('');
  searchMode = signal<SearchMode>('compare');
  selectedSlot = signal<CompareSlot>('slot1');
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  onSearch(): void {
    const query = this.searchQuery().trim();
    
    if (!query) {
      this.errorMessage.set('Please enter a Pokemon name or ID');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.comparisonService.setLoading(true);

    this.pokemonService.getPokemon(query).subscribe({
      next: (pokemon) => {
        try {
          if (this.searchMode() === 'compare') {
            if (this.selectedSlot() === 'slot1') {
              this.comparisonService.setPokemon1(pokemon);
            } else {
              this.comparisonService.setPokemon2(pokemon);
            }
          }
          this.searchQuery.set('');
          this.errorMessage.set('');
        } catch (error) {
          if (error instanceof Error) {
            this.errorMessage.set(error.message);
          }
        } finally {
          this.isLoading.set(false);
          this.comparisonService.setLoading(false);
        }
      },
      error: (error) => {
        this.errorMessage.set(error.message || 'Failed to fetch Pokemon. Please try again.');
        this.isLoading.set(false);
        this.comparisonService.setLoading(false);
      }
    });
  }

  onModeChange(mode: SearchMode): void {
    this.searchMode.set(mode);
  }

  onSlotChange(slot: CompareSlot): void {
    this.selectedSlot.set(slot);
  }
}

