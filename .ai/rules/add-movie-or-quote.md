---
paths:
  - 'resources/js/components/AddMovieOrQuote/**'
---

# Add Movie Or Quote

## Shared AddMovie/AddQuote components are now controlled
MovieOrQuoteInput, MovieOrQuoteTextarea, GenresDropdown, and ImageUpload now accept optional controlled props (value/onChange/name/error/preview). Callers that omit them get uncontrolled behavior (e.g. AddQuote). When wired to a parent form, pass all props and put the submit button inside the <form> element — AddMovieOrQuoteWrapper no longer renders a submit button (submitText prop was removed). Eng inputs filter to /^[a-zA-Z0-9\s\-':,.!?()&]*$/, ქარ inputs to /^[\u10D0-\u10FF\u0020\u00A0\u200B]*$/. Kept optional so the quote flow (AddQuote) still type-checks without wiring.

## Lang-specific fields allow typing, validate via error message
MovieOrQuoteInput/Textarea NO LONGER block invalid keystrokes. They pass every typed value to onChange; the wrong-script error is shown via validation in useCreateMovie (validateField). Script regexes live in pages/Movies/movieValidation.ts only. Use DatePicker (components/AddMovieOrQuote/DatePicker.tsx) for release dates - a Radix Popover calendar (no date picker library installed).

## Use shadcn DatePicker (not custom calendar)
DatePicker (components/AddMovieOrQuote/DatePicker.tsx) is the shadcn Date Picker pattern: Popover + Calendar (react-day-picker v10) + Button. It stores/emits a 'yyyy-MM-dd' string (date-fns v4 format). react-day-picker v10 uses prop autoFocus (NOT initialFocus). Do not hand-roll a calendar - use these ui components.

## ImageUpload self-manages preview via useImageUpload
ImageUpload no longer accepts controlled `preview`/`onChange` props. It uses `useImageUpload` (in components/AddMovieOrQuote/useImageUpload.ts) to own file/preview state and clearing. Parents sync the file into their form via `onFileChange(file | null)` and can force a reset through the `reset` method exposed on the `ImageUploadHandle` ref (React 19 ref-as-prop + useImperativeHandle). useCreateMovie only stores the file into Inertia data + validates (its handleImageChange), it does not manage preview/clearing anymore.
