import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDetail } from '../models/pokemon-detail.model';

/**
 * Port interface for fetching detailed Pokemon data
 */
export interface PokemonDetailRepository {
  /**
   * Retrieves detailed Pokemon information by ID
   * @param id - Pokemon ID
   * @returns Observable of PokemonDetail
   */
  getPokemonDetail(id: number): Observable<PokemonDetail>;

  /**
   * Retrieves detailed Pokemon information by name
   * @param name - Pokemon name
   * @returns Observable of PokemonDetail
   */
  getPokemonDetailByName(name: string): Observable<PokemonDetail>;
}

/**
 * Injection token for the PokemonDetailRepository
 */
export const POKEMON_DETAIL_REPOSITORY = new InjectionToken<PokemonDetailRepository>('PokemonDetailRepository');
