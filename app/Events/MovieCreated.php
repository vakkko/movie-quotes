<?php

namespace App\Events;

use App\Models\Movie;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Contracts\Events\ShouldDispatchAfterCommit;
use Illuminate\Foundation\Events\Dispatchable;

class MovieCreated implements ShouldBroadcastNow, ShouldDispatchAfterCommit
{
    use Dispatchable, InteractsWithSockets;

    public function __construct(
        public Movie $movie,
    ) {}

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, PrivateChannel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('App.Models.User.'.$this->movie->user_id),
        ];
    }

    public function broadcastAs(): string
    {
        return 'MovieCreated';
    }

    /**
     * Get the data to broadcast.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'movie' => [
                'id' => $this->movie->id,
                'title' => $this->movie->title,
                'released_at' => $this->movie->released_at?->year,
                'image_url' => $this->movie->getFirstMediaUrl('poster'),
                'genres' => $this->movie->genre,
                'description' => $this->movie->description,
                'director' => $this->movie->director,
                'quotes_count' => 0,
            ],
        ];
    }
}
