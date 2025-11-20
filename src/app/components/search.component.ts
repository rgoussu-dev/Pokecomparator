import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon.model';
import { PokemonDisplayComponent } from './pokemon-display.component';
import { LoadingSpinnerComponent } from './loading-spinner.component';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, PokemonDisplayComponent, LoadingSpinnerComponent],
  template: `
    <div class="search-container">
      <h1>Pokemon Search</h1>
      <p class="subtitle">Search for a Pokemon by its Pokedex ID</p>
      
      <div class="search-form">
        <div class="input-group">
          <input
            type="number"
            [formControl]="searchControl"
            placeholder="Enter Pokemon ID (e.g., 25)"
            class="search-input"
            (keyup.enter)="onSearch()"
          />
          <button
            class="search-button"
            [disabled]="searchControl.invalid || pokemonService.loading()"
            (click)="onSearch()"
          >
            Search
          </button>
        </div>
        
        @if (searchControl.invalid && searchControl.touched) {
          <div class="error-message">
            @if (searchControl.hasError('required')) {
              <span>Please enter a Pokemon ID</span>
            }
            @if (searchControl.hasError('min')) {
              <span>Please enter a valid Pokemon ID (positive number)</span>
            }
            @if (searchControl.hasError('pattern')) {
              <span>Please enter a numeric ID</span>
            }
          </div>
        }
      </div>

      @if (pokemonService.loading()) {
        <app-loading-spinner />
      }

      @if (pokemonService.error(); as error) {
        <div class="error-container">
          <p class="error-text">{{ error }}</p>
          <button class="retry-button" (click)="onSearch()">
            Retry
          </button>
        </div>
      }

      @if (currentPokemon()) {
        <app-pokemon-display [pokemon]="currentPokemon()!" />
      }
    </div>
  `,
  styles: [`
    .search-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 0.5rem;
      font-size: 2.5rem;
    }

    .subtitle {
      text-align: center;
      color: #666;
      margin-bottom: 2rem;
    }

    .search-form {
      margin-bottom: 2rem;
    }

    .input-group {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .search-input {
      flex: 1;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      transition: border-color 0.3s;
    }

    .search-input:focus {
      outline: none;
      border-color: #ff0000;
    }

    .search-input:invalid {
      border-color: #ff6b6b;
    }

    .search-button {
      padding: 0.75rem 2rem;
      font-size: 1rem;
      font-weight: 600;
      background-color: #ff0000;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.1s;
      white-space: nowrap;
    }

    .search-button:hover:not(:disabled) {
      background-color: #cc0000;
      transform: translateY(-2px);
    }

    .search-button:active:not(:disabled) {
      transform: translateY(0);
    }

    .search-button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }

    .error-message {
      color: #ff6b6b;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .error-container {
      background-color: #ffe0e0;
      border: 2px solid #ff6b6b;
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 2rem;
      text-align: center;
    }

    .error-text {
      color: #cc0000;
      font-weight: 500;
      margin-bottom: 1rem;
    }

    .retry-button {
      padding: 0.5rem 1.5rem;
      font-size: 0.875rem;
      font-weight: 600;
      background-color: #ff6b6b;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .retry-button:hover {
      background-color: #cc0000;
    }

    @media screen and (max-width: 650px) {
      h1 {
        font-size: 2rem;
      }

      .input-group {
        flex-direction: column;
      }

      .search-button {
        width: 100%;
      }
    }

    @media screen and (max-width: 320px) {
      .search-container {
        padding: 1rem 0.5rem;
      }

      h1 {
        font-size: 1.75rem;
      }
    }
  `]
})
export class SearchComponent {
  protected readonly pokemonService = inject(PokemonService);
  
  readonly searchControl = new FormControl<number | null>(null, [
    Validators.required,
    Validators.min(1),
    Validators.pattern(/^\d+$/)
  ]);
  
  readonly currentPokemon = signal<Pokemon | null>(null);

  onSearch(): void {
    if (this.searchControl.valid && this.searchControl.value) {
      this.pokemonService.clearError();
      this.pokemonService.getPokemonById(this.searchControl.value).subscribe({
        next: (pokemon) => {
          this.currentPokemon.set(pokemon);
        },
        error: () => {
          this.currentPokemon.set(null);
        }
      });
    } else {
      this.searchControl.markAsTouched();
    }
  }
}
