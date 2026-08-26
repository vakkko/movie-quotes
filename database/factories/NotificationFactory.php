<?php

namespace Database\Factories;

use App\Models\Notification;
use App\Models\Quote;
use App\Models\QuoteComment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['like', 'comment']);

        return [
            'user_id' => User::factory(),
            'actor_id' => User::factory(),
            'type' => $type,
            'quote_id' => Quote::factory(),
            'comment_id' => $type === 'comment' ? QuoteComment::factory() : null,
            'is_read' => fake()->boolean(30),
        ];
    }
}
