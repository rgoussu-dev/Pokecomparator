export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonSprite {
  front_default: string;
  other?: {
    'official-artwork'?: {
      front_default: string;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: PokemonSprite;
  height: number;
  weight: number;
}

export interface ComparisonState {
  pokemon1: Pokemon | null;
  pokemon2: Pokemon | null;
  mode: 'idle' | 'comparing' | 'loading';
}
