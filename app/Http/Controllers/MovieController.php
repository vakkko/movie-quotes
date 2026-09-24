<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMovieRequest;
use App\Http\Requests\UpdateMovieRequest;
use App\Http\Resources\MovieResource;
use App\Http\Resources\MovieShowResource;
use App\Models\Movie;
use App\Services\MovieControllerService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MovieController extends Controller
{
    public function __construct(
        private MovieControllerService $movieService
    ) {}

    public function index(Request $request): Response
    {
        $movies = $this->movieService->getMoviesPaginated(Auth::user(), $request);

        return Inertia::render('Movies/Movies', [
            'movies' => Inertia::scroll(MovieResource::collection($movies)),
        ]);
    }

    public function show(Movie $movie): Response
    {
        $this->authorize('view', $movie);

        return Inertia::render('Movie/Movie', [
            'movie' => MovieShowResource::make($this->movieService->getMovieDetails($movie)),
        ]);
    }

    public function destroy(Movie $movie): RedirectResponse|JsonResponse
    {
        $this->authorize('delete', $movie);

        $this->movieService->deleteMovie($movie);

        if (request()->expectsJson()) {
            return response()->json(['message' => 'Movie deleted successfully']);
        }

        return back();
    }

    public function store(StoreMovieRequest $request): RedirectResponse
    {
        $this->movieService->createMovie(
            Auth::user(),
            $request->mappedAttributes(),
            $request->file('image'),
        );

        return redirect()->route('movies');
    }

    public function update(UpdateMovieRequest $request, Movie $movie): RedirectResponse
    {
        $this->authorize('update', $movie);

        $this->movieService->updateMovie(
            $movie,
            $request->mappedAttributes(),
            $request->hasFile('image') ? $request->file('image') : null,
        );

        return back();
    }
}
