/**
 * Type definitions for the AI Movie Insight Builder application
 */

export interface MovieMetadata {
  imdbID: string;
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  poster: string;
  ratings: Rating[];
  imdbRating: string;
  imdbVotes: string;
  type: string;
  response: string;
}

export interface Rating {
  source: string;
  value: string;
}

export interface Review {
  author: string;
  content: string;
  rating?: number;
  date?: string;
  helpful?: number;
}

export interface SentimentAnalysis {
  overallSentiment: 'Positive' | 'Mixed' | 'Negative';
  summary: string;
  positivePercentage: number;
  negativePercentage: number;
  neutralPercentage: number;
  keyThemes: string[];
  pros: string[];
  cons: string[];
}

export interface MovieInsight {
  metadata: MovieMetadata;
  reviews: Review[];
  sentiment: SentimentAnalysis;
}

export interface ApiError {
  error: string;
  message: string;
  statusCode?: number;
}
