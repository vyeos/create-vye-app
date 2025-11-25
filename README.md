# create-vye-app

> A CLI tool to quickly scaffold production-ready Next.js applications with best practices baked in.

## Features

- ⚡️ **Next.js** - Latest version with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🧩 **shadcn/ui** - Beautiful, accessible component library
- 🔧 **Biome** - Fast formatter and linter
- 📦 **pnpm** - Fast, disk space efficient package manager
- 🎯 **TypeScript** - Type safety out of the box
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

Then navigate to your project and start developing:

```bash
cd my-app
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
- **Git** repository initialized

### Project Structure

```
my-app/
├── app/
│   ├── globals.css       # Global styles with Tailwind
│   ├── layout.tsx        # Root layout with Geist fonts
│   └── page.tsx          # Home page
├── components/
│   └── ui/               # shadcn/ui components
├── lib/
│   └── utils.ts          # Utility functions
├── biome.json            # Biome configuration
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
├── postcss.config.mjs    # PostCSS configuration
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript configuration
```

## Available Scripts

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run Biome checks
pnpm format   # Format code with Biome
```

## Adding More Components

The project comes with shadcn/ui pre-configured. Add more components easily:

```bash
pnpm dlx shadcn@latest add dialog
pnpm dlx shadcn@latest add dropdown-menu
pnpm dlx shadcn@latest add table
```

Browse all available components at [ui.shadcn.com](https://ui.shadcn.com)

## Why Vye?

This CLI embodies the Vyeos philosophy: **fast, focused, and friction-free development**. We've made opinionated choices to eliminate decision fatigue:

- **pnpm** for speed and efficiency
- **Biome** over ESLint/Prettier for blazing-fast tooling
- **shadcn/ui** for beautiful, customizable components
- **Tailwind v4** for modern styling capabilities

## Customization

The generated project is yours to modify. Common customizations:

### Change Theme

Edit `app/globals.css` to customize colors and design tokens.

## Requirements

- **Node.js** 18.17 or later
- **pnpm** (will be used automatically if available)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Author

**Vyeos** - Building tools for modern web development

---

**Happy coding!** 🚀

If you enjoy this tool, give it a ⭐️ on [GitHub](https://github.com/vyeos/create-vye-app)!
