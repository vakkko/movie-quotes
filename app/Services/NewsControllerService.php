<?php

namespace App\Services;

use App\Events\NotificationCreated;
use App\Events\QuoteCreated;
use App\Events\QuoteDeleted;
use App\Models\Movie;
use App\Models\Notification;
use App\Models\Quote;
use App\Models\QuoteComment;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\CursorPaginator;
use Illuminate\Support\Collection as SupportCollection;

class NewsControllerService
{
    /**
     * @return CursorPaginator<int, Quote>
     */
    public function getQuotesPaginated(Request $request): CursorPaginator
    {
        return Quote::query()
            ->with([
                'user:id,username,avatar_url',
                'movie:id,title,director,released_at',
                'comments' => fn ($q) => $q->with('user:id,username,avatar_url')->latest(),
                'likes',
                'likedByUsers:id',
            ])
            ->withCount(['likes', 'comments'])
            ->when($request->filled('search'), fn ($query) => $this->applySearch(
                $query,
                $request->string('search')->toString(),
            ))
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->cursorPaginate(5);
    }

    /**
     * @return SupportCollection<int, array{id: int, title: string}>
     */
    public function getMoviesForUser(User $user): SupportCollection
    {
        return Movie::query()
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Movie $movie) => [
                'id' => $movie->id,
                'title' => $movie->title,
            ]);
    }

    public function getQuoteDetails(Quote $quote): Quote
    {
        return $quote->load([
            'user:id,username,avatar_url',
            'movie:id,title,director,released_at',
            'comments' => fn ($q) => $q->with('user:id,username,avatar_url')->latest(),
            'likes',
            'likedByUsers:id',
        ])->loadCount(['likes', 'comments']);
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function createQuote(User $user, array $data, UploadedFile $file): Quote
    {
        $quote = $user->quotes()->create([
            'quote' => [
                'en' => $data['quote_en'],
                'ka' => $data['quote_ka'],
            ],
            'movie_id' => $data['movie_id'],
        ]);

        $quote->addMedia($file)->toMediaCollection('image');

        broadcast(new QuoteCreated($quote))->toOthers();

        return $quote;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function updateQuote(Quote $quote, array $data, ?UploadedFile $file = null): Quote
    {
        $updateData = [
            'quote' => [
                'en' => $data['quote_en'],
                'ka' => $data['quote_ka'],
            ],
        ];

        $quote->update($updateData);

        if ($file) {
            $quote->clearMediaCollection('image')->addMedia($file)->toMediaCollection('image');
        }

        return $quote;
    }

    public function deleteQuote(Quote $quote): bool
    {
        broadcast(new QuoteDeleted($quote))->toOthers();

        $quote->delete();

        return true;
    }

    public function addComment(User $user, Quote $quote, string $body): QuoteComment
    {
        $comment = $user->comments()->create([
            'quote_id' => $quote->id,
            'body' => $body,
        ]);

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

    /**
     * @param  Builder<Quote>  $query
     */
    private function applySearch(Builder $query, string $search): void
    {
        if (str_starts_with($search, '@')) {
            $term = trim(substr($search, 1));

            if ($term === '') {
                return;
            }

            $query->whereHas('movie', fn ($movie) => $this->whereTranslation($movie, 'title', $term));

            return;
        }

        $term = str_starts_with($search, '#') ? trim(substr($search, 1)) : trim($search);

        if ($term === '') {
            return;
        }

        $query->where(function ($builder) use ($term) {
            $this->whereTranslation($builder, 'quote', $term);
            $builder->orWhereHas('movie', fn ($movie) => $this->whereTranslation($movie, 'title', $term));
        });
    }

    /**
     * @param  Builder<Model>|Builder<Quote>  $query
     */
    private function whereTranslation(Builder $query, string $column, string $term): void
    {
        $query->where(function (Builder $builder) use ($column, $term) {
            foreach (['en', 'ka'] as $locale) {
                $builder->orWhere("{$column}->{$locale}", 'like', "%{$term}%");
            }
        });
    }
}
