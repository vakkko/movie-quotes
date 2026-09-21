---
name: ui-system
description: "Use when building or styling UI in this app: Tailwind classes, the custom color palette and theme tokens, shadcn/ui components under resources/js/components/ui, cn() usage, layouts (DefaultLayout, Header, ProfileAndNavSection), responsive/mobile breakpoints, translation keys with t(), or toast/modals. Triggers on styling, Tailwind, shadcn, component, design, layout, theme, dark mode, colors, responsive, mobile, i18n, translation, t(), modal, toast."
---

# UI System

Tailwind v4 (CSS-first) + shadcn/ui + React 19. For syntax and class patterns load `tailwindcss-development`; for Inertia page/form wiring load `inertia-react-development`.

## Theme & tokens

- All theme tokens live in `resources/css/app.css`. There is **no `tailwind.config.js`**.
- Brand palette is defined in `@theme`: `cream`, `primary-red`, `dark-navy`, `deep-navy`, `charcoal-navy`, `light-gray`, `silver-gray`, `slate-gray`, `bootstrap-green/blue`, etc. Use these tokens (`bg-deep-navy`, `text-cream`) rather than arbitrary hex.
- `@theme inline` maps shadcn semantic tokens (`--background`, `--popover`, `--muted`, …) to `:root` CSS vars. Add new shadcn vars in both places.
- Root `font-size: 62.5%`, so `1rem = 10px`; sizes are written like `text-[1.6rem]`. Body background is a gradient (`--header-gradient`).
- Custom utilities like `font-500-size-16` and shared classes such as `button-primary-red-background` live in `app.css`.

## Components

- shadcn/ui components live in `resources/js/components/ui/`, added by copying the generated file in manually (see `.ai/rules/ui.md`, `.ai/rules/resources.md`). Available: avatar, button, calendar, dialog, dropdown-menu, field, input, label, popover, separator, sheet, textarea.
- Always merge classes with `cn()` from `@/lib/utils` (never the `cn` package). Fix generated `import { cn } from "cn"` to `@/lib/utils`.
- App components live under `resources/js/components/` (shared) or beside their page; icons come from `lucide-react` or `resources/js/components/svgs/`.

## Layouts & responsive

- Pages attach a layout via `Component.layout = (page) => <DefaultLayout>{page}</DefaultLayout>`.
- `DefaultLayout` owns `Header`, `ProfileAndNavSection`, `ToastProvider`, and the `AuthModalProvider`. Auth modal state flows from here — see `auth-and-email-flows`.
- Mobile is handled with `react-responsive` `useMediaQuery` (e.g. `{ maxWidth: 639 }`) and Tailwind `max-sm:`/`max-lg:` variants; many flows have a distinct mobile-only modal path (see `.ai/rules/components.md`).

## Copy & i18n

- All user-facing strings go through `t('key')` from `useTranslation`; keys live in `lang/en.php` and `lang/ka.php` and must be added to both.
- Never hardcode text; never read raw translation JSON in the client (the server sends localized scalars).

## Verify

Run `npm run types:check`, `npm run lint:check`, and `npm run format:check`; restart/`npm run build` if a styling change is not visible. See `project-verification`.
