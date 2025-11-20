import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../models/pokemon.model';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  const mockPokemon: Pokemon = {
    id: 25,
    name: 'pikachu',
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
      {
        base_stat: 35,
        effort: 0,
        stat: {
          name: 'hp',
          url: 'https://pokeapi.co/api/v2/stat/1/'
        }
      },
      {
        base_stat: 55,
        effort: 0,
        stat: {
          name: 'attack',
          url: 'https://pokeapi.co/api/v2/stat/2/'
        }
      }
    ],
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
      other: {
        'official-artwork': {
          front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
        }
      }
    },
    height: 4,
    weight: 60
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PokemonService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
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

  it('should fetch Pokemon by ID', () => {
    service.getPokemon(25).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
      expect(pokemon.id).toBe(25);
      expect(pokemon.name).toBe('pikachu');
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/25');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should fetch Pokemon by name', () => {
    service.getPokemon('pikachu').subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
      expect(pokemon.name).toBe('pikachu');
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should convert name to lowercase', () => {
    service.getPokemon('PIKACHU').subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/pikachu');
    expect(req.request.method).toBe('GET');
    req.flush(mockPokemon);
  });

  it('should handle error when Pokemon not found', () => {
    service.getPokemon('invalidpokemon').subscribe({
      next: () => {
        throw new Error('should have failed');
      },
      error: (error) => {
        expect(error.message).toContain('Pokemon not found');
      }
    });

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon/invalidpokemon');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });
});
