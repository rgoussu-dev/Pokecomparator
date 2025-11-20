import { Injectable, signal, computed } from '@angular/core';
import { Pokemon, ComparisonState } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {
  private readonly state = signal<ComparisonState>({
    pokemon1: null,
    pokemon2: null,
    mode: 'idle'
  });

  // Public read-only signals
  readonly pokemon1 = computed(() => this.state().pokemon1);
  readonly pokemon2 = computed(() => this.state().pokemon2);
  readonly mode = computed(() => this.state().mode);
  readonly isComparing = computed(() => this.state().mode === 'comparing');
  readonly hasAnyPokemon = computed(() => 
    this.state().pokemon1 !== null || this.state().pokemon2 !== null
  );
  readonly hasBothPokemon = computed(() => 
    this.state().pokemon1 !== null && this.state().pokemon2 !== null
  );

  /**
   * Set Pokemon in slot 1
   */
  setPokemon1(pokemon: Pokemon | null): void {
    const current = this.state();
    
    // Prevent comparing same Pokemon
    if (pokemon && current.pokemon2 && pokemon.id === current.pokemon2.id) {
      throw new Error('Cannot compare the same Pokemon');
    }

    this.state.set({
      ...current,
      pokemon1: pokemon,
      mode: pokemon && current.pokemon2 ? 'comparing' : 'idle'
    });
  }

  /**
   * Set Pokemon in slot 2
   */
  setPokemon2(pokemon: Pokemon | null): void {
    const current = this.state();
    
    // Prevent comparing same Pokemon
    if (pokemon && current.pokemon1 && pokemon.id === current.pokemon1.id) {
      throw new Error('Cannot compare the same Pokemon');
    }

    this.state.set({
      ...current,
      pokemon2: pokemon,
      mode: current.pokemon1 && pokemon ? 'comparing' : 'idle'
    });
  }

  /**
   * Clear all Pokemon from comparison
   */
  clearComparison(): void {
    this.state.set({
      pokemon1: null,
      pokemon2: null,
      mode: 'idle'
    });
  }

  /**
   * Swap Pokemon between slots
   */
  swapPokemon(): void {
    const current = this.state();
    this.state.set({
      pokemon1: current.pokemon2,
      pokemon2: current.pokemon1,
      mode: current.mode
    });
  }

  /**
   * Set loading state
   */
  setLoading(isLoading: boolean): void {
    const current = this.state();
    this.state.set({
      ...current,
      mode: isLoading ? 'loading' : (current.pokemon1 && current.pokemon2 ? 'comparing' : 'idle')
    });
  }
}
