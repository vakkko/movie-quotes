<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Models\User;
use App\Notifications\EmailChangeNotification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Profile/Profile', [
            'user' => Auth::user(),
        ]);
    }

    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        $user = Auth::user();

        if ($request->filled('username')) {
            $user->update(['username' => $request->input('username')]);
        }

        if (! $user->google_id && $request->filled('email') && $request->input('email') !== $user->email) {
            $user->update(['pending_email' => $request->input('email')]);

            $user->notify(new EmailChangeNotification);
        }

        if (! $user->google_id && $request->filled('password')) {
            $user->update(['password' => $request->input('password')]);
        }

        if ($request->hasFile('avatar')) {
            $this->replaceAvatar($user, $request->file('avatar'));
        }

        return back();
    }

    private function replaceAvatar(User $user, UploadedFile $file): void
    {
        $user->clearMediaCollection('avatar')->addMedia($file)->toMediaCollection('avatar');
    }
}
