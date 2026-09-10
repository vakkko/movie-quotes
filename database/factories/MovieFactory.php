<?php

namespace Database\Factories;

use App\Models\Movie;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

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
            'image_url' => fake()->imageUrl(1920, 1080, 'movies'),
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
}
