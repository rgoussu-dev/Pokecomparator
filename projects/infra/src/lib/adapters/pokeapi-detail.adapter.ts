import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { 
  PokemonDetailRepository,
  PokemonDetail,
  PokemonType,
  PokemonStats,
  PokemonAbility
} from 'domain';

/**
 * PokeAPI detailed response type
 */
interface PokeApiPokemonDetailResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    other?: {
      'official-artwork'?: {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
}

/**
 * PokeAPI adapter for detailed Pokemon data
 */
@Injectable({
  providedIn: 'root'
})
export class PokeApiDetailAdapter implements PokemonDetailRepository {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  getPokemonDetail(id: number): Observable<PokemonDetail> {
    return this.http.get<PokeApiPokemonDetailResponse>(
      `${this.baseUrl}/pokemon/${id}`
    ).pipe(
      map(response => this.mapToPokemonDetail(response))
    );
  }

  getPokemonDetailByName(name: string): Observable<PokemonDetail> {
    return this.http.get<PokeApiPokemonDetailResponse>(
      `${this.baseUrl}/pokemon/${name.toLowerCase()}`
    ).pipe(
      map(response => this.mapToPokemonDetail(response))
    );
  }

  private mapToPokemonDetail(response: PokeApiPokemonDetailResponse): PokemonDetail {
    const types: PokemonType[] = response.types.map(t => ({
      name: t.type.name,
      slot: t.slot
    }));

    const stats = this.mapStats(response.stats);

    const abilities: PokemonAbility[] = response.abilities.map(a => ({
      name: a.ability.name,
      isHidden: a.is_hidden
    }));

    const spriteUrl = response.sprites.other?.['official-artwork']?.front_default 
      ?? response.sprites.front_default
      ?? '';

    return {
      id: response.id,
      name: response.name,
      spriteUrl,
      types,
      stats,
      physical: {
        height: response.height,
        weight: response.weight
      },
      abilities,
      baseExperience: response.base_experience
    };
  }

  private mapStats(apiStats: PokeApiPokemonDetailResponse['stats']): PokemonStats {
    const statsMap: Record<string, number> = {};
    
    for (const stat of apiStats) {
      statsMap[stat.stat.name] = stat.base_stat;
    }

    return {
      hp: statsMap['hp'] ?? 0,
      attack: statsMap['attack'] ?? 0,
      defense: statsMap['defense'] ?? 0,
      specialAttack: statsMap['special-attack'] ?? 0,
      specialDefense: statsMap['special-defense'] ?? 0,
      speed: statsMap['speed'] ?? 0
    };
  }
}
