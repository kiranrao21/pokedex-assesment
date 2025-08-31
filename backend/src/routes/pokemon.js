const express = require('express');
const router = express.Router();
const { fetchPokemonList } = require('../services/pokemonService');

// GET /api/pokemon?limit=20&offset=0&search=pikachu
router.get('/', async (req, res) => {
  console.log('****HERE')
  const limit = parseInt(req.query.limit) || 20;
  const offset = parseInt(req.query.offset) || 0;
  const search = req.query.search || '';

  try {
    const data = await fetchPokemonList(limit, offset, search);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch Pokémon', error: error.message });
  }
});

module.exports = router;
