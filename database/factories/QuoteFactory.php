<?php

namespace Database\Factories;

use App\Models\Movie;
use App\Models\Quote;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Throwable;

/**
 * @extends Factory<Quote>
 */
class QuoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $quotesKa = [
            'ყველაზე დიდი რისკი - არაფრის რისკია.',
            'წარმატება არ არის საბოლოო, მარცხი - საშიში არა.',
            'ვინც არ უნდა იყო, ვინმეს ღირსეული იყავი.',
            'სიყვარული არის ერთადერთი, რაც არ შეიძლება გაიზარდოს გაყოფით.',
        ];

        return [
            'user_id' => User::factory(),
            'movie_id' => Movie::factory(),
            'quote' => [
                'en' => fake()->sentence(),
                'ka' => fake()->randomElement($quotesKa),
            ],
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Quote $quote) {
            try {
                $quote->addMediaFromUrl("https://picsum.photos/seed/quote-{$quote->id}/1920/1080")
                    ->toMediaCollection('image');
            } catch (Throwable) {
                $quote->addMediaFromString(file_get_contents(__DIR__.'/../../tests/fixtures/test-image.png'))
                    ->usingFileName('test-image.png')
                    ->toMediaCollection('image');
            }
        });
    }
}
