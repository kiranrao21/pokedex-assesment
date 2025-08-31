const axios = require('axios');

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

async function fetchPokemonList(limit = 20, offset = 0, search = '') {
  const { data } = await axios.get(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  let results = data.results;

  // Apply search filter (case-insensitive)
  if (search) {
    results = results.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  const pokemonDetails = await Promise.all(
    results.map(async (pokemon) => {
      const details = await axios.get(pokemon.url);
      return {
        name: details.data.name,
        image: details.data.sprites.other['official-artwork'].front_default,
        types: details.data.types.map((t) => t.type.name),
        height: details.data.height,
        weight: details.data.weight,
      };
    })
  );

  return pokemonDetails;
}

module.exports = { fetchPokemonList };
