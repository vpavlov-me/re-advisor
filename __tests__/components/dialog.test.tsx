/**
 * Dialog Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

describe('Dialog Component', () => {
  describe('Basic Rendering', () => {
    it('should render dialog trigger', () => {
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      
      expect(screen.getByText('Open Dialog')).toBeInTheDocument();
    });

    it('should not show content initially', () => {
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Hidden Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      
      expect(screen.queryByText('Hidden Title')).not.toBeInTheDocument();
    });

    it('should show content when open', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Visible Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      
      expect(screen.getByText('Visible Title')).toBeInTheDocument();
    });
  });

  describe('Dialog Interaction', () => {
    it('should open dialog on trigger click', async () => {
      render(
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog description text</DialogDescription>
          </DialogContent>
        </Dialog>
      );
      
      fireEvent.click(screen.getByText('Open'));
      
      expect(await screen.findByText('Dialog Title')).toBeInTheDocument();
      expect(screen.getByText('Dialog description text')).toBeInTheDocument();
    });
  });

  describe('DialogHeader', () => {
    it('should render with proper styling', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogHeader data-testid="header">
              <DialogTitle>Title</DialogTitle>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
      
      const header = screen.getByTestId('header');
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5');
    });
  });

  describe('DialogFooter', () => {
    it('should render with proper styling', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogFooter data-testid="footer">
              <button>Cancel</button>
              <button>Confirm</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
      
      const footer = screen.getByTestId('footer');
      expect(footer).toHaveClass('flex');
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });
  });

  describe('DialogTitle', () => {
    it('should render with proper styling', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle data-testid="title">My Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      
      const title = screen.getByTestId('title');
      expect(title).toHaveClass('text-lg', 'font-semibold');
      expect(title).toHaveTextContent('My Title');
    });
  });

  describe('DialogDescription', () => {
    it('should render with muted styling', () => {
      render(
        <Dialog open>
          <DialogContent>
            <DialogTitle>Title</DialogTitle>
            <DialogDescription data-testid="desc">Description text</DialogDescription>
          </DialogContent>
        </Dialog>
      );
      
      const desc = screen.getByTestId('desc');
      expect(desc).toHaveClass('text-sm', 'text-muted-foreground');
    });
  });

  describe('DialogContent', () => {
    it('should render with rounded corners', () => {
      render(
        <Dialog open>
          <DialogContent data-testid="content">
            <DialogTitle>Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('rounded-[10px]');
    });

    it('should support fullScreen prop', () => {
      render(
        <Dialog open>
          <DialogContent fullScreen data-testid="content">
            <DialogTitle>Full Screen Title</DialogTitle>
          </DialogContent>
        </Dialog>
      );
      
      const content = screen.getByTestId('content');
      expect(content).toHaveClass('inset-4');
    });
  });

  describe('Full Dialog Composition', () => {
    it('should render complete dialog structure', async () => {
      const handleConfirm = jest.fn();
      
      render(
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Action</DialogTitle>
              <DialogDescription>Are you sure you want to proceed?</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <button onClick={handleConfirm}>Confirm</button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
      
      // Open dialog
      fireEvent.click(screen.getByText('Open Dialog'));
      
      // Verify all parts are rendered
      expect(await screen.findByText('Confirm Action')).toBeInTheDocument();
      expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
      
      // Test confirm button
      fireEvent.click(screen.getByText('Confirm'));
      expect(handleConfirm).toHaveBeenCalled();
    });
  });
});
