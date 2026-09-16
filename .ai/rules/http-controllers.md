---
paths:
  - 'app/Notifications/**,app/Http/Controllers/PasswordResetController.php'
---

# Http Controllers

## Separate Mailable per email type; reset uses own view
Each email type has its own App\Mail\* Mailable with its own raw-HTML view in resources/views/emails/*.blade.php plus its own App\Notifications\* notification (see app-mail.md). Password reset is NOT the verify-email mail: forgot uses PasswordResetController@send (route password.forgot) -> ResetPasswordNotification -> emails/reset-password.blade.php. Its signed link goes to password.reset.link (PasswordResetController::__invoke) which redirects home with the verified_user session so the CreatePasswordModal opens — do not reuse verification.verify for reset links.
