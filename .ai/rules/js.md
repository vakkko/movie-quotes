---
paths:
  - 'resources/js/**'
---

# Js

## Bilingual UI: lang query param + props.translations
Locale is driven by a ?lang=en|ka query param handled by SetLocale middleware (validated, persisted to session, shared back as props.locale). Model data sent to pages is already localized server-side via API Resources. UI strings live in lang/en.php + lang/ka.php and are shared as props.translations; read them through the useTranslation() hook (t('key')).

## UI text goes through translation keys
All user-facing strings in React components must use the `useTranslation` hook's `t('key')` (never hardcoded text). Keys live in `lang/en.php` and `lang/ka.php` (Georgian + English), which are shared to the frontend as the `translations` prop by HandleInertiaRequests. Add/replace keys in both lang files together.

## Authenticated user shared as `user`, not `auth`
The shared Inertia prop for the authenticated user is a single flattened `user` (User | null), set in HandleInertiaRequests::share as `'user' => $request->user()`. Access it as `usePage<SharedPageProps>().props.user`, NOT the default skeleton `auth.user`. The `Auth` wrapper type was removed; `User` lives in resources/js/types/auth.ts.

## Co-locate component hooks with the component
Component-specific hooks live in the component's own folder with a named export (e.g. Notifications/useNotifications.ts, useStickyQuotes.ts) and are imported as `import { useX } from './useX'`. Generic/reusable hooks go in resources/js/hooks with a default export (e.g. useAddMovieOrQuote).
