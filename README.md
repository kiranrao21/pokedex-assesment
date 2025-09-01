# Pokedex Assessment

A full-stack Pokemon application with a Next.js frontend and Node.js backend.

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

2. Configure the environment:
   - The example configuration is provided for assessment purposes:
   ```env
   # .env.example
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
   - Note: In a production environment, sensitive configurations should be properly secured

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
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

#### Get Pokemon List
```http
GET /api/pokemon
```

Query Parameters:
- `limit` (number): Number of Pokemon to return (default: 20)
- `offset` (number): Number of Pokemon to skip (default: 0)
- `search` (string): Search Pokemon by name

Response:
```json
{
  "status": 200,
  "data": [
    {
      "name": string,
      "image": string,
      "types": string[],
      "height": number,
      "weight": number
    }
  ],
  "error": string
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
