/**
 * Reviews List Component
 * Displays user reviews with ratings
 */

'use client';

import { motion } from 'framer-motion';
import { Review } from '@/types';
import { useState } from 'react';

interface ReviewsListProps {
  reviews: Review[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());

  const toggleReview = (index: number) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedReviews(newExpanded);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-8"
    >
      <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-6">
        Audience Reviews ({reviews.length})
      </h2>
      
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.05 }}
            className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-6 hover:bg-white/15 transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl border border-white/40 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  {review.author.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-white drop-shadow-lg">
                    {review.author}
                  </h3>
                  {review.date && (
                    <p className="text-sm text-white/70 drop-shadow-md">
                      {review.date}
                    </p>
                  )}
                </div>
              </div>
              
              {review.rating && (
                <div className="flex items-center bg-yellow-400/20 backdrop-blur-xl border border-yellow-300/30 px-3 py-1 rounded-full shadow-lg">
                  <svg
                    className="w-5 h-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 font-semibold text-white drop-shadow-lg">
                    {review.rating}/10
                  </span>
                </div>
              )}
            </div>

            <p className="text-white/90 drop-shadow-md leading-relaxed mb-3">
              {expandedReviews.has(index)
                ? review.content
                : truncateText(review.content, 250)}
            </p>

            {review.content.length > 250 && (
              <button
                onClick={() => toggleReview(index)}
                className="text-blue-300 hover:text-blue-200 font-semibold text-sm transition-colors duration-200 drop-shadow-lg"
              >
                {expandedReviews.has(index) ? 'Show Less' : 'Read More'}
              </button>
            )}

            {review.helpful !== undefined && review.helpful > 0 && (
              <div className="mt-3 text-sm text-white/70 drop-shadow-md">
                {review.helpful} people found this helpful
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
