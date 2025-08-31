export interface PokeAPIListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokeAPIDetailResponse {
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
}
