import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Search } from './search';
import { PokemonService } from '../../services/pokemon.service';
import { of, throwError } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';

describe('Search', () => {
  let component: Search;
  let fixture: ComponentFixture<Search>;
  let pokemonService: jasmine.SpyObj<PokemonService>;

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

  beforeEach(async () => {
    const pokemonServiceSpy = jasmine.createSpyObj('PokemonService', [
      'getPokemonById',
      'getPokemonByName',
    ]);

    await TestBed.configureTestingModule({
      imports: [Search],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceSpy },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Search);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService) as jasmine.SpyObj<PokemonService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSearch', () => {
    it('should show error when input is empty', () => {
      component.searchInput.set('');
      component.onSearch();

      expect(component.error()).toBe('Please enter a Pokemon name or ID');
      expect(pokemonService.getPokemonById).not.toHaveBeenCalled();
      expect(pokemonService.getPokemonByName).not.toHaveBeenCalled();
    });

    it('should show error when input contains invalid characters', () => {
      component.searchInput.set('pikachu!@#');
      component.onSearch();

      expect(component.error()).toBe('Only letters, numbers, and hyphens are allowed');
      expect(pokemonService.getPokemonById).not.toHaveBeenCalled();
      expect(pokemonService.getPokemonByName).not.toHaveBeenCalled();
    });

    it('should search by ID when input is numeric', () => {
      pokemonService.getPokemonById.and.returnValue(of(mockPokemon));

      component.searchInput.set('25');
      component.onSearch();

      expect(pokemonService.getPokemonById).toHaveBeenCalledWith(25);
      expect(pokemonService.getPokemonByName).not.toHaveBeenCalled();
      expect(component.pokemon()).toEqual(mockPokemon);
      expect(component.loading()).toBe(false);
      expect(component.error()).toBeNull();
    });

    it('should search by name when input is text', () => {
      pokemonService.getPokemonByName.and.returnValue(of(mockPokemon));

      component.searchInput.set('pikachu');
      component.onSearch();

      expect(pokemonService.getPokemonByName).toHaveBeenCalledWith('pikachu');
      expect(pokemonService.getPokemonById).not.toHaveBeenCalled();
      expect(component.pokemon()).toEqual(mockPokemon);
      expect(component.loading()).toBe(false);
      expect(component.error()).toBeNull();
    });

    it('should handle hyphens in Pokemon names', () => {
      pokemonService.getPokemonByName.and.returnValue(of(mockPokemon));

      component.searchInput.set('mr-mime');
      component.onSearch();

      expect(pokemonService.getPokemonByName).toHaveBeenCalledWith('mr-mime');
      expect(component.loading()).toBe(false);
    });

    it('should handle numbers in Pokemon names', () => {
      pokemonService.getPokemonByName.and.returnValue(of(mockPokemon));

      component.searchInput.set('porygon2');
      component.onSearch();

      expect(pokemonService.getPokemonByName).toHaveBeenCalledWith('porygon2');
      expect(component.loading()).toBe(false);
    });

    it('should set loading state during search', () => {
      pokemonService.getPokemonByName.and.returnValue(of(mockPokemon));

      component.searchInput.set('pikachu');

      // Before search
      expect(component.loading()).toBe(false);

      component.onSearch();

      // After search completes
      expect(component.loading()).toBe(false);
      expect(component.pokemon()).toEqual(mockPokemon);
    });

    it('should handle search error', () => {
      const errorMessage = 'Pokemon not found. Please check the spelling and try again.';
      pokemonService.getPokemonByName.and.returnValue(throwError(() => new Error(errorMessage)));

      component.searchInput.set('fakemon');
      component.onSearch();

      expect(component.error()).toBe(errorMessage);
      expect(component.loading()).toBe(false);
      expect(component.pokemon()).toBeNull();
    });

    it('should clear previous results and errors', () => {
      pokemonService.getPokemonByName.and.returnValue(of(mockPokemon));

      // Set initial state
      component.pokemon.set(mockPokemon);
      component.error.set('Previous error');

      component.searchInput.set('charizard');
      component.onSearch();

      expect(component.pokemon()).toEqual(mockPokemon);
      expect(component.error()).toBeNull();
    });
  });

  describe('onKeyPress', () => {
    it('should trigger search on Enter key', () => {
      pokemonService.getPokemonByName.and.returnValue(of(mockPokemon));

      component.searchInput.set('pikachu');
      const event = new KeyboardEvent('keypress', { key: 'Enter' });

      component.onKeyPress(event);

      expect(pokemonService.getPokemonByName).toHaveBeenCalledWith('pikachu');
    });

    it('should not trigger search on other keys', () => {
      component.searchInput.set('pikachu');
      const event = new KeyboardEvent('keypress', { key: 'a' });

      component.onKeyPress(event);

      expect(pokemonService.getPokemonByName).not.toHaveBeenCalled();
      expect(pokemonService.getPokemonById).not.toHaveBeenCalled();
    });
  });

  describe('isSearchDisabled', () => {
    it('should be disabled when loading', () => {
      component.loading.set(true);
      component.searchInput.set('pikachu');

      expect(component.isSearchDisabled()).toBe(true);
    });

    it('should be disabled when input is empty', () => {
      component.loading.set(false);
      component.searchInput.set('');

      expect(component.isSearchDisabled()).toBe(true);
    });

    it('should be disabled when input is whitespace only', () => {
      component.loading.set(false);
      component.searchInput.set('   ');

      expect(component.isSearchDisabled()).toBe(true);
    });

    it('should be enabled when input is valid and not loading', () => {
      component.loading.set(false);
      component.searchInput.set('pikachu');

      expect(component.isSearchDisabled()).toBe(false);
    });
  });
});
