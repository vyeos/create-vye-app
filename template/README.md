[-] drizzle
[-] better auth
[] tanstack query
[] tanstack form
# Welcome to Your Vye App! 🚀

This project was bootstrapped with [create-vye-app](https://github.com/vyeos/create-vye-app).

## Getting Started

### 1. Set Up Your Database

First, set up your environment variables:

```bash
# Copy the example env file
cp .env.example .env
```

Edit `.env` and add your PostgreSQL database URL:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

### 2. Generate Authentication Tables

Better Auth requires specific database tables. Generate them with:

```bash
npx @better-auth/cli generate
```

This will create the necessary authentication schema in your database.

### 3. Generate a Secret Key

Generate a secure random secret for Better Auth:

```bash
openssl rand -base64 32
```

Add it to your `.env` file:

```bash
BETTER_AUTH_SECRET=your-generated-secret-here
```

### 4. Set Up the Database Schema

Generate and push your database schema:

```bash
pnpm db:generate   # Generate migrations from schema
pnpm db:push       # Push schema to database
```

### 5. Start Development

Now you're ready to start developing:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your app.

Start editing `app/page.tsx` to build your application. The page auto-updates as you edit.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── auth/[...all]/    # Better Auth API routes
│   ├── globals.css            # Global styles and Tailwind configuration
│   ├── layout.tsx             # Root layout (fonts, metadata, providers)
│   └── page.tsx               # Home page (start editing here!)
├── components/
│   └── ui/                    # shadcn/ui components (pre-installed)
├── db/
│   ├── index.ts               # Drizzle database client
│   └── schema.ts              # Database schema definitions
├── lib/
│   ├── auth.ts                # Better Auth server configuration
│   ├── auth-client.ts         # Better Auth client hooks
│   └── utils.ts               # Utility functions (cn helper)
├── middleware.ts              # Optional auth middleware
└── public/                    # Static assets
```

## What's Included

### Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with Server Components
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible components
- **[Biome](https://biomejs.dev/)** - Fast linter and formatter
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe database toolkit
- **[Better Auth](https://www.better-auth.com/)** - Modern authentication solution

### Pre-installed Components

The following shadcn/ui components are ready to use:

- `Button` - Versatile button component
- `Card` - Container for content
- `Input` - Form input field
- `Badge` - Status indicators and labels

Import them from `@/components/ui`:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Page() {
  return (
    <Card>
      <CardHeader>Hello</CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## Available Scripts

### Development

```bash
pnpm dev          # Start development server (localhost:3000)
pnpm build        # Create production build
pnpm start        # Run production build
```

### Code Quality

```bash
pnpm lint         # Check code with Biome
pnpm format       # Format code with Biome
```

### Database

```bash
pnpm db:generate  # Generate migrations from schema changes
pnpm db:push      # Push schema to database (for dev)
pnpm db:migrate   # Run migrations (for production)
pnpm db:studio    # Open Drizzle Studio GUI
```

## Authentication Guide

### Basic Setup

Better Auth is pre-configured with a basic setup. The authentication tables are created by running:

```bash
npx @better-auth/cli generate
```

### Enable Google OAuth (Optional)

1. Get credentials from [Google Cloud Console](https://console.cloud.google.com/)
2. Add to `.env`:
   ```bash
   GOOGLE_CLIENT_ID=your-client-id
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```
3. Uncomment the `socialProviders` section in `lib/auth.ts`

### Using Authentication in Components

```tsx
'use client'
import { useSession, signIn, signOut } from '@/lib/auth-client'

export default function AuthButton() {
  const { data: session, isPending } = useSession()
  
  if (isPending) return <div>Loading...</div>
  
  if (!session) {
    return (
      <Button onClick={() => signIn.social({ provider: 'google' })}>
        Sign In with Google
      </Button>
    )
  }
  
  return (
    <div>
      <p>Welcome, {session.user.name}!</p>
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  )
}
```

### Enable Email/Password Auth (Optional)

Uncomment the `emailAndPassword` section in `lib/auth.ts`:

```typescript
emailAndPassword: {
  enabled: true,
  autoSignIn: true,
  requireEmailVerification: true,
}
```

### Protected Routes

The `middleware.ts` file shows how to protect routes. Uncomment and customize the matcher:

```typescript
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
}
```

## Database Guide

### Define Your Schema

Edit `db/schema.ts` to define your tables:

```typescript
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core"

export const posts = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
```

### Generate and Apply Changes

After modifying your schema:

```bash
pnpm db:generate   # Creates migration files
pnpm db:push       # Applies changes to database
```

### Query Your Database

```typescript
import { db } from "@/db"
import { posts } from "@/db/schema"
import { eq } from "drizzle-orm"

// Create
const newPost = await db.insert(posts).values({
  title: "My First Post",
  content: "Hello World!"
}).returning()

// Read
const allPosts = await db.select().from(posts)
const onePost = await db.select()
  .from(posts)
  .where(eq(posts.id, 1))

// Update
await db.update(posts)
  .set({ title: "Updated Title" })
  .where(eq(posts.id, 1))

// Delete
await db.delete(posts).where(eq(posts.id, 1))
```

### Use in Server Components

```tsx
import { db } from "@/db"
import { posts } from "@/db/schema"

export default async function PostsPage() {
  const allPosts = await db.select().from(posts)
  
  return (
    <div>
      {allPosts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  )
}
```

### Use in Server Actions

```tsx
'use server'
import { db } from "@/db"
import { posts } from "@/db/schema"
import { revalidatePath } from "next/cache"

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  
  await db.insert(posts).values({ title, content })
  revalidatePath('/posts')
}
```

## Adding More Features

### Install More Components

```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add table
pnpm dlx shadcn@latest add toast
```

Browse all components: [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)

### Add More OAuth Providers

Edit `lib/auth.ts` and add providers like GitHub, Discord, etc:

```typescript
socialProviders: {
  google: { /* ... */ },
  github: {
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  },
}
```

## Styling Guide

### Using Tailwind

This project uses Tailwind CSS v4 with the modern CSS-first approach:

```tsx
<div className="flex items-center gap-4 rounded-lg bg-primary p-4">
  <h1 className="text-2xl font-bold">Hello World</h1>
</div>
```

### Customizing Theme

Edit `app/globals.css` to customize colors and design tokens:

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    /* Add your custom colors */
  }
}
```

### Using cn() Utility

Merge Tailwind classes safely:

```tsx
import { cn } from "@/lib/utils"

<div className={cn(
  "base-styles",
  isActive && "active-styles",
  className
)} />
```

## Environment Variables

Required variables in `.env`:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Better Auth
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-32-char-random-string

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy!

**Important**: Set up a production PostgreSQL database:
- [Supabase](https://supabase.com/) - Free tier available
- [Neon](https://neon.tech/) - Serverless Postgres
- [Railway](https://railway.app/) - Simple deployment
- [Vercel Postgres](https://vercel.com/storage/postgres) - Integrated with Vercel

Update these environment variables for production:
```bash
BETTER_AUTH_URL=https://your-domain.com
NEXT_PUBLIC_BASE_URL=https://your-domain.com
DATABASE_URL=your-production-database-url
```

After deploying, run migrations:
```bash
pnpm db:push
```

### Other Platforms

- **[Netlify](https://www.netlify.com/)** - Simple Git-based deployments
- **[Railway](https://railway.app/)** - Deploy with databases included
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Edge deployment

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Learn More

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs/overview)
- [Better Auth Docs](https://www.better-auth.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Biome Guide](https://biomejs.dev/guides/getting-started/)

### Tutorials

- [Next.js Learn Course](https://nextjs.org/learn)
- [Drizzle ORM Tutorial](https://orm.drizzle.team/docs/get-started-postgresql)
- [Better Auth Quick Start](https://www.better-auth.com/docs/installation)

## Tips & Best Practices

1. **Keep components small** - Break down large components into smaller, reusable pieces
2. **Use Server Components** - Default to Server Components, only use 'use client' when needed
3. **Type your data** - Define TypeScript interfaces for your data structures
4. **Use transactions** - For multiple related database operations, use Drizzle transactions
5. **Secure your routes** - Use middleware or check auth in Server Components/Actions
6. **Validate user input** - Always validate and sanitize user input before database operations
7. **Follow conventions** - Keep the project structure organized as it grows

## Troubleshooting

### Database Connection Issues

If you're having trouble connecting to your database:

1. Verify your `DATABASE_URL` is correct
2. Check if your database server is running
3. Ensure your IP is whitelisted (for hosted databases)
4. Test connection: `pnpm tsx db/index.ts`

### Authentication Not Working

1. Verify `BETTER_AUTH_SECRET` is set and is at least 32 characters
2. Check that `BETTER_AUTH_URL` matches your app URL
3. Run `npx @better-auth/cli generate` to ensure tables exist
4. Check browser console for client-side errors

### Build Errors

1. Run `pnpm db:generate` to ensure migrations are up to date
2. Check that all environment variables are set
3. Clear `.next` folder: `rm -rf .next`
4. Reinstall dependencies: `rm -rf node_modules && pnpm install`

## Need Help?

- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Drizzle Discord](https://discord.gg/drizzle)
- [Better Auth Discord](https://discord.gg/better-auth)
- [shadcn/ui Discord](https://discord.com/invite/shadcn)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

---

Built with ❤️ using [create-vye-app](https://github.com/vyeos/create-vye-app)

**Happy coding!** 🎉
