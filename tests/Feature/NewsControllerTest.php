<?php

use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('searches quotes by plain text', function () {
    $movie = Movie::factory()->create(['user_id' => $this->user->id, 'title' => ['en' => 'Inception', 'ka' => 'ინსეფშენი']]);
    $quote = Quote::create(['user_id' => $this->user->id, 'movie_id' => $movie->id, 'quote' => ['en' => 'You must not be afraid', 'ka' => 'არ უნდა გეშინოდეს']]);
    Quote::create(['user_id' => $this->user->id, 'movie_id' => $movie->id, 'quote' => ['en' => 'Something else entirely', 'ka' => 'სრულიად სხვა რამ']]);

    $this->actingAs($this->user)
        ->get('/news?search=afraid')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('News/News')
            ->has('quotes.data', 1)
            ->where('quotes.data.0.id', $quote->id)
        );
});

it('searches movies by plain text', function () {
    $movie = Movie::factory()->create(['user_id' => $this->user->id, 'title' => ['en' => 'Inception', 'ka' => 'ინსეფშენი']]);
    $quote = Quote::create(['user_id' => $this->user->id, 'movie_id' => $movie->id, 'quote' => ['en' => 'A dream within a dream', 'ka' => 'სიზმარი სიზმარში']]);

    $this->actingAs($this->user)
        ->get('/news?search=Inception')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('News/News')
            ->has('quotes.data', 1)
            ->where('quotes.data.0.id', $quote->id)
        );
});

it('searches only movies when prefixed with @', function () {
    $movie = Movie::factory()->create(['user_id' => $this->user->id, 'title' => ['en' => 'Inception', 'ka' => 'ინსეფშენი']]);
    $inceptionQuote = Quote::create(['user_id' => $this->user->id, 'movie_id' => $movie->id, 'quote' => ['en' => 'A dream within a dream', 'ka' => 'სიზმარი სიზმარში']]);
    $otherMovie = Movie::factory()->create(['user_id' => $this->user->id, 'title' => ['en' => 'Matrix', 'ka' => 'მატრიცა']]);
    Quote::create(['user_id' => $this->user->id, 'movie_id' => $otherMovie->id, 'quote' => ['en' => 'Follow the white rabbit', 'ka' => 'თეთრი კურდღელი მიჰყევი']]);

    $this->actingAs($this->user)
        ->get('/news?search=@Inception')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('News/News')
            ->has('quotes.data', 1)
            ->where('quotes.data.0.id', $inceptionQuote->id)
        );
});

it('searches only quotes when prefixed with #', function () {
    $movie = Movie::factory()->create(['user_id' => $this->user->id, 'title' => ['en' => 'Inception', 'ka' => 'ინსეფშენი']]);
    $dreamQuote = Quote::create(['user_id' => $this->user->id, 'movie_id' => $movie->id, 'quote' => ['en' => 'A dream within a dream', 'ka' => 'სიზმარი სიზმარში']]);
    Quote::create(['user_id' => $this->user->id, 'movie_id' => $movie->id, 'quote' => ['en' => 'Something else entirely', 'ka' => 'სრულიად სხვა რამ']]);

    $this->actingAs($this->user)
        ->get('/news?search=%23dream')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('News/News')
            ->has('quotes.data', 1)
            ->where('quotes.data.0.id', $dreamQuote->id)
        );
});

it('returns all quotes when search is empty', function () {
    $movie = Movie::factory()->create(['user_id' => $this->user->id, 'title' => ['en' => 'Inception', 'ka' => 'ინსეფშენი']]);
    Quote::create(['user_id' => $this->user->id, 'movie_id' => $movie->id, 'quote' => ['en' => 'Quote one', 'ka' => 'ციტატა ერთი']]);
    Quote::create(['user_id' => $this->user->id, 'movie_id' => $movie->id, 'quote' => ['en' => 'Quote two', 'ka' => 'ციტატა ორი']]);

    $this->actingAs($this->user)
        ->get('/news?search=')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('News/News')
            ->has('quotes.data', 2)
        );
});
