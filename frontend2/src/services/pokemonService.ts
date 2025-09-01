import { Pokemon } from "../types/pokemon";
import { HttpStatus, APIResponse, ErrorMessage } from "../types/api";

const API_URL = "/api/pokemon";

export const pokemonService = {
  async getPokemon(params: {
    limit: number;
    offset: number;
    search?: string;
  }): Promise<APIResponse<Pokemon[]>> {
    try {
      const queryParams = new URLSearchParams({
        limit: params.limit.toString(),
        offset: params.offset.toString(),
        ...(params.search ? { search: params.search } : {}),
      });

      const response = await fetch(`${API_URL}?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        return {
          status: response.status as HttpStatus,
          error: data.error || ErrorMessage.FAILED_TO_FETCH,
        };
      }

      return {
        status: HttpStatus.OK,
        data,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: ErrorMessage.SERVER_ERROR,
      };
    }
  },
};
