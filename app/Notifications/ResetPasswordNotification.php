<?php

namespace App\Notifications;

use App\Mail\ResetPassword;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\URL;

class ResetPasswordNotification extends Notification
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
    public function toMail(User $notifiable): ResetPassword
    {
        $resetUrl = $this->resetUrl($notifiable);

        return (new ResetPassword(
            $resetUrl,
            $notifiable->username,
        ))->to($notifiable->getEmailForVerification());
    }

    /**
     * Get the signed password reset URL for the user.
     */
    protected function resetUrl(User $notifiable): string
    {
        return URL::temporarySignedRoute(
            'password.reset.link',
            now()->addHour(),
            [
                'id' => $notifiable->getKey(),
                'hash' => sha1($notifiable->getEmailForVerification()),
            ],
        );
    }
}
