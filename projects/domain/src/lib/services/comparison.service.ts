import { Injectable, InjectionToken } from '@angular/core';
import { 
  PokemonDetail, 
  PokemonComparison, 
  StatComparison, 
  TypeComparison 
} from '../models/pokemon-detail.model';

/**
 * Service for comparing two Pokemon
 * This is a domain service that contains the core comparison logic
 */
@Injectable({
  providedIn: 'root'
})
export class ComparisonService {

  /**
   * Compares two Pokemon and returns a detailed comparison result
   */
  compare(pokemon1: PokemonDetail, pokemon2: PokemonDetail): PokemonComparison {
    const statsComparison = this.compareStats(pokemon1, pokemon2);
    const physicalComparison = this.comparePhysical(pokemon1, pokemon2);
    const typeComparison = this.compareTypes(pokemon1, pokemon2);

    // Count wins
    const allStatComparisons = [
      statsComparison.hp,
      statsComparison.attack,
      statsComparison.defense,
      statsComparison.specialAttack,
      statsComparison.specialDefense,
      statsComparison.speed
    ];

    const statsWonByPokemon1 = allStatComparisons.filter(s => s.winner === 'pokemon1').length;
    const statsWonByPokemon2 = allStatComparisons.filter(s => s.winner === 'pokemon2').length;

    let overallWinner: 'pokemon1' | 'pokemon2' | 'tie';
    if (statsWonByPokemon1 > statsWonByPokemon2) {
      overallWinner = 'pokemon1';
    } else if (statsWonByPokemon2 > statsWonByPokemon1) {
      overallWinner = 'pokemon2';
    } else {
      // Tiebreaker: total base stats
      if (statsComparison.total.winner !== 'tie') {
        overallWinner = statsComparison.total.winner;
      } else {
        overallWinner = 'tie';
      }
    }

    return {
      pokemon1,
      pokemon2,
      stats: statsComparison,
      physical: physicalComparison,
      typeComparison,
      overallWinner,
      statsWonByPokemon1,
      statsWonByPokemon2
    };
  }

  private compareStats(pokemon1: PokemonDetail, pokemon2: PokemonDetail) {
    const total1 = this.calculateTotalStats(pokemon1);
    const total2 = this.calculateTotalStats(pokemon2);

    return {
      hp: this.createStatComparison('HP', pokemon1.stats.hp, pokemon2.stats.hp),
      attack: this.createStatComparison('Attack', pokemon1.stats.attack, pokemon2.stats.attack),
      defense: this.createStatComparison('Defense', pokemon1.stats.defense, pokemon2.stats.defense),
      specialAttack: this.createStatComparison('Sp. Attack', pokemon1.stats.specialAttack, pokemon2.stats.specialAttack),
      specialDefense: this.createStatComparison('Sp. Defense', pokemon1.stats.specialDefense, pokemon2.stats.specialDefense),
      speed: this.createStatComparison('Speed', pokemon1.stats.speed, pokemon2.stats.speed),
      total: this.createStatComparison('Total', total1, total2)
    };
  }

  private comparePhysical(pokemon1: PokemonDetail, pokemon2: PokemonDetail) {
    return {
      height: this.createStatComparison('Height', pokemon1.physical.height, pokemon2.physical.height),
      weight: this.createStatComparison('Weight', pokemon1.physical.weight, pokemon2.physical.weight)
    };
  }

  private compareTypes(pokemon1: PokemonDetail, pokemon2: PokemonDetail): TypeComparison {
    const types1 = pokemon1.types.map(t => t.name);
    const types2 = pokemon2.types.map(t => t.name);
    const sharedTypes = types1.filter(t => types2.includes(t));

    return {
      pokemon1Types: types1,
      pokemon2Types: types2,
      sharedTypes
    };
  }

  private createStatComparison(name: string, value1: number, value2: number): StatComparison {
    const difference = value1 - value2;
    let winner: 'pokemon1' | 'pokemon2' | 'tie';

    if (difference > 0) {
      winner = 'pokemon1';
    } else if (difference < 0) {
      winner = 'pokemon2';
    } else {
      winner = 'tie';
    }

    return {
      name,
      pokemon1Value: value1,
      pokemon2Value: value2,
      difference,
      winner
    };
  }

  private calculateTotalStats(pokemon: PokemonDetail): number {
    return (
      pokemon.stats.hp +
      pokemon.stats.attack +
      pokemon.stats.defense +
      pokemon.stats.specialAttack +
      pokemon.stats.specialDefense +
      pokemon.stats.speed
    );
  }
}

/**
 * Injection token for the ComparisonService
 */
export const COMPARISON_SERVICE = new InjectionToken<ComparisonService>('ComparisonService');
