import { Component, input } from '@angular/core';
import { NgStyle } from '@angular/common';

const TYPE_COLORS: { [key: string]: string } = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

@Component({
  selector: 'app-type-badge',
  imports: [NgStyle],
  template: `
    <span 
      class="type-badge"
      [ngStyle]="{ 'background-color': getTypeColor() }"
    >
      {{ type().charAt(0).toUpperCase() + type().slice(1) }}
    </span>
  `,
  styles: [`
    .type-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.875rem;
      font-weight: 600;
      color: white;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
      margin: 0.25rem;
    }
  `]
})
export class TypeBadgeComponent {
  type = input.required<string>();

  getTypeColor(): string {
    return TYPE_COLORS[this.type().toLowerCase()] || '#777';
  }
}
