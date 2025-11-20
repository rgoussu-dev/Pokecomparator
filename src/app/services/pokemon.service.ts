import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  
  // Cache for both ID and name lookups
  private cache = new Map<string, Pokemon>();

  /**
   * Get Pokemon by ID
   * @param id Pokemon ID (positive integer)
   * @returns Observable of Pokemon
   */
  getPokemonById(id: number): Observable<Pokemon> {
    const cacheKey = id.toString();
    
    // Check cache first
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey)!);
    }

    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`).pipe(
      tap((pokemon) => {
        // Cache by both ID and name (lowercase)
        this.cache.set(cacheKey, pokemon);
        this.cache.set(pokemon.name.toLowerCase(), pokemon);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Get Pokemon by name
   * @param name Pokemon name (case-insensitive)
   * @returns Observable of Pokemon
   */
  getPokemonByName(name: string): Observable<Pokemon> {
    // Normalize name: trim, lowercase
    const normalizedName = name.trim().toLowerCase();
    
    // Check cache first
    if (this.cache.has(normalizedName)) {
      return of(this.cache.get(normalizedName)!);
    }

    return this.http.get<Pokemon>(`${this.apiUrl}/${normalizedName}`).pipe(
      tap((pokemon) => {
        // Cache by both name and ID
        this.cache.set(normalizedName, pokemon);
        this.cache.set(pokemon.id.toString(), pokemon);
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';

    if (error.status === 404) {
      errorMessage = 'Pokemon not found. Please check the spelling and try again.';
    } else if (error.status === 0) {
      errorMessage = 'Unable to connect. Please check your internet connection and try again.';
    } else {
      errorMessage = `Error: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
