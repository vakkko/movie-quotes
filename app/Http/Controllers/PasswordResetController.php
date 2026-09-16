<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class PasswordResetController extends Controller
{
    public function send(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
        ]);

        $user = User::where('email', $request->email)->first();

        $user?->notify(new ResetPasswordNotification);

        return back()->with('verification_sent', true);
    }

    public function __invoke(Request $request, int $id, string $hash): RedirectResponse
    {
        if (! $request->hasValidSignature()) {
            return redirect()->route('home')->with('verify_expired', true);
        }

        $user = User::findOrFail($id);

        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return redirect()->route('home')->with('verify_expired', true);
        }

        return redirect()->route('home')->with('verified_user', [
            'id' => $user->id,
            'email' => $user->email,
        ]);
    }
}
