# create-vye-app

> A CLI tool to quickly scaffold production-ready Next.js applications with best practices baked in.

## Features

- ⚡️ **Next.js** - Latest version with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautiful, accessible component library
- 🔧 **Biome** - Fast formatter and linter
- 📦 **pnpm** - Fast, disk space efficient package manager
- 🎯 **TypeScript** - Type safety out of the box
- 🗄️ **Drizzle ORM** - Type-safe database toolkit
- 🔐 **Better Auth** - Modern authentication solution
- 🚀 **Ready to deploy** - Optimized for production

## Quick Start

```bash
# Using npx (recommended)
npx create-vye-app my-app

# Using pnpm
pnpm dlx create-vye-app my-app

# Using npm
npm create vye-app my-app
```

Then navigate to your project and set up your database:

```bash
cd my-app

# 1. Copy environment variables
cp .env.example .env

# 2. Add your PostgreSQL database URL to .env
# DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# 3. Generate Better Auth tables
npx @better-auth/cli generate

# 4. Generate and push Drizzle schema
pnpm db:generate
pnpm db:push

# 5. Start development server
pnpm dev
```

Your app will be running at [http://localhost:3000](http://localhost:3000)

## What's Included?

### Pre-configured Stack

- **Next.js 15+** with App Router and React Server Components
- **Tailwind CSS v4** with modern CSS-first configuration
- **TypeScript** with strict mode disabled for flexibility
- **shadcn/ui** components (Button, Card, Input, Badge) pre-installed
- **Biome** configured for code formatting and linting
- **Drizzle ORM** for type-safe database operations
- **Better Auth** for authentication (Google OAuth ready)
- **Git** repository initialized

### Project Structure

```
my-app/
├── app/
│   ├── api/
│   │   └── auth/[...all]/    # Better Auth API routes
│   ├── globals.css            # Global styles with Tailwind
│   ├── layout.tsx             # Root layout with Geist fonts
│   └── page.tsx               # Home page
├── components/
│   └── ui/                    # shadcn/ui components
├── db/
│   ├── index.ts               # Drizzle database instance
│   └── schema.ts              # Database schema
├── lib/
│   ├── auth.ts                # Better Auth server config
│   ├── auth-client.ts         # Better Auth client hooks
│   └── utils.ts               # Utility functions
├── .env.example               # Environment variables template
├── biome.json                 # Biome configuration
├── drizzle.config.ts          # Drizzle Kit configuration
├── middleware.ts              # Auth middleware (optional)
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies and scripts
└── tsconfig.json              # TypeScript configuration
```

## Available Scripts

```bash
# Development
pnpm dev           # Start development server
pnpm build         # Build for production
pnpm start         # Start production server

# Code Quality
pnpm lint          # Run Biome checks
pnpm format        # Format code with Biome

# Database
pnpm db:generate   # Generate Drizzle migrations
pnpm db:push       # Push schema to database
pnpm db:migrate    # Run migrations
pnpm db:studio     # Open Drizzle Studio
```

## Setting Up Authentication

### 1. Generate Better Auth Tables

```bash
npx @better-auth/cli generate
```

This creates the necessary authentication tables in your database schema.

### 2. Configure Environment Variables

Update your `.env` file:

```bash
# Required
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
BETTER_AUTH_SECRET=your-32-character-random-string
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional: For Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Generate a secret:
```bash
openssl rand -base64 32
```

### 3. Enable Authentication Features

Edit `lib/auth.ts` to uncomment and configure:
- Email/Password authentication
- Google OAuth
- Email verification
- Session settings

### 4. Use Authentication in Your App

```tsx
'use client'
import { useSession, signIn, signOut } from '@/lib/auth-client'

export default function Page() {
  const { data: session } = useSession()
  
  if (!session) {
    return <button onClick={() => signIn.social({ provider: 'google' })}>
      Sign In with Google
    </button>
  }
  
  return (
    <div>
      <p>Welcome, {session.user.name}!</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
```

## Database Operations

### Define Your Schema

Edit `db/schema.ts`:

```typescript
import { pgTable, text, integer } from "drizzle-orm/pg-core"

export const posts = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  content: text("content").notNull(),
})
```

### Query Your Database

```typescript
import { db } from "@/db"
import { posts } from "@/db/schema"

// Insert
await db.insert(posts).values({
  title: "Hello World",
  content: "My first post"
})

// Select
const allPosts = await db.select().from(posts)

// Update
await db.update(posts)
  .set({ title: "Updated Title" })
  .where(eq(posts.id, 1))
```

## Adding More Components

The project comes with shadcn/ui pre-configured. Add more components easily:

```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add table
pnpm dlx shadcn@latest add form
```

Browse all available components at [ui.shadcn.com](https://ui.shadcn.com)

## Why Vye?

This CLI embodies the Vyeos philosophy: **fast, focused, and friction-free development**. We've made opinionated choices to eliminate decision fatigue:

- **pnpm** for speed and efficiency
- **Biome** over ESLint/Prettier for blazing-fast tooling
- **shadcn/ui** for beautiful, customizable components
- **Tailwind v4** for modern styling capabilities
- **Drizzle ORM** for type-safe database operations
- **Better Auth** for secure, flexible authentication

## Customization

The generated project is yours to modify. Common customizations:

### Change Theme

Edit `app/globals.css` to customize colors and design tokens.

### Add More Auth Providers

Edit `lib/auth.ts` to add GitHub, Discord, or other OAuth providers.

### Customize Database Schema

Edit `db/schema.ts` and run `pnpm db:generate && pnpm db:push`.

## Requirements

- **Node.js** 18.17 or later
- **PostgreSQL** database (local or hosted)
- **pnpm** (recommended, will be used automatically)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

Don't forget to:
- Set up a production PostgreSQL database (Supabase, Neon, Railway)
- Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_BASE_URL` to your production URL
- Run migrations: `pnpm db:push`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Author

**Vyeos** - Building tools for modern web development

---

**Happy coding!** 🚀

If you enjoy this tool, give it a ⭐️ on [GitHub](https://github.com/vyeos/create-vye-app)!
