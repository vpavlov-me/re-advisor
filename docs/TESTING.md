# Testing Guide

## Overview

This project uses **Jest** for unit and integration testing, with **Testing Library** for component tests. The CI/CD pipeline ensures all tests must pass before deployment.

## Test Structure

```
__tests__/
├── mocks/
│   └── supabase.ts         # Supabase client mock
├── fixtures/
│   └── index.ts            # Test data fixtures
├── components/
│   ├── button.test.tsx     # Button component tests
│   └── input.test.tsx      # Input component tests
└── lib/
    ├── utils.test.ts                # Utility functions tests
    ├── validations.test.ts          # Zod validation schemas tests
    ├── stripe.test.ts               # Stripe configuration tests
    ├── families-helpers.test.ts     # Families helper functions
    ├── messages-helpers.test.ts     # Messages helper functions
    ├── consultations-helpers.test.ts # Consultations helpers
    ├── notifications-helpers.test.ts # Notifications helpers
    ├── profile-helpers.test.ts      # Profile helpers
    └── invitations-helpers.test.ts  # Invitations helpers
```

## Running Tests

### All Tests
```bash
npm run test
```

### Watch Mode (for development)
```bash
npm run test -- --watch
```

### With Coverage
```bash
npm run test:ci
```

### Single File
```bash
npm run test -- __tests__/lib/utils.test.ts
```

## Test Categories

### 1. Component Tests
Test UI components render correctly and handle user interactions:
- Button variants and sizes
- Form inputs with validation
- Click handlers and disabled states

### 2. Validation Tests
Test Zod schemas for form validation:
- Email formats
- Password requirements
- Required fields
- Custom validation rules

### 3. Helper Function Tests
Test pure utility functions:
- Date formatting
- Color helpers (status colors)
- Text processing (initials, etc.)
- Configuration constants

### 4. Stripe Tests
Test Stripe configuration:
- Plan configurations
- Price structures
- Feature limits

## Writing New Tests

### Component Test Example
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MyComponent } from '@/components/ui/my-component';

describe('MyComponent', () => {
  it('should render with default props', () => {
    render(<MyComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle click', async () => {
    const onClick = jest.fn();
    render(<MyComponent onClick={onClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

### Helper Function Test Example
```ts
import { myHelper } from '@/lib/my-module';

describe('myHelper', () => {
  it('should return expected value', () => {
    const result = myHelper('input');
    expect(result).toBe('expected');
  });
});
```

## CI/CD Integration

### GitHub Actions Workflow

The project includes two workflows:

1. **ci-cd.yml** - Main pipeline (on push to main/develop)
   - Lint → Test → Build → Deploy
   - Deployment only occurs on main branch after all tests pass

2. **pr-check.yml** - PR validation
   - Runs lint, tests, and build check on pull requests
   - Blocks merging if any check fails

### Required Environment Variables for CI

Set these in GitHub repository secrets:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY`
- `VERCEL_TOKEN` (for deployment)
- `VERCEL_ORG_ID` (for deployment)
- `VERCEL_PROJECT_ID` (for deployment)

## Best Practices

1. **Test Pure Functions First** - Helper functions and utilities are easiest to test
2. **Mock External Dependencies** - Use mocks for Supabase, Stripe, etc.
3. **Use Fixtures** - Share test data across tests via fixtures
4. **Descriptive Names** - Use clear test names that describe the behavior
5. **Arrange-Act-Assert** - Structure tests clearly
6. **Test Edge Cases** - Include tests for null, undefined, empty strings, etc.

## Coverage Goals

- Minimum 70% overall coverage
- 90%+ for utility functions
- 80%+ for critical business logic
- Focus on testing behavior, not implementation

## Troubleshooting

### Common Issues

1. **Module not found errors**
   - Check that paths use `@/` alias correctly
   - Ensure jest.config.ts has proper moduleNameMapper

2. **Mock not working**
   - Mocks must be set up before module imports
   - Use `jest.clearAllMocks()` in `beforeEach`

3. **Async test failures**
   - Use `async/await` properly
   - Check mock resolved values

4. **Component test errors**
   - Ensure DOM environment is configured
   - Check for missing providers (if using context)
