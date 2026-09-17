<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Symfony\Component\HttpFoundation\RedirectResponse as SymfonyRedirectResponse;
use Throwable;

class GoogleAuthController extends Controller
{
    public function redirect(): SymfonyRedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback(): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (Throwable) {
            return redirect()->route('home')->withErrors([
                'google' => __('google_auth_failed'),
            ]);
        }

        $user = User::firstOrNew(['email' => $googleUser->getEmail()]);

        if (! $user->exists) {
            $user->fill([
                'username' => $this->uniqueUsername($googleUser->getName() ?? $googleUser->getEmail()),
                'password' => Str::password(),
                'email_verified_at' => now(),
                'avatar_url' => $googleUser->getAvatar(),
            ]);
        }

        $user->google_id = $googleUser->getId();

        $user->save();

        Auth::login($user);

        return redirect()->route('home');
    }

    private function uniqueUsername(string $name): string
    {
        $base = Str::lower(Str::ascii($name));
        $base = preg_replace('/[^a-z0-9]/', '', $base) ?: 'user';
        $candidate = $base;
        $suffix = 1;

        while (User::where('username', $candidate)->exists()) {
            $candidate = Str::substr($base, 0, 15 - Str::length((string) $suffix)).(string) $suffix;
            $suffix++;
        }

        return $candidate;
    }
}
