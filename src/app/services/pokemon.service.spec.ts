import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemon.model';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  const mockPokemon: Pokemon = {
    id: 25,
    name: 'pikachu',
    sprites: {
      front_default: 'https://example.com/pikachu.png',
      other: {
        'official-artwork': {
          front_default: 'https://example.com/pikachu-official.png',
        },
      },
    },
    types: [
      {
        slot: 1,
        type: {
          name: 'electric',
          url: 'https://pokeapi.co/api/v2/type/13/',
        },
      },
    ],
    stats: [
      { base_stat: 35, stat: { name: 'hp' } },
      { base_stat: 55, stat: { name: 'attack' } },
      { base_stat: 40, stat: { name: 'defense' } },
      { base_stat: 50, stat: { name: 'special-attack' } },
      { base_stat: 50, stat: { name: 'special-defense' } },
      { base_stat: 90, stat: { name: 'speed' } },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPokemonById', () => {
    it('should fetch Pokemon by ID', (done) => {
      service.getPokemonById(25).subscribe((pokemon) => {
        expect(pokemon).toEqual(mockPokemon);
        done();
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/25');
      expect(req.request.method).toBe('GET');
      req.flush(mockPokemon);
    });

    it('should cache Pokemon by ID', (done) => {
      // First request
      service.getPokemonById(25).subscribe();
      const req1 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/25');
      req1.flush(mockPokemon);

      // Second request should use cache
      service.getPokemonById(25).subscribe((pokemon) => {
        expect(pokemon).toEqual(mockPokemon);
        done();
      });

      // No second HTTP request should be made
      httpMock.expectNone('https://pokeapi.co/api/v2/pokemon/25');
    });

    it('should handle 404 error', (done) => {
      service.getPokemonById(99999).subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.message).toContain('Pokemon not found');
          done();
        },
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/99999');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('getPokemonByName', () => {
    it('should fetch Pokemon by name', (done) => {
      service.getPokemonByName('pikachu').subscribe((pokemon) => {
        expect(pokemon).toEqual(mockPokemon);
        done();
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
      expect(req.request.method).toBe('GET');
      req.flush(mockPokemon);
    });

    it('should normalize name to lowercase', (done) => {
      service.getPokemonByName('PIKACHU').subscribe();

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
      req.flush(mockPokemon);
      done();
    });

    it('should trim whitespace from name', (done) => {
      service.getPokemonByName('  pikachu  ').subscribe();

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
      req.flush(mockPokemon);
      done();
    });

    it('should cache Pokemon by name', (done) => {
      // First request
      service.getPokemonByName('pikachu').subscribe();
      const req1 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
      req1.flush(mockPokemon);

      // Second request should use cache
      service.getPokemonByName('pikachu').subscribe((pokemon) => {
        expect(pokemon).toEqual(mockPokemon);
        done();
      });

      // No second HTTP request should be made
      httpMock.expectNone('https://pokeapi.co/api/v2/pokemon/pikachu');
    });

    it('should handle names with hyphens', (done) => {
      const mrMimePokemon: Pokemon = {
        ...mockPokemon,
        id: 122,
        name: 'mr-mime',
      };

      service.getPokemonByName('mr-mime').subscribe((pokemon) => {
        expect(pokemon).toEqual(mrMimePokemon);
        done();
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/mr-mime');
      req.flush(mrMimePokemon);
    });

    it('should handle network error', (done) => {
      service.getPokemonByName('pikachu').subscribe({
        next: () => fail('should have failed'),
        error: (error) => {
          expect(error.message).toContain('Unable to connect');
          done();
        },
      });

      const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
      req.error(new ProgressEvent('error'), { status: 0 });
    });
  });

  describe('cache cross-reference', () => {
    it('should cache by both ID and name', (done) => {
      // Fetch by ID
      service.getPokemonById(25).subscribe();
      const req1 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/25');
      req1.flush(mockPokemon);

      // Fetch by name should use cache
      service.getPokemonByName('pikachu').subscribe((pokemon) => {
        expect(pokemon).toEqual(mockPokemon);
        done();
      });

      // No second HTTP request
      httpMock.expectNone('https://pokeapi.co/api/v2/pokemon/pikachu');
    });

    it('should work in reverse (name then ID)', (done) => {
      // Fetch by name
      service.getPokemonByName('pikachu').subscribe();
      const req1 = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
      req1.flush(mockPokemon);

      // Fetch by ID should use cache
      service.getPokemonById(25).subscribe((pokemon) => {
        expect(pokemon).toEqual(mockPokemon);
        done();
      });

      // No second HTTP request
      httpMock.expectNone('https://pokeapi.co/api/v2/pokemon/25');
    });
  });
});
