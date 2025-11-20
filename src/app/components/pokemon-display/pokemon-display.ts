import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-display',
  imports: [CommonModule],
  templateUrl: './pokemon-display.html',
  styleUrl: './pokemon-display.css',
})
export class PokemonDisplay {
  pokemon = input.required<Pokemon>();

  /**
   * Get Pokemon image URL, preferring official artwork
   */
  getPokemonImage(): string {
    const pokemon = this.pokemon();
    return pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  }

  /**
   * Capitalize Pokemon name for display
   */
  getDisplayName(): string {
    const name = this.pokemon().name;
    // Handle special cases with hyphens (e.g., "mr-mime" -> "Mr. Mime")
    return name
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Format stat name for display
   */
  formatStatName(statName: string): string {
    const statMap: { [key: string]: string } = {
      hp: 'HP',
      attack: 'Attack',
      defense: 'Defense',
      'special-attack': 'Special Attack',
      'special-defense': 'Special Defense',
      speed: 'Speed',
    };
    return statMap[statName] || statName;
  }

  /**
   * Get type color for badge styling
   */
  getTypeColor(typeName: string): string {
    const typeColors: { [key: string]: string } = {
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
      fairy: '#EE99AC',
    };
    return typeColors[typeName] || '#777';
  }
}
