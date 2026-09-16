<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $url,
        public string $username,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: __('mail.reset_subject'),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.reset-password',
            with: [
                'url' => $this->url,
                'username' => $this->username,
            ],
        );
    }
}
