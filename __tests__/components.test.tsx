/**
 * Component Tests for LoadingSpinner
 */

import { render, screen } from '@testing-library/react';
import LoadingSpinner from '@/components/LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders with default message', () => {
    render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with custom message', () => {
    render(<LoadingSpinner message="Fetching data..." />);
    expect(screen.getByText('Fetching data...')).toBeInTheDocument();
  });
});
