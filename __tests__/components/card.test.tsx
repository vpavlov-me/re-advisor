/**
 * Card Component Tests
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

describe('Card Component', () => {
  describe('Card', () => {
    it('should render with default styling', () => {
      render(<Card data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-card', 'shadow-sm');
    });

    it('should render with elevated variant', () => {
      render(<Card variant="elevated" data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('shadow-md');
    });

    it('should accept custom className', () => {
      render(<Card className="custom-class" data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-class');
    });

    it('should forward ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Card ref={ref}>Content</Card>);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardHeader', () => {
    it('should render with correct styling', () => {
      render(<CardHeader data-testid="header">Header</CardHeader>);
      
      const header = screen.getByTestId('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6');
    });

    it('should accept custom className', () => {
      render(<CardHeader className="custom-class" data-testid="header">Header</CardHeader>);
      
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('custom-class');
    });
  });

  describe('CardTitle', () => {
    it('should render as h3', () => {
      render(<CardTitle>Title</CardTitle>);
      
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Title');
    });

    it('should have correct styling', () => {
      render(<CardTitle data-testid="title">Title</CardTitle>);
      
      const title = screen.getByTestId('title');
      expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight');
    });
  });

  describe('CardDescription', () => {
    it('should render with muted styling', () => {
      render(<CardDescription data-testid="desc">Description</CardDescription>);
      
      const desc = screen.getByTestId('desc');
      expect(desc).toBeInTheDocument();
      expect(desc).toHaveClass('text-sm', 'text-muted-foreground');
    });
  });

  describe('CardContent', () => {
    it('should render with correct padding', () => {
      render(<CardContent data-testid="content">Content</CardContent>);
      
      const content = screen.getByTestId('content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('p-6', 'pt-0');
    });
  });

  describe('CardFooter', () => {
    it('should render with flex layout', () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>);
      
      const footer = screen.getByTestId('footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
    });
  });

  describe('Full Card Composition', () => {
    it('should render complete card structure', () => {
      render(
        <Card data-testid="full-card">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card content goes here</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      );
      
      expect(screen.getByTestId('full-card')).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Card Title' })).toBeInTheDocument();
      expect(screen.getByText('Card Description')).toBeInTheDocument();
      expect(screen.getByText('Card content goes here')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });
});
