import { Component, input } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-display',
  template: `
    @if (pokemon(); as poke) {
      <div class="pokemon-card">
        <div class="pokemon-header">
          <h2 class="pokemon-name">{{ formatName(poke.name) }}</h2>
          <span class="pokemon-id">#{{ poke.id }}</span>
        </div>

        <div class="pokemon-image">
          <img [src]="getImageUrl(poke)" [alt]="poke.name" loading="lazy" />
        </div>

        <div class="pokemon-types">
          @for (typeInfo of poke.types; track typeInfo.slot) {
            <span class="type-badge" [attr.data-type]="typeInfo.type.name">
              {{ formatName(typeInfo.type.name) }}
            </span>
          }
        </div>

        <div class="pokemon-stats">
          <h3>Base Stats</h3>
          @for (stat of poke.stats; track stat.stat.name) {
            <div class="stat-row">
              <span class="stat-name">{{ formatStatName(stat.stat.name) }}</span>
              <div class="stat-bar-container">
                <div class="stat-bar" [style.width.%]="(stat.base_stat / 255) * 100"></div>
              </div>
              <span class="stat-value">{{ stat.base_stat }}</span>
            </div>
          }
        </div>
      </div>
    }
  `,
  styles: [
    `
      .pokemon-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 2rem;
        max-width: 500px;
        margin: 0 auto;
      }

      .pokemon-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
      }

      .pokemon-name {
        font-size: 2rem;
        font-weight: bold;
        margin: 0;
        color: #333;
      }

      .pokemon-id {
        font-size: 1.25rem;
        color: #666;
        font-weight: 500;
      }

      .pokemon-image {
        text-align: center;
        margin-bottom: 1.5rem;
      }

      .pokemon-image img {
        max-width: 100%;
        height: auto;
        max-height: 300px;
      }

      .pokemon-types {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        margin-bottom: 2rem;
        flex-wrap: wrap;
      }

      .type-badge {
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.875rem;
        color: white;
      }

      .type-badge[data-type='normal'] {
        background-color: #a8a878;
      }
      .type-badge[data-type='fire'] {
        background-color: #f08030;
      }
      .type-badge[data-type='water'] {
        background-color: #6890f0;
      }
      .type-badge[data-type='electric'] {
        background-color: #f8d030;
        color: #333;
      }
      .type-badge[data-type='grass'] {
        background-color: #78c850;
      }
      .type-badge[data-type='ice'] {
        background-color: #98d8d8;
      }
      .type-badge[data-type='fighting'] {
        background-color: #c03028;
      }
      .type-badge[data-type='poison'] {
        background-color: #a040a0;
      }
      .type-badge[data-type='ground'] {
        background-color: #e0c068;
      }
      .type-badge[data-type='flying'] {
        background-color: #a890f0;
      }
      .type-badge[data-type='psychic'] {
        background-color: #f85888;
      }
      .type-badge[data-type='bug'] {
        background-color: #a8b820;
      }
      .type-badge[data-type='rock'] {
        background-color: #b8a038;
      }
      .type-badge[data-type='ghost'] {
        background-color: #705898;
      }
      .type-badge[data-type='dragon'] {
        background-color: #7038f8;
      }
      .type-badge[data-type='dark'] {
        background-color: #705848;
      }
      .type-badge[data-type='steel'] {
        background-color: #b8b8d0;
      }
      .type-badge[data-type='fairy'] {
        background-color: #ee99ac;
      }

      .pokemon-stats {
        margin-top: 2rem;
      }

      .pokemon-stats h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: #333;
      }

      .stat-row {
        display: grid;
        grid-template-columns: 140px 1fr 50px;
        gap: 1rem;
        align-items: center;
        margin-bottom: 0.75rem;
      }

      .stat-name {
        font-weight: 500;
        color: #555;
        text-transform: capitalize;
      }

      .stat-bar-container {
        background-color: #e0e0e0;
        border-radius: 10px;
        height: 20px;
        overflow: hidden;
      }

      .stat-bar {
        background: linear-gradient(90deg, #ff6b6b 0%, #4ecdc4 50%, #45b7d1 100%);
        height: 100%;
        border-radius: 10px;
        transition: width 0.3s ease;
      }

      .stat-value {
        font-weight: bold;
        color: #333;
        text-align: right;
      }

      @media screen and (max-width: 650px) {
        .pokemon-card {
          padding: 1.5rem;
        }

        .pokemon-name {
          font-size: 1.5rem;
        }

        .pokemon-id {
          font-size: 1rem;
        }

        .stat-row {
          grid-template-columns: 100px 1fr 40px;
          gap: 0.5rem;
        }

        .stat-name {
          font-size: 0.875rem;
        }
      }

      @media screen and (max-width: 320px) {
        .pokemon-card {
          padding: 1rem;
        }
      }
    `,
  ],
})
export class PokemonDisplayComponent {
  readonly pokemon = input.required<Pokemon>();

  formatName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  getImageUrl(pokemon: Pokemon): string {
    return pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  }

  formatStatName(name: string): string {
    const statNames: Record<string, string> = {
      hp: 'HP',
      attack: 'Attack',
      defense: 'Defense',
      'special-attack': 'Special Attack',
      'special-defense': 'Special Defense',
      speed: 'Speed',
    };
    return statNames[name] || name;
  }
}
