# Getting Started

Follow these steps to set up the Advisor Portal locally.

## Prerequisites

- Node.js 18+ installed.
- npm or yarn or pnpm.
- A Supabase project.

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd advisor-portal
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file in the root directory and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   You can find these in your Supabase project settings under API.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Database Setup

Ensure your Supabase project has the necessary tables. The application expects tables such as:
- `Service`
- `Consultation` (implied)
- `Message` (implied)
- `Family` (implied)

(Note: Refer to the codebase or migration files for the exact schema).
