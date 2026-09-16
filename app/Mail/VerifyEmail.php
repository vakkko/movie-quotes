<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $url,
        public string $username,
        public bool $isChange = false,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: __($this->isChange ? 'mail.email_change_subject' : 'mail.verification_subject'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.verify-email',
            with: [
                'url' => $this->url,
                'username' => $this->username,
                'isChange' => $this->isChange,
            ],
        );
    }
}
