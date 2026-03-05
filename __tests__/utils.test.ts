/**
 * Unit Tests for Utility Functions
 */

import { describe, it, expect } from '@jest/globals';

// Test IMDb ID validation
describe('IMDb ID Validation', () => {
  const validateImdbId = (id: string): boolean => {
    const imdbIdRegex = /^tt\d{7,8}$/;
    return imdbIdRegex.test(id);
  };

  it('should validate correct IMDb IDs', () => {
    expect(validateImdbId('tt0133093')).toBe(true);
    expect(validateImdbId('tt1234567')).toBe(true);
    expect(validateImdbId('tt12345678')).toBe(true);
  });

  it('should reject invalid IMDb IDs', () => {
    expect(validateImdbId('123456')).toBe(false);
    expect(validateImdbId('tt123')).toBe(false);
    expect(validateImdbId('invalid')).toBe(false);
    expect(validateImdbId('tt')).toBe(false);
    expect(validateImdbId('')).toBe(false);
  });
});

// Test sentiment determination
describe('Sentiment Determination', () => {
  const determineSentiment = (avgRating: number): 'Positive' | 'Mixed' | 'Negative' => {
    if (avgRating >= 7.5) return 'Positive';
    if (avgRating >= 5.5) return 'Mixed';
    return 'Negative';
  };

  it('should determine positive sentiment', () => {
    expect(determineSentiment(8.5)).toBe('Positive');
    expect(determineSentiment(10)).toBe('Positive');
    expect(determineSentiment(7.5)).toBe('Positive');
  });

  it('should determine mixed sentiment', () => {
    expect(determineSentiment(6.5)).toBe('Mixed');
    expect(determineSentiment(7.0)).toBe('Mixed');
    expect(determineSentiment(5.5)).toBe('Mixed');
  });

  it('should determine negative sentiment', () => {
    expect(determineSentiment(4.0)).toBe('Negative');
    expect(determineSentiment(5.4)).toBe('Negative');
    expect(determineSentiment(2.0)).toBe('Negative');
  });
});

// Test percentage calculation
describe('Percentage Calculation', () => {
  const calculatePercentage = (part: number, total: number): number => {
    if (total === 0) return 0;
    return Math.round((part / total) * 100);
  };

  it('should calculate correct percentages', () => {
    expect(calculatePercentage(50, 100)).toBe(50);
    expect(calculatePercentage(75, 100)).toBe(75);
    expect(calculatePercentage(1, 3)).toBe(33);
    expect(calculatePercentage(2, 3)).toBe(67);
  });

  it('should handle edge cases', () => {
    expect(calculatePercentage(0, 100)).toBe(0);
    expect(calculatePercentage(100, 100)).toBe(100);
    expect(calculatePercentage(5, 0)).toBe(0);
  });
});
