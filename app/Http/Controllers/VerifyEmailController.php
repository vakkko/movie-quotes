<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Notifications\EmailChangeNotification;
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

        if ($user->pending_email) {
            return $this->verifyPendingEmail($request, $user, $hash);
        }

        if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
            return redirect()->route('home')->with('verify_expired', true);
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        if (! $user->password) {
            return redirect()->route('home')->with('verified_user', [
                'id' => $user->id,
                'email' => $user->email,
            ]);
        }

        return redirect()->route('home')->with('verification_sent', true);
    }

    private function verifyPendingEmail(Request $request, User $user, string $hash): RedirectResponse
    {
        if (! hash_equals((string) $hash, sha1($user->pending_email))) {
            return redirect()->route('home')->with('verify_expired', true);
        }

        $user->update([
            'email' => $user->pending_email,
        ]);

        event(new Verified($user));

        return redirect()->route('home')
            ->with('verification_sent', true);

    }

    public function resend(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => ['nullable', 'email'],
        ]);

        $email = $request->email ?: $request->user()?->email;

        $user = $email ? User::where('pending_email', $email)->orWhere('email', $email)->first() : null;

        if ($user) {
            if ($user->pending_email === $email) {
                $user->notify(new EmailChangeNotification);
            } else {
                $user->sendEmailVerificationNotification();
            }
        }

        return back()->with('verification_sent', true);
    }
}
