<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreForgotPasswordRequest;
use App\Http\Requests\StoreLoginRequest;
use App\Http\Requests\StoreRegisterRequest;
use App\Http\Requests\StoreResetPasswordRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    public function login(StoreLoginRequest $request): RedirectResponse
    {
        $credentials = $request->only('email', 'password');

        $user = User::where('email', $credentials['email'])->first();

        if ($user && ! $user->email_verified_at) {
            $request->session()->flash('unverified_email', true);
            $request->session()->flash('unverified_email_address', $user->email);

            return redirect()->route('home');
        }

        if (! Auth::attempt($credentials, $request->boolean('remember'))) {
            return back()->withErrors([
                'email' => "The current credentilas didn't match our records",
            ]);
        }

        $request->session()->regenerate();

        return redirect()->intended(route('news'));
    }

    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }

    public function register(StoreRegisterRequest $request): RedirectResponse
    {
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => $request->password,
        ]);

        Auth::login($user);

        $user->sendEmailVerificationNotification();

        return redirect()->route('home');
    }

    public function forgot(StoreForgotPasswordRequest $request): RedirectResponse
    {
        $status = Password::sendResetLink(
            $request->only('email'),
        );

        return $status === Password::ResetLinkSent
            ? back()->with('status', __($status))
            : back()->withErrors(['email' => __($status)]);
    }

    public function resetPassword(StoreResetPasswordRequest $request): RedirectResponse
    {
        $user = User::where('email', $request->email)->firstOrFail();

        $user->update(['password' => $request->password]);

        return redirect()->route('home')->with('password_reset', true);
    }
}
