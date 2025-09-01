"use client";

import React, { useEffect, useState } from "react";
import { Pokemon } from "@/types/pokemon";
import { pokemonService } from "@/services/pokemonService";
import { PokemonCard } from "@/components/PokemonCard";
import { SearchBar } from "@/components/SearchBar";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Banner } from "@/components/Banner";
import { SideImages } from "@/components/SideImages";

export default function Page() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  useEffect(() => {
    fetchPokemons(true);
    // eslint-disable-next-line
  }, [search]);

  const fetchPokemons = async (reset = false) => {
    setLoading(true);
    setError(null);
    try {
      const response = await pokemonService.getPokemon({
        limit,
        offset: reset ? 0 : offset,
        search,
      });

      if (
        response.status === 200 &&
        response.data?.data &&
        Array.isArray(response.data.data)
      ) {
        if (reset) {
          setPokemons(response.data.data);
        } else {
          setPokemons((prev) => [...prev, ...response.data.data]);
        }
        setHasMore(response.data.data.length === limit);
        setOffset(reset ? limit : offset + limit);
      } else {
        setError("Failed to fetch Pokemon data");
        setPokemons([]);
      }
    } catch (err) {
      setError("An error occurred while fetching Pokemon");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setOffset(0);
    setHasMore(true);
  };

  return (
    <main className="min-h-screen p-8">
      {/* Main content */}
      <div className="container mx-auto">
        <div className="banner-section relative z-20">
          <Banner />
          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}
        </div>
        {/* Pokemon cards section with side images */}
        {/* Fixed search bar with same width as pokemon grid */}

        <div className="relative flex justify-center">
          <div className="pokemon-content-wrapper w-full max-w-7xl relative">
            <SideImages />
            <div className="search-bar-section sticky top-0 left-0 right-0 z-[999] bg-white py-4 shadow-md">
              <div className="container mx-auto flex justify-center">
                <div className="w-full px-4 xl:px-[200px]">
                  <SearchBar onSearch={handleSearch} />
                </div>
              </div>
            </div>
            <div className="pokemon-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto px-4 xl:px-[200px]">
              {pokemons.map((pokemon, index) => (
                <PokemonCard
                  key={pokemon.id || `pokemon-${index}`}
                  pokemon={{
                    ...pokemon,
                    image: pokemon.image || null,
                  }}
                  priority={index < 4}
                />
              ))}
            </div>
            {loading && (
              <div className="flex justify-center mt-8">
                <LoadingSpinner />
              </div>
            )}
            {!loading && hasMore && (
              <button
                onClick={() => fetchPokemons()}
                className="mt-8 px-6 py-2 bg-blue-500 text-white rounded-lg mx-auto block hover:bg-blue-600 transition-colors"
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
