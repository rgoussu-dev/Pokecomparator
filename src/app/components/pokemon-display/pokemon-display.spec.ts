import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PokemonDisplay } from './pokemon-display';
import { Pokemon } from '../../models/pokemon.model';
import { ComponentRef } from '@angular/core';

describe('PokemonDisplay', () => {
  let component: PokemonDisplay;
  let componentRef: ComponentRef<PokemonDisplay>;
  let fixture: ComponentFixture<PokemonDisplay>;

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
    await TestBed.configureTestingModule({
      imports: [PokemonDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonDisplay);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('pokemon', mockPokemon);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getPokemonImage', () => {
    it('should return official artwork when available', () => {
      const imageUrl = component.getPokemonImage();
      expect(imageUrl).toBe('https://example.com/pikachu-official.png');
    });

    it('should fallback to front_default when official artwork is not available', () => {
      const pokemonWithoutOfficial: Pokemon = {
        ...mockPokemon,
        sprites: {
          front_default: 'https://example.com/pikachu-default.png',
          other: {
            'official-artwork': {
              front_default: '',
            },
          },
        },
      };
      componentRef.setInput('pokemon', pokemonWithoutOfficial);
      fixture.detectChanges();

      const imageUrl = component.getPokemonImage();
      expect(imageUrl).toBe('https://example.com/pikachu-default.png');
    });
  });

  describe('getDisplayName', () => {
    it('should capitalize single-word names', () => {
      expect(component.getDisplayName()).toBe('Pikachu');
    });

    it('should capitalize names with hyphens', () => {
      const mrMime: Pokemon = { ...mockPokemon, name: 'mr-mime' };
      componentRef.setInput('pokemon', mrMime);
      fixture.detectChanges();

      expect(component.getDisplayName()).toBe('Mr Mime');
    });

    it('should handle multiple hyphens', () => {
      const hoOh: Pokemon = { ...mockPokemon, name: 'ho-oh' };
      componentRef.setInput('pokemon', hoOh);
      fixture.detectChanges();

      expect(component.getDisplayName()).toBe('Ho Oh');
    });
  });

  describe('formatStatName', () => {
    it('should format hp correctly', () => {
      expect(component.formatStatName('hp')).toBe('HP');
    });

    it('should format attack correctly', () => {
      expect(component.formatStatName('attack')).toBe('Attack');
    });

    it('should format defense correctly', () => {
      expect(component.formatStatName('defense')).toBe('Defense');
    });

    it('should format special-attack correctly', () => {
      expect(component.formatStatName('special-attack')).toBe('Special Attack');
    });

    it('should format special-defense correctly', () => {
      expect(component.formatStatName('special-defense')).toBe('Special Defense');
    });

    it('should format speed correctly', () => {
      expect(component.formatStatName('speed')).toBe('Speed');
    });

    it('should return original name for unknown stats', () => {
      expect(component.formatStatName('unknown-stat')).toBe('unknown-stat');
    });
  });

  describe('getTypeColor', () => {
    it('should return correct color for electric type', () => {
      expect(component.getTypeColor('electric')).toBe('#F8D030');
    });

    it('should return correct color for fire type', () => {
      expect(component.getTypeColor('fire')).toBe('#F08030');
    });

    it('should return correct color for water type', () => {
      expect(component.getTypeColor('water')).toBe('#6890F0');
    });

    it('should return correct color for grass type', () => {
      expect(component.getTypeColor('grass')).toBe('#78C850');
    });

    it('should return default color for unknown type', () => {
      expect(component.getTypeColor('unknown')).toBe('#777');
    });
  });

  describe('template rendering', () => {
    it('should display Pokemon name', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h2')?.textContent).toContain('Pikachu');
    });

    it('should display Pokemon ID', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('.pokemon-id')?.textContent).toContain('#25');
    });

    it('should display Pokemon image', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const img = compiled.querySelector('img') as HTMLImageElement;
      expect(img.src).toContain('pikachu-official.png');
      expect(img.alt).toBe('pikachu');
    });

    it('should display type badges', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const typeBadges = compiled.querySelectorAll('.type-badge');
      expect(typeBadges.length).toBe(1);
      expect(typeBadges[0].textContent?.trim()).toBe('Electric');
    });

    it('should display all stats', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const statRows = compiled.querySelectorAll('.stat-row');
      expect(statRows.length).toBe(6);
    });
  });
});
