<?php

namespace App\Services;

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

        if ($quote->user_id !== $user->id) {
            Notification::create([
                'user_id' => $quote->user_id,
                'actor_id' => $user->id,
                'type' => 'comment',
                'quote_id' => $quote->id,
                'comment_id' => $comment->id,
            ]);
        }

        return $comment;
    }
}
