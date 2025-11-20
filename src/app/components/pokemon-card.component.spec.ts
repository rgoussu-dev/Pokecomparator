import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { Pokemon } from '../models/pokemon';

describe('PokemonCardComponent', () => {
  let component: PokemonCardComponent;
  let fixture: ComponentFixture<PokemonCardComponent>;

  const mockPokemon: Pokemon = {
    id: 25,
    name: 'pikachu',
    sprites: {
      front_default: 'https://example.com/pikachu.png',
      other: {
        'official-artwork': {
          front_default: 'https://example.com/pikachu-artwork.png'
        }
      }
    },
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
      { base_stat: 35, stat: { name: 'hp', url: '' } },
      { base_stat: 55, stat: { name: 'attack', url: '' } },
      { base_stat: 40, stat: { name: 'defense', url: '' } },
      { base_stat: 50, stat: { name: 'special-attack', url: '' } },
      { base_stat: 50, stat: { name: 'special-defense', url: '' } },
      { base_stat: 90, stat: { name: 'speed', url: '' } }
    ]
  };

  const mockDualTypePokemon: Pokemon = {
    id: 6,
    name: 'charizard',
    sprites: {
      front_default: 'https://example.com/charizard.png',
      other: {
        'official-artwork': {
          front_default: 'https://example.com/charizard-artwork.png'
        }
      }
    },
    types: [
      {
        slot: 1,
        type: {
          name: 'fire',
          url: 'https://pokeapi.co/api/v2/type/10/'
        }
      },
      {
        slot: 2,
        type: {
          name: 'flying',
          url: 'https://pokeapi.co/api/v2/type/3/'
        }
      }
    ],
    stats: [
      { base_stat: 78, stat: { name: 'hp', url: '' } },
      { base_stat: 84, stat: { name: 'attack', url: '' } },
      { base_stat: 78, stat: { name: 'defense', url: '' } },
      { base_stat: 109, stat: { name: 'special-attack', url: '' } },
      { base_stat: 85, stat: { name: 'special-defense', url: '' } },
      { base_stat: 100, stat: { name: 'speed', url: '' } }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading state when no pokemon is provided', () => {
    fixture.componentRef.setInput('pokemon', null);
    fixture.detectChanges();
    
    const loadingCard = fixture.nativeElement.querySelector('.pokemon-card.loading');
    expect(loadingCard).toBeTruthy();
    
    const skeletons = fixture.nativeElement.querySelectorAll('.skeleton');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('should display pokemon name capitalized', () => {
    fixture.componentRef.setInput('pokemon', mockPokemon);
    fixture.detectChanges();
    
    const name = fixture.nativeElement.querySelector('.pokemon-name');
    expect(name.textContent).toBe('Pikachu');
  });

  it('should display pokemon ID with padding', () => {
    fixture.componentRef.setInput('pokemon', mockPokemon);
    fixture.detectChanges();
    
    const id = fixture.nativeElement.querySelector('.pokemon-id');
    expect(id.textContent).toBe('#025');
  });

  it('should display official artwork image', () => {
    fixture.componentRef.setInput('pokemon', mockPokemon);
    fixture.detectChanges();
    
    const img = fixture.nativeElement.querySelector('.pokemon-image');
    expect(img).toBeTruthy();
    expect(img.src).toBe('https://example.com/pikachu-artwork.png');
  });

  it('should have correct alt text for image', () => {
    fixture.componentRef.setInput('pokemon', mockPokemon);
    fixture.detectChanges();
    
    const img = fixture.nativeElement.querySelector('.pokemon-image');
    expect(img.alt).toBe('Image of Pikachu');
  });

  it('should display single type badge', () => {
    fixture.componentRef.setInput('pokemon', mockPokemon);
    fixture.detectChanges();
    
    const badges = fixture.nativeElement.querySelectorAll('app-type-badge');
    expect(badges.length).toBe(1);
  });

  it('should display dual type badges', () => {
    fixture.componentRef.setInput('pokemon', mockDualTypePokemon);
    fixture.detectChanges();
    
    const badges = fixture.nativeElement.querySelectorAll('app-type-badge');
    expect(badges.length).toBe(2);
  });

  it('should display stats list', () => {
    fixture.componentRef.setInput('pokemon', mockPokemon);
    fixture.detectChanges();
    
    const statsList = fixture.nativeElement.querySelector('app-stats-list');
    expect(statsList).toBeTruthy();
  });

  it('should use fallback sprite when official artwork is missing', () => {
    const pokemonNoArtwork: Pokemon = {
      ...mockPokemon,
      sprites: {
        front_default: 'https://example.com/fallback.png',
        other: {
          'official-artwork': {
            front_default: null
          }
        }
      }
    };
    
    fixture.componentRef.setInput('pokemon', pokemonNoArtwork);
    fixture.detectChanges();
    
    expect(component.imageUrl()).toBe('https://example.com/fallback.png');
  });

  it('should display placeholder when no images available', () => {
    const pokemonNoImages: Pokemon = {
      ...mockPokemon,
      sprites: {
        front_default: null,
        other: {
          'official-artwork': {
            front_default: null
          }
        }
      }
    };
    
    fixture.componentRef.setInput('pokemon', pokemonNoImages);
    fixture.detectChanges();
    
    const placeholder = fixture.nativeElement.querySelector('.image-placeholder');
    expect(placeholder).toBeTruthy();
    expect(placeholder.textContent.trim()).toBe('No Image');
  });

  it('should handle special pokemon names', () => {
    const mrMime: Pokemon = {
      ...mockPokemon,
      name: 'mr-mime',
      id: 122
    };
    
    fixture.componentRef.setInput('pokemon', mrMime);
    fixture.detectChanges();
    
    const name = fixture.nativeElement.querySelector('.pokemon-name');
    expect(name.textContent).toBe('Mr. Mime');
  });
});
