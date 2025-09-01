# Pokédex Assessment

A full-stack Pokémon application with a Next.js frontend and Node.js backend.

## Architecture Overview

This project implements a backend service within the Next.js frontend application for several important reasons:

1. **Security**: 
   - Prevents exposure of sensitive API keys and configuration
   - Handles API rate limiting on the server side
   - Provides a secure layer between the client and external APIs

2. **Best Practices**:
   - Enables server-side data transformation and filtering
   - Reduces client-side processing and improves performance
   - Centralizes API logic and error handling
   - Makes it easier to implement caching and optimization strategies

3. **Maintainability**:
   - Single point of truth for API integrations
   - Easier to update API logic without client-side changes
   - Consistent error handling and response formatting

The backend service in the frontend acts as a proxy to the external PokeAPI, providing a clean and secure interface for the client-side application.

## Project Structure

```
pokedex-assesment/
├── backend/         # Express.js backend
│   └── src/        # Source files
└── frontend2/      # Next.js frontend
    └── src/        # Source files
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The backend server will start on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend application will start on http://localhost:3000

## API Documentation

### Base URL
```
http://localhost:3000/api
```

The API endpoints are served through Next.js API routes, providing a secure and efficient way to handle external API requests.

### Endpoints

#### Get Pokémon List
```http
GET /pokemon
```

Query Parameters:
- `limit` (number): Number of Pokémon to return (default: 20)
- `offset` (number): Number of Pokémon to skip (default: 0)
- `search` (string): Search Pokémon by name

Response:
```json
{
  "status": 200,
  "data": [
    {
      "id": number,
      "name": string,
      "image": string,
      "types": string[],
      "stats": {
        "hp": number,
        "attack": number,
        "defense": number,
        "specialAttack": number,
        "specialDefense": number,
        "speed": number
      }
    }
  ],
  "message": string
}
```

#### Get Single Pokémon
```http
GET /pokemon/:id
```

Parameters:
- `id` (number): Pokémon ID

Response:
```json
{
  "status": 200,
  "data": {
    "id": number,
    "name": string,
    "image": string,
    "types": string[],
    "stats": {
      "hp": number,
      "attack": number,
      "defense": number,
      "specialAttack": number,
      "specialDefense": number,
      "speed": number
    }
  },
  "message": string
}
```

### Error Responses

```json
{
  "status": number,
  "message": string,
  "error": string
}
```

Status Codes:
- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error
