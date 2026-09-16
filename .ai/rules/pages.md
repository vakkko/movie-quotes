---
paths:
  - 'resources/js/pages/**'
---

# Pages

## Use shared useAddMovieOrQuote hook for create forms
Add Movie and Add Quote forms share the generic hook useAddMovieOrQuote (resources/js/hooks/useAddMovieOrQuote.ts). Do not create new per-feature hooks. Call it with { initialForm, validateField, validateForm, url, onSuccess }, importing validateField/validateForm/initialForm from the feature's validation file and the store url from wayfinder (e.g. storeQuoteRoute.url()). Internally it types the Inertia form as Record<string, string | File | null> and casts back to the generic Form because @inertiajs/core's FormDataKeys<Form> cannot be resolved for a generic type param.
