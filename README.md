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
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (based on [Radix UI](https://www.radix-ui.com/))
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend/Database**: [Supabase](https://supabase.com/)
- **Hosting**: [Vercel](https://vercel.com/)

## 🏁 Getting Started

See [GETTING_STARTED.md](docs/GETTING_STARTED.md) for detailed setup instructions.

## 📂 Project Structure

See [PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for an overview of the codebase organization.

## 🤖 AI Development Guidelines

If you're using AI coding assistants (like Cursor, GitHub Copilot, or other LLMs) to contribute to this project, please review:

- **[AI_DEVELOPMENT_RULES.md](docs/AI_DEVELOPMENT_RULES.md)** - Comprehensive guidelines for AI assistants
- **[.cursorrules](.cursorrules)** - Quick reference rules

**Key Rules**:
1. ✅ **Always use shadcn/ui components** for UI development (from `@/components/ui/`)
2. ✅ **Always use service abstraction layers** for backend operations (in `src/lib/services/`)
3. ❌ **Never** create custom UI components from scratch or use other UI libraries
4. ❌ **Never** call Supabase directly from components - always go through service layers

## 📜 Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm start`: Start the production server.
- `npm run lint`: Run ESLint.
