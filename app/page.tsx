/**
 * AI Movie Insight Builder - Main Page
 * A full-stack application for analyzing movie reviews using AI
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { MovieMetadata, Review, SentimentAnalysis } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorDisplay from '@/components/ErrorDisplay';
import MovieCard from '@/components/MovieCard';
import SentimentDisplay from '@/components/SentimentDisplay';
import ReviewsList from '@/components/ReviewsList';

interface SearchResult {
  imdbID: string;
  title: string;
  year: string;
  poster: string;
}

export default function Home() {
  const [imdbId, setImdbId] = useState('');
  const [searchMode, setSearchMode] = useState<'id' | 'title'>('title');
  const [titleQuery, setTitleQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState('');
  const [movieData, setMovieData] = useState<MovieMetadata | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sentiment, setSentiment] = useState<SentimentAnalysis | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showTrailer, setShowTrailer] = useState(false);

  // Example IMDb IDs for quick testing
  const exampleMovies = [
    { id: 'tt0133093', name: 'The Matrix' },
    { id: 'tt0111161', name: 'The Shawshank Redemption' },
    { id: 'tt0468569', name: 'The Dark Knight' },
    { id: 'tt1375666', name: 'Inception' },
  ];

  // Featured movies for the carousel
  const featuredMovies = [
    {
      id: 'tt0111161',
      title: 'The Shawshank Redemption',
      year: '1994',
      rating: '9.3',
      poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg',
      genre: 'Drama',
      description: 'Two imprisoned men bond over a number of years.'
    },
    {
      id: 'tt0468569',
      title: 'The Dark Knight',
      year: '2008',
      rating: '9.0',
      poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
      genre: 'Action, Crime, Drama',
      description: 'When the menace known as the Joker wreaks havoc.'
    },
    {
      id: 'tt0137523',
      title: 'Fight Club',
      year: '1999',
      rating: '8.8',
      poster: 'https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg',
      genre: 'Drama',
      description: 'An insomniac office worker forms an underground fight club.'
    },
    {
      id: 'tt1375666',
      title: 'Inception',
      year: '2010',
      rating: '8.8',
      poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
      genre: 'Action, Sci-Fi, Thriller',
      description: 'A thief who enters the dreams of others.'
    },
    {
      id: 'tt0109830',
      title: 'Forrest Gump',
      year: '1994',
      rating: '8.8',
      poster: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
      genre: 'Drama, Romance',
      description: 'The presidencies of Kennedy and Johnson unfold.'
    },
    {
      id: 'tt0133093',
      title: 'The Matrix',
      year: '1999',
      rating: '8.7',
      poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
      genre: 'Action, Sci-Fi',
      description: 'A computer hacker learns about the true nature of reality.'
    },
    {
      id: 'tt0120737',
      title: 'The Lord of the Rings',
      year: '2001',
      rating: '8.8',
      poster: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg',
      genre: 'Adventure, Drama, Fantasy',
      description: 'A meek Hobbit embarks on a quest to destroy a powerful ring.'
    },
    {
      id: 'tt0816692',
      title: 'Interstellar',
      year: '2014',
      rating: '8.6',
      poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
      genre: 'Adventure, Drama, Sci-Fi',
      description: 'A team of explorers travel through a wormhole in space.'
    }
  ];

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  const toggleFavorite = (imdbID: string) => {
    const newFavorites = favorites.includes(imdbID)
      ? favorites.filter(id => id !== imdbID)
      : [...favorites, imdbID];
    setFavorites(newFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
  };

  // Search movies by title with debounce
  const searchMoviesByTitle = useCallback(async (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowSuggestions(false);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const results = await response.json();
        setSearchResults(results);
        setShowSuggestions(true);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Handle title input change with debounce
  useEffect(() => {
    if (searchMode === 'title' && titleQuery) {
      const timer = setTimeout(() => {
        searchMoviesByTitle(titleQuery);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [titleQuery, searchMode, searchMoviesByTitle]);

  const validateImdbId = (id: string): boolean => {
    const imdbIdRegex = /^tt\d{7,8}$/;
    return imdbIdRegex.test(id);
  };

  const selectMovie = (result: SearchResult) => {
    setImdbId(result.imdbID);
    setTitleQuery(result.title);
    setShowSuggestions(false);
    // Auto-analyze
    analyzeMovie(result.imdbID);
  };

  const analyzeMovie = async (movieId: string) => {
    // Reset previous data
    setError('');
    setMovieData(null);
    setReviews([]);
    setSentiment(null);
    setShowTrailer(false);

    setIsLoading(true);

    try {
      // Step 1: Fetch movie metadata
      setLoadingMessage('Fetching movie details...');
      const movieResponse = await fetch(`/api/movie/${movieId}`);
      
      if (!movieResponse.ok) {
        const errorData = await movieResponse.json();
        throw new Error(errorData.error || 'Failed to fetch movie data');
      }

      const movie: MovieMetadata = await movieResponse.json();
      setMovieData(movie);

      // Step 2: Fetch reviews
      setLoadingMessage('Retrieving audience reviews...');
      const reviewsResponse = await fetch(`/api/reviews/${movieId}`);
      
      if (!reviewsResponse.ok) {
        const errorData = await reviewsResponse.json();
        throw new Error(errorData.error || 'Failed to fetch reviews');
      }

      const fetchedReviews: Review[] = await reviewsResponse.json();
      setReviews(fetchedReviews);

      // Step 3: Analyze sentiment
      setLoadingMessage('Analyzing sentiment with AI...');
      const sentimentResponse = await fetch('/api/sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviews: fetchedReviews,
          movieTitle: movie.title,
        }),
      });

      if (!sentimentResponse.ok) {
        const errorData = await sentimentResponse.json();
        throw new Error(errorData.error || 'Failed to analyze sentiment');
      }

      const sentimentData: SentimentAnalysis = await sentimentResponse.json();
      setSentiment(sentimentData);

    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchMode === 'id') {
      // Validate IMDb ID
      if (!imdbId.trim()) {
        setError('Please enter an IMDb ID');
        return;
      }
      if (!validateImdbId(imdbId.trim())) {
        setError('Invalid IMDb ID format. Please use format: tt1234567');
        return;
      }
      analyzeMovie(imdbId.trim());
    } else {
      // Title search mode
      if (!titleQuery.trim()) {
        setError('Please enter a movie title');
        return;
      }
      // Show suggestions if not already visible
      if (searchResults.length > 0) {
        setShowSuggestions(true);
      } else {
        setError('No movies found. Try a different title.');
      }
    }
  };

  const handleExampleClick = (id: string) => {
    setImdbId(id);
    analyzeMovie(id);
  };

  const handleRetry = () => {
    setError('');
    if (imdbId) {
      analyzeMovie(imdbId);
    }
  };

  // Helper function to get YouTube trailer search URL
  const getYouTubeSearchQuery = (title: string, year: string): string => {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${title} ${year} official trailer`)}`;
  };

  // YouTube trailer IDs for featured movies (for better UX)
  const trailerMap: Record<string, string> = {
    'tt0111161': 'NmzuHjWmXOc', // Shawshank Redemption
    'tt0468569': 'EXeTwQWrcwY', // The Dark Knight
    'tt0137523': 'qtRKdVHc-cE', // Fight Club
    'tt1375666': 'YoHD9XEInc0', // Inception
    'tt0109830': 'bLvqoHBptjg', // Forrest Gump
    'tt0133093': 'vKQi3bBA1y8', // The Matrix
    'tt0120737': '_e8QGuG50ds', // LOTR
    'tt0816692': '2LqzF5WauAw', // Interstellar
  };

  const getTrailerId = (imdbID: string): string => {
    return trailerMap[imdbID] || '';
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image with Blur */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=2070&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
      {/* Header */}
      <header className="bg-white/10 dark:bg-black/10 backdrop-blur-xl border-b border-white/20 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl">
              🎬 AI Movie Insight Builder
            </h1>
            <p className="mt-2 text-white/90 drop-shadow-lg font-medium">
              Discover what audiences really think with AI-powered sentiment analysis
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Favorites Section */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-6 mb-6"
          >
            <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-3 flex items-center gap-2">
              ⭐ My Watchlist ({favorites.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {favorites.map((favId) => (
                <button
                  key={favId}
                  onClick={() => {
                    setImdbId(favId);
                    analyzeMovie(favId);
                  }}
                  className="px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl text-white font-semibold hover:bg-white/30 transition-all duration-200 text-sm shadow-lg flex items-center gap-2"
                >
                  {favId}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(favId);
                    }}
                    className="hover:scale-125 transition-transform"
                  >
                    ✕
                  </button>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 mb-8"
        >
          {/* Search Mode Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setSearchMode('title')}
              className={`flex-1 px-4 py-3 rounded-2xl font-bold transition-all duration-200 ${
                searchMode === 'title'
                  ? 'bg-white/30 backdrop-blur-xl text-white border-2 border-white/40 shadow-lg'
                  : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
              }`}
            >
              🔍 Search by Title
            </button>
            <button
              onClick={() => setSearchMode('id')}
              className={`flex-1 px-4 py-3 rounded-2xl font-bold transition-all duration-200 ${
                searchMode === 'id'
                  ? 'bg-white/30 backdrop-blur-xl text-white border-2 border-white/40 shadow-lg'
                  : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
              }`}
            >
              🎬 Search by IMDb ID
            </button>
          </div>

          <form onSubmit={handleSearch}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <label
                  htmlFor="searchInput"
                  className="block text-sm font-semibold text-white/90 mb-2 drop-shadow-lg"
                >
                  {searchMode === 'title' ? 'Search Movies by Title' : 'Enter IMDb Movie ID'}
                </label>
                {searchMode === 'title' ? (
                  <>
                    <input
                      type="text"
                      id="searchInput"
                      value={titleQuery}
                      onChange={(e) => setTitleQuery(e.target.value)}
                      onFocus={() => searchResults.length > 0 && setShowSuggestions(true)}
                      placeholder="e.g., The Matrix, Inception..."
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-2xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/60 transition-all duration-200"
                      disabled={isLoading}
                      autoComplete="off"
                    />
                    
                    {/* Autocomplete Suggestions */}
                    <AnimatePresence>
                      {showSuggestions && searchResults.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl max-h-96 overflow-y-auto"
                        >
                          {searchResults.map((result) => (
                            <button
                              key={result.imdbID}
                              onClick={() => selectMovie(result)}
                              className="w-full flex items-center gap-3 p-3 hover:bg-purple-100 transition-colors duration-200 text-left border-b border-gray-200 last:border-b-0"
                            >
                              <div className="relative w-12 h-16 flex-shrink-0">
                                <Image
                                  src={result.poster}
                                  alt={result.title}
                                  fill
                                  className="object-cover rounded-lg"
                                  sizes="48px"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50x75?text=No+Image';
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <p className="font-bold text-gray-900">{result.title}</p>
                                <p className="text-sm text-gray-600">{result.year}</p>
                              </div>
                              <span className="text-xs text-gray-500 font-mono">{result.imdbID}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {isSearching && (
                      <p className="mt-2 text-sm text-white/70 drop-shadow-md">
                        Searching...
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      id="searchInput"
                      value={imdbId}
                      onChange={(e) => setImdbId(e.target.value)}
                      placeholder="e.g., tt0133093"
                      className="w-full px-4 py-3 bg-white/20 backdrop-blur-xl border-2 border-white/30 rounded-2xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/60 transition-all duration-200"
                      disabled={isLoading}
                    />
                    <p className="mt-2 text-sm text-white/70 drop-shadow-md">
                      Format: tt followed by 7-8 digits (e.g., tt0133093)
                    </p>
                  </>
                )}
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-auto px-8 py-3 bg-white/30 backdrop-blur-xl hover:bg-white/40 text-white font-bold rounded-2xl shadow-2xl border-2 border-white/40 transform transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Movie'}
                </button>
              </div>
            </div>
          </form>

          {/* Example Movies */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-white/90 mb-3 drop-shadow-lg">
              Try these examples:
            </p>
            <div className="flex flex-wrap gap-2">
              {exampleMovies.map((movie) => (
                <button
                  key={movie.id}
                  onClick={() => handleExampleClick(movie.id)}
                  disabled={isLoading}
                  className="px-4 py-2 bg-white/20 backdrop-blur-xl text-white border border-white/30 rounded-2xl hover:bg-white/30 transition-all duration-200 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {movie.name} ({movie.id})
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Movies Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-white drop-shadow-2xl mb-2">
              🌟 Featured Movies
            </h2>
            <p className="text-white/80 drop-shadow-lg font-medium">
              Click any movie to analyze its reviews
            </p>
          </div>
          
          <div className="relative overflow-hidden">
            <motion.div 
              className="flex gap-4 pb-4 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: -1400, right: 0 }}
              dragElastic={0.1}
              whileTap={{ cursor: 'grabbing' }}
            >
              {featuredMovies.map((movie) => (
                <motion.div
                  key={movie.id}
                  className="flex-shrink-0 w-64 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setImdbId(movie.id);
                    handleExampleClick(movie.id);
                  }}
                >
                  {/* Movie Poster */}
                  <div className="relative h-80 overflow-hidden bg-black/30">
                    <div className="relative w-full h-full">
                      <Image 
                        src={movie.poster} 
                        alt={movie.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="256px"
                      />
                    </div>
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 bg-yellow-400/90 backdrop-blur-xl px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <svg className="w-4 h-4 text-yellow-900" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-bold text-yellow-900 text-sm">{movie.rating}</span>
                    </div>
                    {/* Year Badge */}
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-xl px-3 py-1 rounded-full shadow-lg">
                      <span className="font-semibold text-white text-sm">{movie.year}</span>
                    </div>
                  </div>
                  
                  {/* Movie Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white drop-shadow-lg mb-2 line-clamp-1">
                      {movie.title}
                    </h3>
                    <p className="text-xs text-white/70 drop-shadow-md mb-2 font-semibold">
                      {movie.genre}
                    </p>
                    <p className="text-sm text-white/90 drop-shadow-md line-clamp-2">
                      {movie.description}
                    </p>
                    <button className="mt-3 w-full py-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl text-white font-semibold hover:bg-white/30 transition-all duration-200 text-sm shadow-lg">
                      Analyze Reviews
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Scroll Hint */}
            <div className="flex justify-center items-center gap-2 mt-2">
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-white/60 text-sm font-semibold drop-shadow-md flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Drag to scroll
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSpinner message={loadingMessage} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Display */}
        <AnimatePresence>
          {error && !isLoading && (
            <ErrorDisplay message={error} onRetry={handleRetry} />
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {!isLoading && !error && movieData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Movie Card */}
              <MovieCard 
                movie={movieData}
                isFavorite={favorites.includes(movieData.imdbID)}
                onToggleFavorite={() => toggleFavorite(movieData.imdbID)}
                onShowTrailer={() => setShowTrailer(true)}
              />

              {/* Sentiment Analysis */}
              {sentiment && <SentimentDisplay sentiment={sentiment} />}

              {/* Reviews List */}
              {reviews.length > 0 && <ReviewsList reviews={reviews} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Trailer Modal */}
      <AnimatePresence>
        {showTrailer && movieData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowTrailer(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-xl hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 border border-white/30"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Trailer Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-4">
                  {movieData.title} - Trailer
                </h3>
                {getTrailerId(movieData.imdbID) ? (
                  <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${getTrailerId(movieData.imdbID)}?autoplay=1`}
                      title={`${movieData.title} Trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl overflow-hidden flex items-center justify-center border border-white/20">
                    <div className="text-center p-8">
                      <svg className="w-20 h-20 text-white/70 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                      <p className="text-white drop-shadow-lg mb-4 font-semibold">
                        Trailer not available in our database
                      </p>
                      <a
                        href={getYouTubeSearchQuery(movieData.title, movieData.year)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all duration-200 shadow-lg"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        Search on YouTube
                      </a>
                    </div>
                  </div>
                )}
                <p className="mt-4 text-white/70 text-sm drop-shadow-md">
                  Official trailer for {movieData.title} ({movieData.year})
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-2xl border-t border-white/20 mt-16 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/90 font-medium drop-shadow-lg">
            Built with Next.js, TypeScript, Tailwind CSS, and Google Gemini AI
          </p>
          <p className="text-sm text-white/70 mt-2 drop-shadow-md">
            Movie data provided by OMDB API | Reviews from IMDb
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
}
