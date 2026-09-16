---
paths:
  - 'app/Mail/**'
---

# App Mail

## Email via raw HTML Mailable + custom Notification (quiz-wiz pattern)
Mirror quiz-wiz: each email is an App\\Mail\\* Mailable with a raw HTML view in resources/views/emails/*.blade.php (embed logo with $message->embed(public_path('images/logo.png')) at the top-level content view), dispatched from a custom App\\Notifications\\* notification returned from toMail(). Do NOT use vendor-published markdown mail views (x-mail::message / MailMessage / resources/views/vendor/mail) — publishing laravel-mail and customizing its header broke sends (Undefined variable $message in the nested header component). Keep i18n via __('mail.*') keys in lang/{en,ka}/mail.php.
