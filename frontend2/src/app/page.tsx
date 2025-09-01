"use client";

import React, { useEffect, useState } from "react";
import { Pokemon } from "@/types/pokemon";
import { pokemonService } from "@/services/pokemonService";
import { PokemonCard } from "@/components/PokemonCard";
import { SearchBar } from "@/components/SearchBar";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Banner } from "@/components/Banner";

export default function Page() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isFixed, setIsFixed] = useState(false);
  const limit = 20;

  useEffect(() => {
    const handleScroll = () => {
      const searchSection = document.getElementById("search-section");
      const leftImage = document.getElementById("left-image");
      const rightImage = document.getElementById("right-image");

      if (searchSection && leftImage && rightImage) {
        const rect = searchSection.getBoundingClientRect();

        if (rect.top <= 0 && !isFixed) {
          setIsFixed(true);
          leftImage.style.position = "fixed";
          leftImage.style.top = "72px";
          rightImage.style.position = "fixed";
          rightImage.style.top = "72px";
          rightImage.style.right = "32px";
        } else if (rect.top > 0 && isFixed) {
          setIsFixed(false);
          leftImage.style.position = "static";
          leftImage.style.top = "auto";
          rightImage.style.position = "static";
          rightImage.style.top = "auto";
          rightImage.style.right = "auto";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFixed]);

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
            <div
              className="pokemon-section grid grid-cols-12 gap-4 mx-auto px-4"
              id="pokemon-section"
            >
              {/* Left Static Image */}
              <div className="col-span-2">
                <div
                  className="side-image-left w-[150px] transition-all duration-300"
                  id="left-image"
                >
                  <div className="h-[600px] bg-yellow-200 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-semibold text-yellow-800 rotate-[-90deg]">
                      Static Image 1
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Content - Search and Pokemon Cards */}
              <div className="col-span-8">
                {/* Search Bar - Fixed */}
                <div
                  className="sticky top-0 bg-white py-2 z-[999] mb-6"
                  id="search-section"
                >
                  <SearchBar onSearch={handleSearch} />
                </div>

                {/* Pokemon Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              </div>

              {/* Right Static Image */}
              <div className="col-span-2">
                <div
                  className="side-image-right w-[150px] transition-all duration-300"
                  id="right-image"
                >
                  <div className="h-[600px] bg-pink-200 rounded-lg flex items-center justify-center">
                    <span className="text-xl font-semibold text-pink-800 rotate-90">
                      Static Image 2
                    </span>
                  </div>
                </div>
              </div>
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
