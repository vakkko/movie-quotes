<?php

namespace App\Events;

use App\Models\QuoteComment;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;

class QuoteCommentCreated implements ShouldBroadcastNow, ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets;

    public function __construct(
        public QuoteComment $comment,
    ) {}

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('quotes.'.$this->comment->quote_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'QuoteCommentCreated';
    }

    /**
     * Get the data to broadcast.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'quote_id' => $this->comment->quote_id,
            'comment' => [
                'id' => $this->comment->id,
                'body' => $this->comment->body,
                'created_at' => $this->comment->created_at?->toISOString(),
                'user' => [
                    'id' => $this->comment->user->id,
                    'username' => $this->comment->user->username,
                    'avatar' => $this->comment->user->avatar_url,
                ],
            ],
        ];
    }
}
