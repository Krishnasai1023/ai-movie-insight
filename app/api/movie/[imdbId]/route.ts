/**
 * API Route: Fetch Movie Metadata
 * Endpoint: GET /api/movie/[imdbId]
 * Description: Fetches movie metadata from OMDB API
 */

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ imdbId: string }> }
) {
  try {
    const { imdbId } = await params;

    // Validate IMDb ID format
    const imdbIdRegex = /^tt\d{7,8}$/;
    if (!imdbIdRegex.test(imdbId)) {
      return NextResponse.json(
        { error: 'Invalid IMDb ID format. Expected format: tt1234567' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OMDB_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OMDB API key not configured' },
        { status: 500 }
      );
    }

    // Fetch movie data from OMDB API
    const response = await axios.get('http://www.omdbapi.com/', {
      params: {
        apikey: apiKey,
        i: imdbId,
        plot: 'full',
      },
    });

    if (response.data.Response === 'False') {
      return NextResponse.json(
        { error: response.data.Error || 'Movie not found' },
        { status: 404 }
      );
    }

    // Transform the data to match our interface
    const movieData = {
      imdbID: response.data.imdbID,
      title: response.data.Title,
      year: response.data.Year,
      rated: response.data.Rated,
      released: response.data.Released,
      runtime: response.data.Runtime,
      genre: response.data.Genre,
      director: response.data.Director,
      writer: response.data.Writer,
      actors: response.data.Actors,
      plot: response.data.Plot,
      poster: response.data.Poster,
      ratings: response.data.Ratings || [],
      imdbRating: response.data.imdbRating,
      imdbVotes: response.data.imdbVotes,
      type: response.data.Type,
      response: response.data.Response,
    };

    return NextResponse.json(movieData, { status: 200 });
  } catch (error) {
    console.error('Error fetching movie metadata:', error);
    return NextResponse.json(
      { error: 'Failed to fetch movie metadata' },
      { status: 500 }
    );
  }
}
