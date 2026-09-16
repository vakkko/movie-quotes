---
paths:
  - 'resources/js/components/ui/*.tsx'
---

# Ui

## Fix shadcn-generated `cn` import
When adding shadcn components via `npx shadcn add`, the generated files may import `cn` from `"cn"` (the new default), but this project has no `cn` alias. Always rewrite it to `import { cn } from "@/lib/utils"` to match existing components and pass tsc.
