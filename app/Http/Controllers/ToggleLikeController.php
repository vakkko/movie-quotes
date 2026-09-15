<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use App\Services\QuoteLikeService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class ToggleLikeController extends Controller
{
    public function __construct(
        private QuoteLikeService $likeService
    ) {}

    public function __invoke(Quote $quote): RedirectResponse
    {
        if (! Auth::check()) {
            abort(403);
        }

        $this->likeService->toggleLike(Auth::user(), $quote);

        return back();
    }
}
