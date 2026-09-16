---
paths:
  - 'resources/js/layouts/**'
---

# Layouts

## Single activeModal state for auth modals
Auth modals (login, register, verify-email, create-password, success, null) are controlled by one `activeModal` string state owned by DefaultLayout and threaded via `setActiveModal`. Type `ActiveModal` lives in resources/js/layouts/DefaultLayout.tsx. CreatePasswordModal's success StatusModal is derived from `activeModal === 'success'` (a separate dialog, not a view of the create-password dialog). Do not reintroduce per-modal booleans like loginOpen/registerOpen.
