<?php

use App\Models\User;
use App\Notifications\EmailVerificationNotification;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;

it('registers a user, auto-logs them in and sends a verification notification', function () {
    Notification::fake();

    $this->post(route('register'), [
        'username' => 'vakkko',
        'email' => 'vakkko@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertRedirect(route('home'));

    $user = User::where('email', 'vakkko@example.com')->first();

    expect($user)->not->toBeNull()
        ->and(Hash::check('password', $user->password))->toBeTrue()
        ->and(Auth::check())->toBeTrue()
        ->and(Auth::id())->toBe($user->id);

    Notification::assertSentTo($user, EmailVerificationNotification::class);
});

it('allows numbers in the registration password', function () {
    Notification::fake();

    $this->post(route('register'), [
        'username' => 'nick',
        'email' => 'nick@example.com',
        'password' => 'secret123',
        'password_confirmation' => 'secret123',
    ])->assertRedirect(route('home'));

    $user = User::where('email', 'nick@example.com')->first();

    expect($user)->not->toBeNull()
        ->and(Hash::check('secret123', $user->password))->toBeTrue();
});

it('rejects a registration password with uppercase letters or symbols', function () {
    $this->post(route('register'), [
        'username' => 'vakkko',
        'email' => 'vakkko@example.com',
        'password' => 'Secret123!',
        'password_confirmation' => 'Secret123!',
    ])->assertSessionHasErrors('password');

    expect(User::where('email', 'vakkko@example.com')->exists())->toBeFalse();
});

it('logs in a verified user and redirects to the news feed', function () {
    $user = User::factory()->create(['password' => 'password']);

    $this->post(route('login'), [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirect(route('news'));

    expect(Auth::id())->toBe($user->id)
        ->and(Auth::check())->toBeTrue();
});

it('bounces an unverified user back home with an unverified email flash', function () {
    $user = User::factory()->unverified()->create(['password' => 'password']);

    $this->post(route('login'), [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirect(route('home'))
        ->assertSessionHas('unverified_email', true)
        ->assertSessionHas('unverified_email_address', $user->email);

    expect(Auth::check())->toBeFalse();
});

it('rejects login with invalid credentials', function () {
    $user = User::factory()->create(['password' => 'password']);

    $this->from(route('home'))->post(route('login'), [
        'email' => $user->email,
        'password' => 'wrong-password',
    ])->assertRedirect(route('home'))
        ->assertSessionHasErrors('email');

    expect(Auth::check())->toBeFalse();
});

it('logs the user out and redirects home', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('logout'))
        ->assertRedirect(route('home'));

    expect(Auth::check())->toBeFalse();
});

it('resets the password and flashes password reset state', function () {
    $user = User::factory()->create(['password' => 'oldpassword']);

    $this->post(route('password.reset'), [
        'email' => $user->email,
        'password' => 'newpassword',
        'password_confirmation' => 'newpassword',
    ])->assertRedirect(route('home'))
        ->assertSessionHas('password_reset', true);

    expect(Hash::check('newpassword', $user->fresh()->password))->toBeTrue();
});
