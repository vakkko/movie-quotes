---
paths:
  - 'resources/js/lib/**'
---

# Lib

## Share script regexes via lib/validation.ts createFieldValidator
The English/Georgian script regexes and the reusable field-validator live once in resources/js/lib/validation.ts (exports ENGLISH_REGEX, GEORGIAN_REGEX, TranslateFn, createFieldValidator). Per-form validation files (quoteValidation.ts, movieValidation.ts) use createFieldValidator(['...english fields...'], ['...georgian fields...']) and keep only their own Form type, initialForm, and validateForm. This supersedes the older guidance claiming script regexes live only in pages/Movies/movieValidation.ts.
