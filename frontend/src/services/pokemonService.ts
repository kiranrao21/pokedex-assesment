import { Pokemon } from '../types/pokemon';

const API_URL = "http://localhost:5000/api/pokemon";

export const pokemonService = {
  async getPokemon(params: { limit: number; offset: number; search?: string }): Promise<Pokemon[]> {
    const queryParams = new URLSearchParams({
      limit: params.limit.toString(),
      offset: params.offset.toString(),
      ...(params.search ? { search: params.search } : {})
    });

    const response = await fetch(`${API_URL}?${queryParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch pokemon');
    }
    return response.json();
  }
};
