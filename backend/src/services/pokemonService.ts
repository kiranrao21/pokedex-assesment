import { Pokemon, APIResponse, HttpStatus } from "../types";
import { PokeAPIListResponse, PokeAPIDetailResponse } from "../types/pokeapi";

class PokemonService {
  async fetchPokemonList(
    limit: number = 20,
    offset: number = 0,
    search?: string
  ): Promise<APIResponse<Pokemon[]>> {
    try {
      // Call to PokeAPI
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      if (!response.ok) {
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "Failed to fetch from PokeAPI",
        };
      }

      const data = (await response.json()) as PokeAPIListResponse;
      const pokemons: Pokemon[] = await Promise.all(
        data.results.map(async (result: { name: string; url: string }) => {
          const pokemonResponse = await fetch(result.url);
          if (!pokemonResponse.ok) {
            throw new Error(
              `Failed to fetch pokemon details for ${result.name}`
            );
          }
          const pokemonData =
            (await pokemonResponse.json()) as PokeAPIDetailResponse;

          return {
            name: pokemonData.name,
            image: pokemonData.sprites.other["official-artwork"].front_default,
            types: pokemonData.types.map((type) => type.type.name),
            height: pokemonData.height,
            weight: pokemonData.weight,
          };
        })
      );

      // Apply search filter if provided
      const filteredPokemons = search
        ? pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(search.toLowerCase())
          )
        : pokemons;

      if (filteredPokemons.length === 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          error: "No Pokémon found matching the criteria",
        };
      }

      return {
        status: HttpStatus.OK,
        data: filteredPokemons,
      };
    } catch (error) {
      console.error("Error fetching pokemon:", error);
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: "Internal server error",
      };
    }
  }
}

export const pokemonService = new PokemonService();
