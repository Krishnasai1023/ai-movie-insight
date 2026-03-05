/**
 * Sentiment Analysis Display Component
 * Shows AI-generated sentiment analysis with visual charts
 */

'use client';

import { motion } from 'framer-motion';
import { SentimentAnalysis } from '@/types';

interface SentimentDisplayProps {
  sentiment: SentimentAnalysis;
}

export default function SentimentDisplay({ sentiment }: SentimentDisplayProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return 'text-green-300 drop-shadow-lg';
      case 'Negative':
        return 'text-red-300 drop-shadow-lg';
      case 'Mixed':
        return 'text-yellow-300 drop-shadow-lg';
      default:
        return 'text-white/70 drop-shadow-lg';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return (
          <svg className="w-12 h-12 text-green-300 drop-shadow-2xl" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z" clipRule="evenodd" />
          </svg>
        );
      case 'Negative':
        return (
          <svg className="w-12 h-12 text-red-300 drop-shadow-2xl" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z" clipRule="evenodd" />
          </svg>
        );
      case 'Mixed':
        return (
          <svg className="w-12 h-12 text-yellow-300 drop-shadow-2xl" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-5 6a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-8 mt-8"
    >
      <div className="flex items-center mb-6">
        <div className="mr-4">{getSentimentIcon(sentiment.overallSentiment)}</div>
        <div>
          <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
            AI Sentiment Analysis
          </h2>
          <p className={`text-2xl font-semibold ${getSentimentColor(sentiment.overallSentiment)}`}>
            Overall: {sentiment.overallSentiment}
          </p>
        </div>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <h3 className="text-lg font-semibold text-white drop-shadow-lg mb-2">
          Summary
        </h3>
        <p className="text-white/90 drop-shadow-md leading-relaxed">
          {sentiment.summary}
        </p>
      </motion.div>

      {/* Sentiment Breakdown */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <h3 className="text-lg font-semibold text-white drop-shadow-lg mb-4">
          Sentiment Breakdown
        </h3>
        <div className="space-y-3">
          {/* Positive */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-green-300 drop-shadow-lg">
                Positive
              </span>
              <span className="text-sm font-medium text-green-300 drop-shadow-lg">
                {sentiment.positivePercentage}%
              </span>
            </div>
            <div className="w-full bg-white/20 backdrop-blur-xl rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${sentiment.positivePercentage}%` }}
                transition={{ duration: 1, delay: 0.6 }}
                className="bg-green-400 h-3 rounded-full shadow-lg"
              />
            </div>
          </div>

          {/* Neutral */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-yellow-300 drop-shadow-lg">
                Neutral
              </span>
              <span className="text-sm font-medium text-yellow-300 drop-shadow-lg">
                {sentiment.neutralPercentage}%
              </span>
            </div>
            <div className="w-full bg-white/20 backdrop-blur-xl rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${sentiment.neutralPercentage}%` }}
                transition={{ duration: 1, delay: 0.7 }}
                className="bg-yellow-400 h-3 rounded-full shadow-lg"
              />
            </div>
          </div>

          {/* Negative */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-red-300 drop-shadow-lg">
                Negative
              </span>
              <span className="text-sm font-medium text-red-300 drop-shadow-lg">
                {sentiment.negativePercentage}%
              </span>
            </div>
            <div className="w-full bg-white/20 backdrop-blur-xl rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${sentiment.negativePercentage}%` }}
                transition={{ duration: 1, delay: 0.8 }}
                className="bg-red-400 h-3 rounded-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Themes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mb-6"
      >
        <h3 className="text-lg font-semibold text-white drop-shadow-lg mb-3">
          Key Themes
        </h3>
        <div className="flex flex-wrap gap-2">
          {sentiment.keyThemes.map((theme, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="px-4 py-2 bg-white/20 backdrop-blur-xl border border-white/30 text-white font-semibold rounded-full text-sm shadow-lg drop-shadow-md"
            >
              {theme}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Pros */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <h3 className="text-lg font-semibold text-green-300 drop-shadow-lg mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Pros
          </h3>
          <ul className="space-y-2">
            {sentiment.pros.map((pro, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="flex items-start text-white/90 drop-shadow-md"
              >
                <span className="text-green-500 mr-2">•</span>
                {pro}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Cons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
        >
          <h3 className="text-lg font-semibold text-red-300 drop-shadow-lg mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            Cons
          </h3>
          <ul className="space-y-2">
            {sentiment.cons.map((con, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="flex items-start text-white/90 drop-shadow-md"
              >
                <span className="text-red-500 mr-2">•</span>
                {con}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
