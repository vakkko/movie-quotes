<?php

namespace App\Services;

use App\Events\MovieCreated;
use App\Events\MovieDeleted;
use App\Models\Movie;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Pagination\LengthAwarePaginator;

class MovieControllerService
{
    /**
     * @return LengthAwarePaginator<int, Movie>
     */
    public function getMoviesPaginated(User $user, Request $request): LengthAwarePaginator
    {
        return Movie::query()
            ->where('user_id', $user->id)
            ->withCount('quotes')
            ->with('media')
            ->when($request->filled('search'), fn ($query) => $this->applySearch(
                $query,
                $request->string('search')->toString(),
            ))
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->paginate(12);
    }

    public function getMovieDetails(Movie $movie): Movie
    {
        return $movie->load([
            'media',
            'quotes' => fn ($query) => $query->latest()
                ->withCount('likes', 'comments'),
            'quotes.user',
        ])->loadCount('quotes');
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function createMovie(User $user, array $data, UploadedFile $file): Movie
    {
        $movie = $user->movies()->create($data);

        $movie->addMedia($file)->toMediaCollection('poster');

        broadcast(new MovieCreated($movie))->toOthers();

        return $movie;
    }

    /**
     * @param  array<string, mixed>  $data
     */
    public function updateMovie(Movie $movie, array $data, ?UploadedFile $file = null): Movie
    {
        $movie->update($data);

        if ($file) {
            $movie->clearMediaCollection('poster')->addMedia($file)->toMediaCollection('poster');
        }

        return $movie;
    }

    public function deleteMovie(Movie $movie): bool
    {
        broadcast(new MovieDeleted($movie))->toOthers();

        $movie->delete();

        return true;
    }

    /**
     * @param  Builder<Movie>  $query
     */
    private function applySearch(Builder $query, string $term): void
    {
        $term = trim($term);

        if ($term === '') {
            return;
        }

        $query->where(function (Builder $builder) use ($term) {
            foreach (['en', 'ka'] as $locale) {
                $builder->orWhere('title->'.$locale, 'like', "%{$term}%");
            }
        });
    }
}
