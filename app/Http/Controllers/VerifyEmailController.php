<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VerifyEmailController extends Controller
{
    public function __invoke(Request $request, int $id, string $hash): RedirectResponse
    {
        if (! $request->hasValidSignature()) {
            return redirect()->route('home')->with('verify_expired', true);
        }

        $user = User::findOrFail($id);

        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return redirect()->route('home')->with('verify_expired', true);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect()->route('home')->with('verified_user', [
            'id' => $user->id,
            'email' => $user->email,
        ]);
    }

    public function resend(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            $user->sendEmailVerificationNotification();
        }

        return back()->with('verification_sent', true);
    }
}
