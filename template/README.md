# Welcome to Your Vye App! 🚀

This project was bootstrapped with [create-vye-app](https://github.com/vyeos/create-vye-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see your app.

Start editing `app/page.tsx` to build your application. The page auto-updates as you edit.

## Project Structure

```
├── app/
│   ├── globals.css       # Global styles and Tailwind configuration
│   ├── layout.tsx        # Root layout (fonts, metadata, providers)
│   └── page.tsx          # Home page (start editing here!)
├── components/
│   └── ui/               # shadcn/ui components (pre-installed)
├── lib/
│   └── utils.ts          # Utility functions (cn helper)
└── public/               # Static assets
```

## What's Included

### Tech Stack

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with Server Components
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible components
- **[Biome](https://biomejs.dev/)** - Fast linter and formatter

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

## Adding More Features

### Install More Components

```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add form
pnpm dlx shadcn@latest add table
```

Browse all components: [ui.shadcn.com/docs/components](https://ui.shadcn.com/docs/components)

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

## Learn More

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Biome Guide](https://biomejs.dev/guides/getting-started/)

### Tutorials

- [Next.js Learn Course](https://nextjs.org/learn)
- [Tailwind CSS Tutorial](https://tailwindcss.com/docs/utility-first)
- [shadcn/ui Examples](https://ui.shadcn.com/examples)

## Deployment

The easiest way to deploy your app is using [Vercel](https://vercel.com):

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

Other great options:

- **[Netlify](https://www.netlify.com/)** - Simple Git-based deployments
- **[Railway](https://railway.app/)** - Deploy with databases included
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - Edge deployment

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Tips & Best Practices

1. **Keep components small** - Break down large components into smaller, reusable pieces
2. **Use Server Components** - Default to Server Components, only use 'use client' when needed
3. **Optimize images** - Use `next/image` for automatic optimization
4. **Type your data** - Define TypeScript interfaces for your data structures
5. **Follow conventions** - Keep the project structure organized as it grows

## Need Help?

- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [shadcn/ui Discord](https://discord.com/invite/shadcn)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

---

Built with ❤️ using [create-vye-app](https://github.com/vyeos/create-vye-app)

**Happy coding!** 🎉
