<?php

use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('renders the landing page with quotes and their movie data', function () {
    $movie = Movie::factory()->create([
        'user_id' => $this->user->id,
        'title' => ['en' => 'Inception', 'ka' => 'ინსეფშენი'],
        'genre' => ['Drama', 'Sci-Fi'],
        'released_at' => '2010-07-16',
        'description' => ['en' => 'A thief steals secrets', 'ka' => 'ქურდი საიდუმლოებებს იპარავს'],
        'director' => ['en' => 'Christopher Nolan', 'ka' => 'ქრისტოფერ ნოლანი'],
    ]);

    $quoteTexts = [
        ['en' => 'A dream within a dream', 'ka' => 'სიზმარი სიზმარში'],
        ['en' => 'You must not be afraid', 'ka' => 'არ უნდა გეშინოდეს'],
        ['en' => 'We are dreamers', 'ka' => 'ჩვენ ვართ მეოცნებეები'],
    ];

    $quoteIds = [];

    foreach ($quoteTexts as $text) {
        $quoteIds[] = Quote::create([
            'user_id' => $this->user->id,
            'movie_id' => $movie->id,
            'quote' => $text,
        ])->id;
    }

    $response = $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Landing/Landing')
            ->has('quotes', 3)
            ->where('quotes.0.movie.id', $movie->id)
            ->where('quotes.0.movie.title', 'Inception')
            ->where('quotes.0.movie.released_at', 2010)
            ->where('quotes.0.movie.genres', ['Drama', 'Sci-Fi'])
            ->where('quotes.0.movie.director', 'Christopher Nolan')
            ->where('quotes.0.movie.description', 'A thief steals secrets')
        );

    $props = $response->original->getData()['page']['props']['quotes'];

    expect(collect($props)->pluck('id')->all())
        ->toEqualCanonicalizing($quoteIds);
});

it('limits the landing page to three quotes', function () {
    $movie = Movie::factory()->create(['user_id' => $this->user->id]);

    for ($i = 0; $i < 5; $i++) {
        Quote::create([
            'user_id' => $this->user->id,
            'movie_id' => $movie->id,
            'quote' => ['en' => "Quote {$i}", 'ka' => "ციტატა {$i}"],
        ]);
    }

    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Landing/Landing')
            ->has('quotes', 3)
        );
});

it('renders an empty quotes list when there are no quotes', function () {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Landing/Landing')
            ->has('quotes', 0)
        );
});
