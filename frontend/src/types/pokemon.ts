export interface Pokemon {
  name: string;
  image: string;
  types: string[];
  height?: number;
  weight?: number;
}

export interface PokemonResponse {
  results: Pokemon[];
  count: number;
}
