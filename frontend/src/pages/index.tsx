import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Pokemon } from "../types/pokemon";
import { pokemonService } from "../services/pokemonService";
import { PokemonCard } from "../components/PokemonCard";
import { SearchBar } from "../components/SearchBar";
import { HttpStatus } from "../types/api";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  useEffect(() => {
    fetchPokemons(true);
    // eslint-disable-next-line
  }, [search]);

  const fetchPokemons = async (reset = false) => {
    setLoading(true);
    try {
      const response = await pokemonService.getPokemon({
        limit,
        offset: reset ? 0 : offset,
        search: search || undefined,
      });

      if (response.status === HttpStatus.OK && response.data) {
        if (reset) {
          setPokemons(response.data);
          setOffset(limit);
        } else {
          setPokemons((prev) => [...prev, ...(response.data as Pokemon[])]);
          setOffset((prev) => prev + limit);
        }
        setHasMore(response.data.length === limit);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Failed to fetch pokemon:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed top search bar */}
      <SearchBar value={search} onChange={(value) => setSearch(value)} />

      {/* Layout with left/right images and scrollable middle */}
      <div className="flex flex-1">
        {/* Left fixed image */}
        <div className="hidden md:flex flex-col justify-center items-center w-32 bg-gray-50">
          <Image src="/file.svg" alt="Left" width={64} height={64} />
          {/* Carousel placeholder */}
          <div className="mt-4 w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
            Carousel
          </div>
        </div>

        {/* Middle scrollable Pokémon list */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pokemons.length === 0 && !loading && (
              <div className="col-span-full text-center text-gray-500">
                No Pokémon found.
              </div>
            )}
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-4">
              <button
                onClick={() => fetchPokemons()}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>

        {/* Right fixed image */}
        <div className="hidden md:flex flex-col justify-center items-center w-32 bg-gray-50">
          <Image src="/window.svg" alt="Right" width={64} height={64} />
          {/* Banner placeholder */}
          <div className="mt-4 w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
            Banner
          </div>
        </div>
      </div>
    </div>
  );
}
