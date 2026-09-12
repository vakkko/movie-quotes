<?php

use App\Models\Notification;
use App\Models\Quote;
use App\Models\User;

class QuoteLikeService
{
    public function toggleLike(User $user, Quote $quote): string
    {
        $existingLike = $quote->likes()
            ->where('user_id', $user->id)
            ->first();

        if ($existingLike) {
            $existingLike->delete();

            Notification::query()
                ->where('user_id', $quote->user_id)
                ->where('actor_id', $user->id)
                ->where('type', 'like')
                ->where('quote_id', $quote->id)
                ->delete();

            return 'unliked';
        }

        $quote->likes()->create([
            'user_id' => $user->id,
        ]);

        if ($quote->user_id !== $user->id) {
            Notification::create([
                'user_id' => $quote->user_id,
                'actor_id' => $user->id,
                'type' => 'like',
                'quote_id' => $quote->id,
            ]);
        }

        return 'liked';
    }
}
