import express from 'express';
import cors from 'cors';
import pokemonRoutes from './routes/pokemon';
import { HttpStatus } from './types';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/pokemon', pokemonRoutes);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    error: 'Internal Server Error'
  });
});

// 404 handler
app.use((req: express.Request, res: express.Response) => {
  res.status(HttpStatus.NOT_FOUND).json({
    status: HttpStatus.NOT_FOUND,
    error: 'Route not found'
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
