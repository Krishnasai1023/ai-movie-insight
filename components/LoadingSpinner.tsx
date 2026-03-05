/**
 * Loading Spinner Component
 * Displays an animated loading spinner with message
 */

'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  message?: string;
}

export default function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full shadow-2xl"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.p
        className="mt-4 text-white font-semibold drop-shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>
    </div>
  );
}
