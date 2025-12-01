/**
 * Input Component Tests
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/input';

describe('Input Component', () => {
  it('should render with default props', () => {
    render(<Input placeholder="Enter text" />);
    
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    // Default type is text, but attribute may not be explicitly set
    expect(input.getAttribute('type') || 'text').toBe('text');
  });

  it('should render with different input types', () => {
    const { rerender } = render(<Input type="text" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');

    rerender(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" data-testid="password" />);
    expect(screen.getByTestId('password')).toHaveAttribute('type', 'password');

    rerender(<Input type="number" data-testid="number" />);
    expect(screen.getByTestId('number')).toHaveAttribute('type', 'number');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled" />);
    
    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeDisabled();
    expect(input).toHaveClass('disabled:opacity-50');
  });

  it('should handle value changes', async () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="Type here" />);
    
    const input = screen.getByPlaceholderText('Type here');
    await userEvent.type(input, 'Hello');
    
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('Hello');
  });

  it('should accept custom className', () => {
    render(<Input className="custom-class" placeholder="Custom" />);
    
    expect(screen.getByPlaceholderText('Custom')).toHaveClass('custom-class');
  });

  it('should forward ref correctly', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} placeholder="Ref test" />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.tagName).toBe('INPUT');
  });

  it('should spread additional props', () => {
    render(
      <Input 
        data-testid="test-input" 
        aria-label="Test input"
        maxLength={100}
        placeholder="Test"
      />
    );
    
    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('aria-label', 'Test input');
    expect(input).toHaveAttribute('maxLength', '100');
  });

  it('should handle focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    
    render(
      <Input 
        onFocus={handleFocus} 
        onBlur={handleBlur} 
        placeholder="Focus test"
      />
    );
    
    const input = screen.getByPlaceholderText('Focus test');
    
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should support controlled input', async () => {
    const ControlledInput = () => {
      const [value, setValue] = React.useState('');
      return (
        <Input 
          value={value} 
          onChange={(e) => setValue(e.target.value)}
          placeholder="Controlled"
        />
      );
    };
    
    render(<ControlledInput />);
    const input = screen.getByPlaceholderText('Controlled');
    
    await userEvent.type(input, 'Test value');
    expect(input).toHaveValue('Test value');
  });

  it('should apply correct styling classes', () => {
    render(<Input placeholder="Styled" />);
    
    const input = screen.getByPlaceholderText('Styled');
    expect(input).toHaveClass('flex');
    expect(input).toHaveClass('h-10');
    expect(input).toHaveClass('w-full');
    expect(input).toHaveClass('rounded-[10px]');
    expect(input).toHaveClass('border');
  });
});
