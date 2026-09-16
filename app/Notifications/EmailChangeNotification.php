<?php

namespace App\Notifications;

use App\Mail\VerifyEmail;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class EmailChangeNotification extends Notification
{
    use Queueable;

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(User $notifiable): VerifyEmail
    {
        $verificationUrl = $this->verificationUrl($notifiable);

        return (new VerifyEmail(
            $verificationUrl,
            $notifiable->username,
            isChange: true,
        ))->to($notifiable->pending_email);
    }

    /**
     * Get the signed verification URL for the user.
     */
    protected function verificationUrl(User $notifiable): string
    {
        return URL::temporarySignedRoute(
            'verification.verify',
            now()->addHour(),
            [
                'id' => $notifiable->getKey(),
                'hash' => sha1($notifiable->pending_email),
            ],
        );
    }
}
