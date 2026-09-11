<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuoteResource;
use App\Models\Quote;
use Inertia\Inertia;
use Inertia\Response;

class LandingController extends Controller
{
    public function __invoke(): Response
    {
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
