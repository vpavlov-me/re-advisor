/**
 * Badge Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/ui/badge';

describe('Badge Component', () => {
  it('should render with default variant', () => {
    render(<Badge>Default</Badge>);
    
    const badge = screen.getByText('Default');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('should render with secondary variant', () => {
    render(<Badge variant="secondary">Secondary</Badge>);
    
    const badge = screen.getByText('Secondary');
    expect(badge).toHaveClass('bg-secondary', 'text-secondary-foreground');
  });

  it('should render with destructive variant', () => {
    render(<Badge variant="destructive">Destructive</Badge>);
    
    const badge = screen.getByText('Destructive');
    expect(badge).toHaveClass('bg-destructive', 'text-destructive-foreground');
  });

  it('should render with outline variant', () => {
    render(<Badge variant="outline">Outline</Badge>);
    
    const badge = screen.getByText('Outline');
    expect(badge).toHaveClass('text-foreground');
  });

  it('should render with success variant', () => {
    render(<Badge variant="success">Success</Badge>);
    
    const badge = screen.getByText('Success');
    expect(badge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('should render with warning variant', () => {
    render(<Badge variant="warning">Warning</Badge>);
    
    const badge = screen.getByText('Warning');
    expect(badge).toHaveClass('bg-yellow-100', 'text-yellow-800');
  });

  it('should have rounded-full styling', () => {
    render(<Badge data-testid="badge">Test</Badge>);
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('rounded-full');
  });

  it('should have proper padding', () => {
    render(<Badge data-testid="badge">Test</Badge>);
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('px-2.5', 'py-0.5');
  });

  it('should accept custom className', () => {
    render(<Badge className="custom-class">Custom</Badge>);
    
    const badge = screen.getByText('Custom');
    expect(badge).toHaveClass('custom-class');
  });

  it('should spread additional props', () => {
    render(<Badge data-testid="test-badge" aria-label="status badge">Props</Badge>);
    
    const badge = screen.getByTestId('test-badge');
    expect(badge).toHaveAttribute('aria-label', 'status badge');
  });

  it('should render inline-flex', () => {
    render(<Badge data-testid="badge">Inline</Badge>);
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('inline-flex', 'items-center');
  });

  it('should have text-xs font size', () => {
    render(<Badge data-testid="badge">Small Text</Badge>);
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveClass('text-xs', 'font-semibold');
  });
});
