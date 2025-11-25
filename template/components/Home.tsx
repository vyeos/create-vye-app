"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: "1. Environment Setup",
      description: "Copy the example env file and add your DB URL.",
      command: "cp .env.example .env",
      tag: "Setup",
    },
    {
      title: "2. Generate Auth Tables",
      description: "Create the necessary tables for Better Auth.",
      command: "npx @better-auth/cli generate",
      tag: "Auth",
    },
    {
      title: "3. Generate Secret",
      description: "Create a secure secret for your auth configuration.",
      command: "openssl rand -base64 32",
      tag: "Security",
    },
    {
      title: "4. Sync Database",
      description: "Push your schema to the database.",
      command: "pnpm db:push",
      tag: "Drizzle",
    },
  ];

  const resources = [
    {
      category: "Theming",
      items: [
        {
          name: "TweakCN",
          url: "https://tweak.vercel.app",
          desc: "Generate shadcn themes",
        },
        {
          name: "Tint",
          url: "https://tint.ui.shadcn.com",
          desc: "Tailwind palette generator",
        },
        {
          name: "Realtime Colors",
          url: "https://www.realtimecolors.com",
          desc: "Visualize palettes",
        },
      ],
    },
    {
      category: "UI Libraries",
      items: [
        {
          name: "Magic UI",
          url: "https://magicui.design",
          desc: "Animated components",
        },
        {
          name: "Aceternity UI",
          url: "https://ui.aceternity.com",
          desc: "Modern visual effects",
        },
        {
          name: "Number Flow",
          url: "https://number-flow.barvian.me",
          desc: "Animated numbers",
        },
      ],
    },
    {
      category: "Blocks & Layouts",
      items: [
        {
          name: "Shadcn Blocks",
          url: "https://blocks.shadcn.com",
          desc: "Official layout blocks",
        },
        {
          name: "TailArk",
          url: "https://tailark.com",
          desc: "Landing page sections",
        },
        {
          name: "Mamba UI",
          url: "https://mambaui.com",
          desc: "Modular Tailwind blocks",
        },
      ],
    },
    {
      category: "Icons",
      items: [
        {
          name: "Lucide",
          url: "https://lucide.dev",
          desc: "Standard icon set",
        },
        {
          name: "Phosphor",
          url: "https://phosphoricons.com",
          desc: "Alternative icon style",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8 font-sans pb-20">
      <main className="mx-auto max-w-5xl space-y-10">
        {/* Header Section */}
        <div className="space-y-4 text-center">
          <Badge variant="outline" className="mb-2">
            v1.0.0
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to Your Vye App
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your full-stack starter is ready. Follow the steps below to activate
            your database, then explore the ecosystem tools to build your UI.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button
              variant="default"
              onClick={() => window.open("https://orm.drizzle.team", "_blank")}
            >
              Read Drizzle Docs
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open("https://www.better-auth.com", "_blank")
              }
            >
              Better Auth Docs
            </Button>
          </div>
        </div>

        {/* Setup Steps Grid */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            🚀 Getting Started
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-muted-foreground/20"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{step.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {step.tag}
                    </Badge>
                  </div>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative rounded-md bg-muted p-3 font-mono text-sm">
                    <code className="break-all">{step.command}</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute right-1 top-1 h-7 w-7 p-0 hover:bg-background"
                      onClick={() => copyToClipboard(step.command, index)}
                    >
                      {copiedIndex === index ? (
                        <CheckIcon className="h-3 w-3 text-green-500" />
                      ) : (
                        <CopyIcon className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Project Structure Info */}
        <section>
          <Card className="bg-muted/30 border-dashed">
            <CardHeader>
              <CardTitle>📂 Where to start editing?</CardTitle>
              <CardDescription>
                The page you are looking at is located at{" "}
                <code className="text-primary font-bold">app/page.tsx</code>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <h3 className="font-semibold text-sm">Database</h3>
                <p className="text-sm text-muted-foreground">
                  Define schema in{" "}
                  <code className="text-foreground bg-background px-1 py-0.5 rounded">
                    db/schema.ts
                  </code>
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm">Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Config in{" "}
                  <code className="text-foreground bg-background px-1 py-0.5 rounded">
                    lib/auth.ts
                  </code>
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-sm">Components</h3>
                <p className="text-sm text-muted-foreground">
                  Add UI to{" "}
                  <code className="text-foreground bg-background px-1 py-0.5 rounded">
                    components/ui/
                  </code>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Recommendations Grid */}
        <section className="space-y-4 pt-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            🛠 Recommended Resources
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {resources.map((category, i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-3">
                  {category.items.map((item, j) => (
                    <div key={j} className="flex flex-col space-y-1">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:underline flex items-center gap-1 text-primary"
                      >
                        {item.name}
                        <ExternalLinkIcon className="h-3 w-3 opacity-50" />
                      </a>
                      <span className="text-xs text-muted-foreground">
                        {item.desc}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// Icons
function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}
