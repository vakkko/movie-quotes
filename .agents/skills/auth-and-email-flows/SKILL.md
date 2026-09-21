---
name: auth-and-email-flows
description: 'Use when working on authentication or email in this app: login, register, logout, Google OAuth/Socialite, email verification, pending email change, forgot/reset password, auth modals, verification/reset email sending, or mail templates and lang keys. Triggers on auth, register, login, logout, Socialite, Google login, verify email, verification link, password reset, forgot password, unread email, ActiveModal, auth modal.'
---

# Auth & Email Flows

Auth is modal-based on the landing page; there are no GET `/login` or `/register` pages. Everything here has non-obvious traps — read the matching `.ai/rules` before editing (`.ai/rules/controllers.md`, `routes.md`, `http-controllers.md`, `notifications.md`, `app-mail.md`, `auth.md`, `layouts.md`).

## Auth model

- One `activeModal` state (`'login' | 'register' | 'verify-email' | 'create-password' | 'success' | null`) lives in `DefaultLayout` via `AuthModalProvider` (`resources/js/pages/Landing/useAuthModal.tsx`). Never add per-modal booleans.
- `redirectGuestsTo(fn () => route('home'))` must stay configured, because the `auth` middleware would otherwise redirect to a non-existent GET `/login` (405).
- Successful login always redirects to `/news`; unverified users are bounced home with an `unverified_email` flash.
- `AuthController::register` calls `Auth::login($user)` before sending verification — without auto-login the signed verify link is redirected away by middleware and `email_verified_at` never updates.
- Every auth form submit handler must accept the event and call `e.preventDefault()`; a missed one causes a native POST/405.

## Google OAuth

`GoogleAuthController` uses Socialite. New users get a unique lowercase alphanumeric username (max 15) and `email_verified_at = now` (Google is trusted, no verification mail); existing users are matched by email via `firstOrNew`. For Socialite API specifics load the `socialite-development` skill.

## Email verification & pending email change

- `VerifyEmailController` validates signatures **manually** with `$request->hasValidSignature()` (the route has no `signed` middleware) so the `verify_expired` flash persists. An exception-handler redirect does not persist flash in Laravel 13.
- If `pending_email` is set, the hash is checked against it and the email is swapped on click.
- Verification links must be signed; keep the flow in the controller, not the exception handler.

## Password reset

- Forgot: `PasswordResetController@send` (route `password.forgot`) → `ResetPasswordNotification` → `emails/reset-password.blade.php`. Reset is a **separate** flow from email verification.
- The signed link hits `password.reset.link` and redirects home with a `verified_user` session payload; `DefaultLayout` reads it (`verifyUserFromEmailRedirection`) and opens `CreatePasswordModal`.
- `AuthController::resetPassword` (POST `password.reset`) persists the new password and flashes `password_reset`.

## Mail & translations

- Each email is a raw-HTML Mailable in `app/Mail` + a custom `App\Notifications\*` returned from `toMail()`, with a raw HTML view in `resources/views/emails/*.blade.php` (embed the logo with `$message->embed(...)`). Do **not** publish vendor markdown mail views.
- Backend `__()` only resolves **grouped** files (`lang/{en,ka}/mail.php`, `lang/{en,ka}/verification.php`); flat `lang/en.php` keys are frontend-only. Update both locales together.
