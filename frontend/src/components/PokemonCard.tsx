import { Pokemon } from "../types/pokemon";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return (
    <div className="bg-white rounded shadow p-4 flex flex-col items-center">
      <Image src={pokemon.image} alt={pokemon.name} width={96} height={96} />
      <h3 className="mt-2 font-bold text-lg">{pokemon.name}</h3>
      <div className="flex gap-2 mt-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};
