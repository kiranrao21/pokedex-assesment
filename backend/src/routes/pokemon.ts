import express, { Request, Response } from 'express';
import { pokemonService } from '../services/pokemonService';
import { HttpStatus } from '../types';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const limit = parseInt(req.query.limit as string) || 20;
  const offset = parseInt(req.query.offset as string) || 0;
  const search = req.query.search as string | undefined;

  const result = await pokemonService.fetchPokemonList(limit, offset, search);
  res.status(result.status).json(result.data || { error: result.error });
});

export default router;
