---
paths:
  - 'resources/js/pages/Profile/components/**'
---

# Components

## Mobile profile editing uses ProfileEditModal, not inline fields
On small screens (useMediaQuery { maxWidth: 639 }) the profile rows do NOT expand inline. Clicking Edit opens ProfileEditModal (full-screen solid bg-deep-navy overlay, avatar + field + Cancel/Edit). The sections' expanded inputs are gated by an `inlineEditing` prop (false on mobile), and the same field JSX is duplicated inside the modal for the active editor. Keep the inlineEditing=!isMobile wiring in ProfileForm.

## Mobile profile edit: modal Edit confirms locally, only "Save changes" submits
On small screens (useMediaQuery { maxWidth: 639 }) the profile rows do NOT expand inline. Clicking Edit opens ProfileEditModal for that field. The modal's Edit button does NOT submit — it calls confirmEdit (validates that single field via useProfileForm.validateSingle and closes), keeping the value in the form so only the bottom "Save changes" button sends the PATCH. Modal-open state is a separate `modalField` state in ProfileForm (editing flags stay true after confirm so save-time validation still covers edited fields). Cancel uses toggleField to discard the field edit. Sections gate expanded inputs with `inlineEditing` (false on mobile) and pass `editing={false}` on mobile so rows always show the "Edit" label.

## Edited fields show pending value + green border on ProfileRow
ProfileRow accepts an `edited` prop: when true it draws a green border on the input, and the section rows (username/email) display the pending value (`edited ? value : original`) so the form reflects edits made in the modal. ProfileForm passes `edited={editing.<key>}` (the real pending flag) separately from `editing={rowEditing(key)}` (false on mobile, drives the label only). This display is MOBILE-ONLY: sections compute `showEdited = edited && !inlineEditing`, so on desktop the row always shows the original value while the user types in the expanded "new field" below (Desktop inline editing must not live-update the row). Password shows the border and fills the row input with the masked new password (type=password, readOnly on mobile, no eye) so it's not visible.

## Save-changes confirmation modal (mobile only)
On small screens the "Save changes" button is `type="button"` and opens a confirmation modal ("Are you sure to make changes?" with Cancel/Confirm) instead of submitting; only Confirm calls handleSubmit. Desktop keeps `type="submit"`. Reuses ProfileEditModal with a `confirmLabel` prop (defaults to t('edit')). Keys: save_changes_confirmation, confirm (both lang files).

## Profile UI state lives in useProfileForm hook
All ProfileForm logic (form data + UI state) lives in the single co-located useProfileForm hook (resources/js/pages/Profile/components/ProfileForm/useProfileForm.ts): editing/modalField/confirmingSave state plus openModal/cancelEdit/confirmEdit/resetState/inlineEditing/rowEditing. ProfileForm.tsx is a pure view; modal field JSX is extracted into EditModalFields.tsx. Records in components.md that reference "modalField state in ProfileForm" mean the hook, not the component.
