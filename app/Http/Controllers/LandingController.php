<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuoteResource;
use App\Models\Quote;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;

class LandingController extends Controller
{
    public function __invoke(): Response|RedirectResponse
    {
        if (Auth::check()) {
            return redirect()->route('news');
        }

        $quotes = Quote::query()
            ->with('movie:id,title,released_at,genre,description,director')
            ->inRandomOrder()
            ->limit(3)
            ->get(['id', 'quote', 'movie_id']);

        return Inertia::render('Landing/Landing', [
            'quotes' => $quotes->map(
                fn (Quote $quote) => QuoteResource::make($quote)->resolve(),
            )->all(),
        ]);
    }
}
