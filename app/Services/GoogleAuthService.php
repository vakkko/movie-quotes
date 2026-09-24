<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Str;
use Laravel\Socialite\Two\User as SocialiteUser;
use Throwable;

class GoogleAuthService
{
    public function findOrCreateFromGoogle(SocialiteUser $googleUser): User
    {
        $user = User::firstOrNew(['email' => $googleUser->getEmail()]);

        if (! $user->exists) {
            $user->fill([
                'username' => $this->uniqueUsername($googleUser->getName() ?? $googleUser->getEmail()),
                'password' => Str::password(),
                'email_verified_at' => now(),
            ]);
        }

        $user->google_id = $googleUser->getId();

        $user->save();

        if ($user->wasRecentlyCreated && $googleUser->getAvatar() !== null) {
            $this->storeGoogleAvatar($user, $googleUser->getAvatar());
        }

        return $user;
    }

    private function storeGoogleAvatar(User $user, string $url): void
    {
        try {
            $user->addMediaFromUrl($url)->toMediaCollection('avatar');
        } catch (Throwable) {
            return;
        }
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
