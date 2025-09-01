import { Pokemon } from "../types/pokemon";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: Pokemon;
  priority?: boolean;
}

export const PokemonCard = ({
  pokemon,
  priority = false,
}: PokemonCardProps) => {
  return (
    <div className="bg-white rounded p-4 flex border border-gray-200 text-black hover:border-gray-300 transition-all duration-300 ease-in-out transform hover:scale-95 hover:shadow-lg">
      <div className="flex-shrink-0">
        {/* {pokemon.image} */}
        {pokemon.image ? (
          <Image
            src={pokemon.image}
            alt={pokemon.name}
            width={96}
            height={96}
            priority={priority}
            className="object-contain"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>
      <div className="ml-4 flex flex-col justify-center">
        <h3 className="font-bold text-lg capitalize mb-2">{pokemon.name}</h3>
        <div className="flex flex-nowrap overflow-x-auto gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium capitalize whitespace-nowrap"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
