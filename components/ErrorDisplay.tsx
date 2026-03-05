/**
 * Error Display Component
 * Shows error messages with retry functionality
 */

'use client';

import { motion } from 'framer-motion';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorDisplay({ message, onRetry }: ErrorDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-500/20 backdrop-blur-2xl border border-red-400/30 rounded-3xl p-6 my-8 shadow-2xl"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-white drop-shadow-lg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-white drop-shadow-lg">
            Error
          </h3>
          <p className="mt-2 text-sm text-white/90 drop-shadow-md">
            {message}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 px-4 py-2 bg-white/30 backdrop-blur-xl hover:bg-white/40 text-white font-semibold rounded-2xl border border-white/40 transition-all duration-200 shadow-lg"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
