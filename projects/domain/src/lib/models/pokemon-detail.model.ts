import { PokemonType } from './pokemon.model';

/**
 * Pokemon base stats
 */
export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

/**
 * Pokemon physical characteristics
 */
export interface PokemonPhysical {
  height: number; // in decimeters
  weight: number; // in hectograms
}

/**
 * Pokemon ability
 */
export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

/**
 * Detailed Pokemon information for comparison
 */
export interface PokemonDetail {
  id: number;
  name: string;
  spriteUrl: string;
  types: PokemonType[];
  stats: PokemonStats;
  physical: PokemonPhysical;
  abilities: PokemonAbility[];
  baseExperience: number;
}

/**
 * Comparison result for a single stat
 * positive = first pokemon is higher
 * negative = second pokemon is higher
 * zero = equal
 */
export interface StatComparison {
  name: string;
  pokemon1Value: number;
  pokemon2Value: number;
  difference: number;
  winner: 'pokemon1' | 'pokemon2' | 'tie';
}

/**
 * Type effectiveness comparison
 */
export interface TypeComparison {
  pokemon1Types: string[];
  pokemon2Types: string[];
  sharedTypes: string[];
}

/**
 * Full comparison result between two Pokemon
 */
export interface PokemonComparison {
  pokemon1: PokemonDetail;
  pokemon2: PokemonDetail;
  stats: {
    hp: StatComparison;
    attack: StatComparison;
    defense: StatComparison;
    specialAttack: StatComparison;
    specialDefense: StatComparison;
    speed: StatComparison;
    total: StatComparison;
  };
  physical: {
    height: StatComparison;
    weight: StatComparison;
  };
  typeComparison: TypeComparison;
  overallWinner: 'pokemon1' | 'pokemon2' | 'tie';
  statsWonByPokemon1: number;
  statsWonByPokemon2: number;
}
