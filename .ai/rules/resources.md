---
paths:
  - 'resources/**'
---

# Resources

## shadcn/ui is configured manually (Tailwind v4, CSS-first)
shadcn/ui was set up manually (not via npx CLI which times out). Tailwind v4: theme tokens live in resources/css/app.css. --color-* utilities map via @theme inline to :root CSS vars (--background, --popover, --muted, etc.). Components in resources/js/components/ui/, cn() helper in resources/js/lib/utils.ts, alias @/* -> resources/js/* (Vite 8 auto-resolves tsconfig paths). Add new shadcn components by copying the component file into components/ui/ and installing its Radix/lucide deps.
