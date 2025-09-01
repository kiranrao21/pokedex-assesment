export interface Pokemon {
  id: number;
  name: string;
  image: string | null;
  types: string[];
}

export interface PokemonResponse {
  status: number;
  data: Pokemon[];
}
