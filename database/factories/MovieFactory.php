<?php

namespace Database\Factories;

use App\Models\Movie;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Throwable;

/**
 * @extends Factory<Movie>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $titleEn = fake()->sentence(3, false);
        $genre = fake()->randomElement(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Animation', 'Documentary', 'Fantasy']);

        $titlesKa = [
            'შურისმაძიებლები',
            'ბნელი რაინდი',
            'გალაქტიკის მცველები',
            'ვიფლეში',
        ];

        $descriptionsKa = [
            'ეს არის მძაფრი სიუჟეტი მოულოდნელი დასასრულით.',
            'ფილმი გვიყვება მეგობრობის შესახებ რთულ დროს.',
            'შესანიშნავი ვიზუალური ეფექტები და მსახიობთა თამაში.',
            'კლასიკური ისტორია თანამედროვე ინტერპრეტაციით.',
        ];

        $directorsKa = ['ჯონ სმიტი', 'მარია გარსია', 'პიტერ ჯონსონი', 'სარა ბრაუნი', 'მაიკლ დევისი'];

        return [
            'user_id' => User::factory(),
            'title' => [
                'en' => $titleEn,
                'ka' => fake()->randomElement($titlesKa),
            ],
            'released_at' => fake()->dateTimeBetween('-30 years', 'now'),
            'genre' => $genre,
            'description' => [
                'en' => fake()->paragraph(),
                'ka' => fake()->randomElement($descriptionsKa),
            ],
            'director' => [
                'en' => fake()->name(),
                'ka' => fake()->randomElement($directorsKa),
            ],
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Movie $movie) {
            try {
                $movie->addMediaFromUrl("https://picsum.photos/seed/movie-{$movie->id}/1920/1080")
                    ->toMediaCollection('poster');
            } catch (Throwable) {
                $movie->addMediaFromString(file_get_contents(__DIR__.'/../../tests/fixtures/test-image.png'))
                    ->usingFileName('test-image.png')
                    ->toMediaCollection('poster');
            }
        });
    }
}
