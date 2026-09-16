---
paths:
  - '*.yaml'
---

# General

## Keep workspace file as npm-workspace.yaml, not pnpm-workspace.yaml
The project uses npm (package-lock.json), but a leftover pnpm-workspace.yaml made the shadcn CLI detect pnpm and fail with "spawn pnpm ENOENT". Keep this file named npm-workspace.yaml. Do not "restore" it to pnpm-workspace.yaml or the shadcn CLI breaks again.
