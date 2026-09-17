---
paths:
  - 'resources/js/components/ui/*.tsx'
---

# Ui

## Fix shadcn-generated `cn` import
When adding shadcn components via `npx shadcn add`, the generated files may import `cn` from `"cn"` (the new default), but this project has no `cn` alias. Always rewrite it to `import { cn } from "@/lib/utils"` to match existing components and pass tsc.

## shadcn CLI adds `cn` package; uninstall after adding components
`npx shadcn@latest add` works now (no timeout). It installs the `cn` npm package (v0.3.0) into devDependencies — remove it with `npm uninstall cn --save-dev` after adding, since the project uses `@/lib/utils` and `"cn"` has no alias. Also rewrite the generated `import { cn } from "cn"` to `@/lib/utils`.
