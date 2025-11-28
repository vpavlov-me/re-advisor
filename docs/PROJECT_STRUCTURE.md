# Project Structure

The project follows the standard Next.js App Router structure.

## Root Directory

- `src/`: Source code.
- `public/`: Static assets.
- `docs/`: Documentation.
- `package.json`: Dependencies and scripts.
- `tsconfig.json`: TypeScript configuration.
- `tailwind.config.ts`: Tailwind CSS configuration.

## Source Code (`src/`)

### `app/`
Contains the application routes and pages.
- `page.tsx`: The main dashboard page.
- `layout.tsx`: The root layout.
- `globals.css`: Global styles.
- `auth/`: Authentication pages.
- `consultations/`: Consultation management.
- `families/`: Family client management.
- `messages/`: Messaging interface.
- `profile/`: Advisor profile settings.
- `services/`: Service offering management.
- `settings/`: Account settings.
- `payments/`: Payment configuration.

### `components/`
Reusable UI components.
- `ui/`: Base UI components (buttons, cards, inputs, etc.), mostly based on shadcn/ui.
- `layout/`: Layout components (sidebar, header, etc.).
- `providers/`: Context providers.

### `lib/`
Utility functions and libraries.
- `supabaseClient.ts`: Supabase client initialization.
- `utils.ts`: Helper functions (e.g., class name merging).
