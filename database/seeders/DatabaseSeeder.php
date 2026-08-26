<?php

namespace Database\Seeders;

use App\Models\Movie;
use App\Models\Notification;
use App\Models\Quote;
use App\Models\QuoteComment;
use App\Models\QuoteLike;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $testUser = User::factory()->create([
            'username' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $users = User::factory(5)->create();

        $allUsers = $users->push($testUser);

        $allQuotes = collect();

        $allUsers->each(function (User $user) use ($allUsers, $allQuotes) {
            $movies = Movie::factory(rand(2, 4))->create([
                'user_id' => $user->id,
            ]);

            $movies->each(function (Movie $movie) use ($user, $allUsers, $allQuotes) {
                $quotes = Quote::factory(rand(1, 3))->create([
                    'user_id' => $user->id,
                    'movie_id' => $movie->id,
                ]);

                $allQuotes->push(...$quotes);

                $quotes->each(function (Quote $quote) use ($allUsers) {
                    $likers = $allUsers->random(rand(0, $allUsers->count()));
                    foreach ($likers as $liker) {
                        QuoteLike::factory()->create([
                            'user_id' => $liker->id,
                            'quote_id' => $quote->id,
                        ]);
                    }

                    $commenters = $allUsers->random(rand(0, min(3, $allUsers->count())));
                    foreach ($commenters as $commenter) {
                        QuoteComment::factory()->create([
                            'user_id' => $commenter->id,
                            'quote_id' => $quote->id,
                        ]);
                    }
                });
            });
        });

        $allUsers->each(function (User $actor) use ($allUsers, $allQuotes) {
            $recipients = $allUsers->reject(fn (User $u) => $u->id === $actor->id);
            if ($recipients->isEmpty() || $allQuotes->isEmpty()) {
                return;
            }

            Notification::factory(rand(1, 3))->create([
                'actor_id' => $actor->id,
                'user_id' => $recipients->random()->id,
                'quote_id' => $allQuotes->random()->id,
            ]);
        });
    }
}
