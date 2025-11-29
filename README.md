# Advisor Portal

A modern web application for Family Advisors to manage their profile, services, consultations, and family clients. Built with Next.js, Supabase, and Tailwind CSS.

## 🚀 Features

- **Dashboard**: Overview of upcoming consultations, recent messages, and key metrics.
- **Profile Management**: Comprehensive profile setup including credentials, expertise, and KYC verification.
- **Service Management**: Define and price services offered to families.
- **Consultations**: Schedule and manage meetings with family clients.
- **Family Management**: View and interact with client families.
- **Messaging**: Secure communication with clients.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)
- **Backend/Database**: [Supabase](https://supabase.com/)
- **Hosting**: GitHub Pages (static export)

## ⚠️ Important: GitHub Pages Deployment

This project is deployed to **GitHub Pages** as a static site. All development decisions must account for this:

### Constraints
- **No Server-Side Rendering (SSR)**: Only static export (`output: 'export'` in next.config.js)
- **No API Routes**: Next.js API routes don't work on GitHub Pages - use Supabase directly
- **No Middleware at Runtime**: Middleware runs at build time only for static routes
- **Base Path**: Assets must use proper base path for GitHub Pages subdirectory hosting
- **Client-Side Auth**: All authentication must be handled client-side via Supabase

### Best Practices
- Use `assetPath()` helper for all static assets
- Handle auth state changes in `AuthProvider` (client-side)
- Use Supabase client directly for all data fetching
- Test with `npm run build && npm run start` before deploying

## 🏁 Getting Started

See [GETTING_STARTED.md](docs/GETTING_STARTED.md) for detailed setup instructions.

## 📂 Project Structure

See [PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for an overview of the codebase organization.

## 📜 Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm start`: Start the production server.
- `npm run lint`: Run ESLint.
