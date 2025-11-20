import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-card',
  imports: [CommonModule],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  pokemon = input.required<Pokemon>();
  showChangeButton = input<boolean>(false);
  changeClicked = output<void>();

  getOfficialArtwork(): string {
    return this.pokemon().sprites.other?.['official-artwork']?.front_default || 
           this.pokemon().sprites.front_default;
  }

  getTypeColor(type: string): string {
    const typeColors: Record<string, string> = {
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
    return typeColors[type.toLowerCase()] || '#68A090';
  }

  getStatName(statName: string): string {
    const statNames: Record<string, string> = {
      'hp': 'HP',
      'attack': 'Attack',
      'defense': 'Defense',
      'special-attack': 'Sp. Attack',
      'special-defense': 'Sp. Defense',
      'speed': 'Speed'
    };
    return statNames[statName.toLowerCase()] || statName;
  }

  onChangeClick(): void {
    this.changeClicked.emit();
  }
}
