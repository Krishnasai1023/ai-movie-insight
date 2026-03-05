/**
 * Movie Search API Route
 * Searches movies by title using OMDB API
 */

import { NextResponse } from 'next/server';
import axios from 'axios';

const OMDB_API_KEY = process.env.OMDB_API_KEY || 'b9a5c02f';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    // Search for movies using OMDB API
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: OMDB_API_KEY,
        s: query,
        type: 'movie',
      },
    });

    if (response.data.Response === 'False') {
      return NextResponse.json(
        { error: response.data.Error || 'No movies found' },
        { status: 404 }
      );
    }

    // Map to simplified format
    const movies = response.data.Search.map((movie: { imdbID: string; Title: string; Year: string; Poster: string }) => ({
      imdbID: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.png',
    }));

    return NextResponse.json(movies);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Failed to search movies' },
      { status: 500 }
    );
  }
}
