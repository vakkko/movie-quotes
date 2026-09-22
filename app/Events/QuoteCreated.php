<?php

namespace App\Events;

use App\Models\Quote;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;

class QuoteCreated implements ShouldBroadcastNow, ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets;

    public function __construct(
        public Quote $quote,
    ) {}

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('news'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'QuoteCreated';
    }

    /**
     * Get the data to broadcast.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        $quote = $this->quote->loadMissing(['user:id,username,avatar_url', 'movie']);

        return [
            'quote' => [
                'id' => $quote->id,
                'quote_en' => $quote->getTranslation('quote', 'en'),
                'quote_ka' => $quote->getTranslation('quote', 'ka'),
                'image_url' => $quote->image_url,
                'created_at' => $quote->created_at?->toISOString(),
                'user' => [
                    'id' => $quote->user->id,
                    'username' => $quote->user->username,
                    'avatar_url' => $quote->user->avatar_url,
                ],
                'movie' => [
                    'id' => $quote->movie->id,
                    'title_en' => $quote->movie->getTranslation('title', 'en'),
                    'title_ka' => $quote->movie->getTranslation('title', 'ka'),
                    'director_en' => $quote->movie->getTranslation('director', 'en'),
                    'director_ka' => $quote->movie->getTranslation('director', 'ka'),
                    'released_at' => (string) $quote->movie->released_at?->year,
                ],
                'comments' => [],
                'likes_count' => 0,
                'comments_count' => 0,
                'is_liked' => false,
            ],
        ];
    }
}
