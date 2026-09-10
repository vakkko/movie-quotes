<?php

namespace App\Services;

use App\Models\Movie;
use App\Models\Notification;
use App\Models\Quote;
use App\Models\QuoteComment;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\CursorPaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class NewsControllerService
{
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

    public function getMoviesForUser(User $user): Collection
    {
        $locale = app()->getLocale();

        return Movie::query()
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->get()
            ->map(fn (Movie $movie) => [
                'id' => $movie->id,
                'title' => $movie->getTranslation('title', $locale),
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

    public function createQuote(User $user, array $data, UploadedFile $file): Quote
    {
        $imagePath = $file->store('quotes', 'public');

        return $user->quotes()->create([
            'quote' => [
                'en' => $data['quote_en'],
                'ka' => $data['quote_ka'],
            ],
            'movie_id' => $data['movie_id'],
            'image_url' => Storage::disk('public')->url($imagePath),
        ]);
    }

    public function updateQuote(Quote $quote, array $data, ?UploadedFile $file = null): Quote
    {
        if ($quote->user_id !== Auth::id()) {
            abort(403);
        }

        $updateData = [
            'quote' => [
                'en' => $data['quote_en'],
                'ka' => $data['quote_ka'],
            ],
        ];

        if ($file) {
            $imagePath = $file->store('quotes', 'public');
            $updateData['image_url'] = Storage::disk('public')->url($imagePath);
        }

        $quote->update($updateData);

        return $quote;
    }

    public function deleteQuote(Quote $quote): bool
    {
        if ($quote->image_url) {
            $path = str_replace(Storage::disk('public')->url('/'), '', $quote->image_url);
            Storage::disk('public')->delete($path);
        }

        return $quote->delete();
    }

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

        $this->whereTranslation($query, 'quote', $term);
    }

    private function whereTranslation(Builder $query, string $column, string $term): void
    {
        $query->where(function (Builder $builder) use ($column, $term) {
            foreach (['en', 'ka'] as $locale) {
                $builder->orWhere("{$column}->{$locale}", 'like', "%{$term}%");
            }
        });
    }
}
