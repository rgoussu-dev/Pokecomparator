import { TestBed } from '@angular/core/testing';
import { ComparisonService } from './comparison.service';
import { Pokemon } from '../models/pokemon.model';

describe('ComparisonService', () => {
  let service: ComparisonService;

  const mockPokemon1: Pokemon = {
    id: 25,
    name: 'pikachu',
    types: [
      {
        slot: 1,
        type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' }
      }
    ],
    stats: [
      {
        base_stat: 35,
        effort: 0,
        stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' }
      }
    ],
    sprites: {
      front_default: 'sprite.png',
      other: {
        'official-artwork': { front_default: 'artwork.png' }
      }
    },
    height: 4,
    weight: 60
  };

  const mockPokemon2: Pokemon = {
    id: 6,
    name: 'charizard',
    types: [
      {
        slot: 1,
        type: { name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/' }
      }
    ],
    stats: [
      {
        base_stat: 78,
        effort: 0,
        stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' }
      }
    ],
    sprites: {
      front_default: 'sprite.png',
      other: {
        'official-artwork': { front_default: 'artwork.png' }
      }
    },
    height: 17,
    weight: 905
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComparisonService]
    });
    service = TestBed.inject(ComparisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty state', () => {
    expect(service.pokemon1()).toBeNull();
    expect(service.pokemon2()).toBeNull();
    expect(service.mode()).toBe('idle');
    expect(service.isComparing()).toBe(false);
  });

  it('should set Pokemon in slot 1', () => {
    service.setPokemon1(mockPokemon1);
    expect(service.pokemon1()).toEqual(mockPokemon1);
    expect(service.mode()).toBe('idle');
  });

  it('should set Pokemon in slot 2', () => {
    service.setPokemon2(mockPokemon2);
    expect(service.pokemon2()).toEqual(mockPokemon2);
    expect(service.mode()).toBe('idle');
  });

  it('should enter comparing mode when both slots are filled', () => {
    service.setPokemon1(mockPokemon1);
    service.setPokemon2(mockPokemon2);
    expect(service.mode()).toBe('comparing');
    expect(service.isComparing()).toBe(true);
    expect(service.hasBothPokemon()).toBe(true);
  });

  it('should prevent comparing same Pokemon in both slots', () => {
    service.setPokemon1(mockPokemon1);
    expect(() => service.setPokemon2(mockPokemon1)).toThrow('Cannot compare the same Pokemon');
  });

  it('should clear comparison', () => {
    service.setPokemon1(mockPokemon1);
    service.setPokemon2(mockPokemon2);
    service.clearComparison();
    expect(service.pokemon1()).toBeNull();
    expect(service.pokemon2()).toBeNull();
    expect(service.mode()).toBe('idle');
  });

  it('should swap Pokemon between slots', () => {
    service.setPokemon1(mockPokemon1);
    service.setPokemon2(mockPokemon2);
    service.swapPokemon();
    expect(service.pokemon1()).toEqual(mockPokemon2);
    expect(service.pokemon2()).toEqual(mockPokemon1);
  });

  it('should set loading state', () => {
    service.setLoading(true);
    expect(service.mode()).toBe('loading');
    service.setLoading(false);
    expect(service.mode()).toBe('idle');
  });

  it('should track hasAnyPokemon', () => {
    expect(service.hasAnyPokemon()).toBe(false);
    service.setPokemon1(mockPokemon1);
    expect(service.hasAnyPokemon()).toBe(true);
  });

  it('should allow replacing Pokemon in slot 1', () => {
    service.setPokemon1(mockPokemon1);
    service.setPokemon1(mockPokemon2);
    expect(service.pokemon1()).toEqual(mockPokemon2);
  });

  it('should allow clearing individual slots', () => {
    service.setPokemon1(mockPokemon1);
    service.setPokemon2(mockPokemon2);
    service.setPokemon1(null);
    expect(service.pokemon1()).toBeNull();
    expect(service.pokemon2()).toEqual(mockPokemon2);
    expect(service.mode()).toBe('idle');
  });
});
