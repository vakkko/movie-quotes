<?php

namespace App\Http\Controllers;

use App\Events\MovieCreated;
use App\Events\MovieDeleted;
use App\Http\Requests\StoreMovieRequest;
use App\Http\Requests\UpdateMovieRequest;
use App\Http\Resources\MovieResource;
use App\Http\Resources\MovieShowResource;
use App\Models\Movie;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MovieController extends Controller
{
    public function index(Request $request): Response
    {
        $movies = Movie::query()
            ->where('user_id', Auth::id())
            ->withCount('quotes')
            ->with('media')
            ->when($request->filled('search'), fn ($query) => $this->applySearch(
                $query,
                $request->string('search')->toString(),
            ))
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->paginate(12);

        return Inertia::render('Movies/Movies', [
            'movies' => Inertia::scroll(MovieResource::collection($movies)),
        ]);
    }

    public function show(Movie $movie): Response
    {
        $this->authorize('view', $movie);

        $movie->load([
            'media',
            'quotes' => fn ($query) => $query->latest()
                ->withCount('likes', 'comments'),
            'quotes.user',
        ])->loadCount('quotes');

        return Inertia::render('Movie/Movie', [
            'movie' => MovieShowResource::make($movie),
        ]);
    }

    public function destroy(Movie $movie): RedirectResponse|JsonResponse
    {
        $this->authorize('delete', $movie);

        broadcast(new MovieDeleted($movie))->toOthers();

        $movie->delete();

        if (request()->expectsJson()) {
            return response()->json(['message' => 'Movie deleted successfully']);
        }

        return back();
    }

    public function store(StoreMovieRequest $request): RedirectResponse
    {
        $movie = Auth::user()->movies()->create($request->mappedAttributes());

        $movie->addMedia($request->file('image'))->toMediaCollection('poster');

        broadcast(new MovieCreated($movie))->toOthers();

        return redirect()->route('movies');
    }

    public function update(UpdateMovieRequest $request, Movie $movie): RedirectResponse
    {
        $this->authorize('update', $movie);

        $movie->update($request->mappedAttributes());

        if ($request->hasFile('image')) {
            $movie->clearMediaCollection('poster');
            $movie->addMedia($request->file('image'))->toMediaCollection('poster');
        }

        return back();
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
