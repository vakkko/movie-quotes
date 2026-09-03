<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $locale = app()->getLocale();

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'locale' => $locale,
            'translations' => $this->translations($locale),
            'auth' => [
                'user' => $request->user(),
            ],
            'verified' => fn () => session('verified', false),
            'verifyExpired' => fn () => session('verify_expired', false),
            'verificationSent' => fn () => session('verification_sent', false),
            'verifiedUser' => fn () => session('verified_user'),
            'passwordReset' => fn () => session('password_reset', false),
        ];
    }

    /**
     * The translation strings for the active locale.
     *
     * @return array<string, string>
     */
    private function translations(string $locale): array
    {
        $file = lang_path("{$locale}.php");

        return is_file($file) ? require $file : [];
    }
}
