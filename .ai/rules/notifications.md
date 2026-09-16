---
paths:
  - 'app/Notifications/**'
---

# Notifications

## Backend translations use grouped lang files, flat lang/en.php is frontend-only
Laravel's __()/trans() in this app does NOT resolve flat lang/en.php keys (those are only shared to the frontend via HandleInertiaRequests->translations). Backend/Blade/notification strings must use GROUPED translation files: lang/en/mail.php + lang/ka/mail.php for emails (__('mail.key')), lang/en/verification.php + lang/ka/verification.php for the verification notice/blade (__('verification.key')). Always update both en and ka grouped files together.
