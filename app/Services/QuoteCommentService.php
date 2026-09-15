<?php

namespace App\Services;

use App\Events\NotificationCreated;
use App\Events\QuoteCommentCreated;
use App\Models\Notification;
use App\Models\Quote;
use App\Models\QuoteComment;
use App\Models\User;

class QuoteCommentService
{
    public function addComment(User $user, Quote $quote, string $body): QuoteComment
    {
        $comment = $user->comments()->create([
            'quote_id' => $quote->id,
            'body' => $body,
        ]);

        broadcast(new QuoteCommentCreated($comment))->toOthers();

        if ($quote->user_id !== $user->id) {
            $notification = Notification::create([
                'user_id' => $quote->user_id,
                'actor_id' => $user->id,
                'type' => 'comment',
                'quote_id' => $quote->id,
                'comment_id' => $comment->id,
            ]);

            event(new NotificationCreated($notification));
        }

        return $comment;
    }
}
