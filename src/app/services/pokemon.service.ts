import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  /**
   * Fetch Pokemon by ID or name
   * @param idOrName Pokemon ID (number) or name (string)
   * @returns Observable of Pokemon data
   */
  getPokemon(idOrName: string | number): Observable<Pokemon> {
    const identifier = typeof idOrName === 'string' ? idOrName.toLowerCase() : idOrName;
    return this.http.get<Pokemon>(`${this.apiUrl}/${identifier}`).pipe(
      catchError((error) => {
        console.error('Error fetching Pokemon:', error);
        return throwError(() => new Error('Pokemon not found. Please check the ID or name.'));
      })
    );
  }
}
