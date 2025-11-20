import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  private readonly cache = new Map<number, Pokemon>();

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  getPokemonById(id: number): Observable<Pokemon> {
    // Check cache first
    const cached = this.cache.get(id);
    if (cached) {
      this.loading.set(false);
      this.error.set(null);
      return of(cached);
    }

    this.loading.set(true);
    this.error.set(null);

    return this.http.get<Pokemon>(`${this.apiUrl}/${id}`).pipe(
      tap((pokemon) => {
        this.cache.set(id, pokemon);
        this.loading.set(false);
      }),
      catchError((error: HttpErrorResponse) => {
        this.loading.set(false);
        let errorMessage: string;

        if (error.status === 404) {
          errorMessage = 'Pokemon not found. Please check the ID and try again.';
        } else if (error.status === 0) {
          errorMessage = 'Unable to connect. Please check your internet connection and try again.';
        } else {
          errorMessage = 'An error occurred. Please try again later.';
        }

        this.error.set(errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
    );
  }

  clearError(): void {
    this.error.set(null);
  }
}
