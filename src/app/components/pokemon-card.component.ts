import { Component, input, computed, signal } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { TypeBadgeComponent } from './type-badge.component';
import { StatsListComponent } from './stats-list.component';

@Component({
  selector: 'app-pokemon-card',
  imports: [CapitalizePipe, TypeBadgeComponent, StatsListComponent],
  template: `
    @if (pokemon()) {
      <div class="pokemon-card">
        <div class="pokemon-header">
          <h2 class="pokemon-name">{{ pokemon()!.name | capitalize }}</h2>
          <span class="pokemon-id">#{{ pokemon()!.id.toString().padStart(3, '0') }}</span>
        </div>

        <div class="pokemon-image-container">
          @if (imageUrl()) {
            <img 
              [src]="imageUrl()!"
              [alt]="'Image of ' + (pokemon()!.name | capitalize)"
              class="pokemon-image"
              (load)="onImageLoad()"
              (error)="onImageError()"
            />
          } @else {
            <div class="image-placeholder">
              <span>No Image</span>
            </div>
          }
          @if (imageLoading()) {
            <div class="image-loading">Loading...</div>
          }
        </div>

        <div class="pokemon-types">
          @for (typeEntry of pokemon()!.types; track typeEntry.slot) {
            <app-type-badge [type]="typeEntry.type.name" />
          }
        </div>

        <app-stats-list [stats]="pokemon()!.stats" />
      </div>
    } @else {
      <div class="pokemon-card loading">
        <div class="skeleton skeleton-header"></div>
        <div class="skeleton skeleton-image"></div>
        <div class="skeleton skeleton-types"></div>
        <div class="skeleton skeleton-stats"></div>
      </div>
    }
  `,
  styles: [`
    .pokemon-card {
      background: white;
      border-radius: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 1.5rem;
      max-width: 400px;
      margin: 1rem auto;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .pokemon-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    }

    .pokemon-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .pokemon-name {
      font-size: 1.75rem;
      font-weight: 700;
      margin: 0;
      color: #333;
    }

    .pokemon-id {
      font-size: 1.25rem;
      font-weight: 600;
      color: #999;
    }

    .pokemon-image-container {
      position: relative;
      width: 100%;
      height: 250px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 1rem;
      background-color: #f8f8f8;
      border-radius: 0.5rem;
    }

    .pokemon-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .image-placeholder {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: #e0e0e0;
      color: #999;
      font-size: 1.125rem;
      font-weight: 500;
    }

    .image-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(255, 255, 255, 0.9);
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
    }

    .pokemon-types {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
    }

    /* Loading state skeleton */
    .pokemon-card.loading {
      min-height: 500px;
    }

    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 0.5rem;
    }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .skeleton-header {
      height: 2.5rem;
      margin-bottom: 1rem;
    }

    .skeleton-image {
      height: 250px;
      margin-bottom: 1rem;
    }

    .skeleton-types {
      height: 2rem;
      margin-bottom: 1.5rem;
    }

    .skeleton-stats {
      height: 200px;
    }

    /* Responsive design */
    @media (max-width: 650px) {
      .pokemon-card {
        max-width: 100%;
        margin: 0.5rem;
        padding: 1rem;
      }

      .pokemon-name {
        font-size: 1.5rem;
      }

      .pokemon-image-container {
        height: 200px;
      }
    }

    @media (max-width: 375px) {
      .pokemon-card {
        padding: 0.75rem;
      }

      .pokemon-name {
        font-size: 1.25rem;
      }

      .pokemon-image-container {
        height: 180px;
      }
    }
  `]
})
export class PokemonCardComponent {
  pokemon = input<Pokemon | null>(null);
  imageLoading = signal(true);

  imageUrl = computed(() => {
    const poke = this.pokemon();
    if (!poke) return null;

    // Try official artwork first
    const officialArt = poke.sprites.other?.['official-artwork']?.front_default;
    if (officialArt) return officialArt;

    // Fallback to front_default
    return poke.sprites.front_default;
  });

  onImageLoad(): void {
    this.imageLoading.set(false);
  }

  onImageError(): void {
    this.imageLoading.set(false);
  }
}
