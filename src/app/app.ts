import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonCardComponent } from './components/pokemon-card.component';
import { Pokemon } from './models/pokemon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PokemonCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('pokecomparator-app');
  
  // Example Pokemon data for demonstration
  protected readonly examplePokemon = signal<Pokemon>({
    id: 25,
    name: 'pikachu',
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      other: {
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
        }
      }
    },
    types: [
      {
        slot: 1,
        type: {
          name: 'electric',
          url: 'https://pokeapi.co/api/v2/type/13/'
        }
      }
    ],
    stats: [
      { base_stat: 35, stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' } },
      { base_stat: 55, stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' } },
      { base_stat: 40, stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' } },
      { base_stat: 50, stat: { name: 'special-attack', url: 'https://pokeapi.co/api/v2/stat/4/' } },
      { base_stat: 50, stat: { name: 'special-defense', url: 'https://pokeapi.co/api/v2/stat/5/' } },
      { base_stat: 90, stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' } }
    ]
  });
}
