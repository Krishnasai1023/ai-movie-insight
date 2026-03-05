/**
 * Movie Card Component
 * Displays movie metadata in an attractive card layout
 */

'use client';

import { motion } from 'framer-motion';
import { MovieMetadata } from '@/types';
import Image from 'next/image';

interface MovieCardProps {
  movie: MovieMetadata;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onShowTrailer?: () => void;
}

export default function MovieCard({ movie, isFavorite = false, onToggleFavorite, onShowTrailer }: MovieCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden"
    >
      <div className="md:flex">
        {/* Poster Section */}
        <div className="md:w-1/3 bg-black/20 backdrop-blur-xl flex items-center justify-center p-4">
          {movie.poster && movie.poster !== 'N/A' ? (
            <div className="relative w-full h-96 md:h-full">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          ) : (
            <div className="w-full h-96 flex items-center justify-center bg-white/10 backdrop-blur-xl rounded-lg border border-white/20">
              <svg
                className="w-24 h-24 text-white/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="md:w-2/3 p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-xl">
              {movie.title}
            </h2>
            
            {/* Action Buttons */}
            <div className="flex gap-3 mb-4">
              {onToggleFavorite && (
                <button
                  onClick={onToggleFavorite}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl hover:bg-white/30 transition-all duration-200 shadow-lg group"
                >
                  <span className="text-xl group-hover:scale-125 transition-transform">
                    {isFavorite ? '⭐' : '☆'}
                  </span>
                  <span className="text-white font-semibold text-sm">
                    {isFavorite ? 'In Watchlist' : 'Add to Watchlist'}
                  </span>
                </button>
              )}
              {onShowTrailer && (
                <button
                  onClick={onShowTrailer}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/80 backdrop-blur-xl border border-red-400/50 rounded-2xl hover:bg-red-600/80 transition-all duration-200 shadow-lg"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  <span className="text-white font-semibold text-sm">
                    Watch Trailer
                  </span>
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-xl text-white border border-white/30 rounded-full text-sm font-semibold shadow-lg">
                {movie.year}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-xl text-white border border-white/30 rounded-full text-sm font-semibold shadow-lg">
                {movie.rated}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-xl text-white border border-white/30 rounded-full text-sm font-semibold shadow-lg">
                {movie.runtime}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <svg
                className="w-6 h-6 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-2 text-2xl font-bold text-white drop-shadow-lg">
                {movie.imdbRating}
              </span>
              <span className="ml-2 text-white/80 drop-shadow-md">
                ({movie.imdbVotes} votes)
              </span>
            </div>

            {/* Genre */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-white/70 uppercase mb-1 drop-shadow-md">
                Genre
              </h3>
              <p className="text-white font-medium drop-shadow-lg">{movie.genre}</p>
            </div>

            {/* Plot */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-white/70 uppercase mb-1 drop-shadow-md">
                Plot
              </h3>
              <p className="text-white/90 leading-relaxed drop-shadow-md">
                {movie.plot}
              </p>
            </div>

            {/* Cast */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-white/70 uppercase mb-1 drop-shadow-md">
                Cast
              </h3>
              <p className="text-white font-medium drop-shadow-lg">{movie.actors}</p>
            </div>

            {/* Director */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-white/70 uppercase mb-1 drop-shadow-md">
                Director
              </h3>
              <p className="text-white font-medium drop-shadow-lg">{movie.director}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
