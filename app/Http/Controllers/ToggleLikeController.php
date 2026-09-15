<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use App\Services\QuoteLikeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ToggleLikeController extends Controller
{
    public function __construct(
        private QuoteLikeService $likeService
    ) {}

    public function __invoke(Request $request, Quote $quote): RedirectResponse|JsonResponse
    {
        if (! Auth::check()) {
            abort(403);
        }

        $result = $this->likeService->toggleLike(Auth::user(), $quote);

        if ($request->expectsJson()) {
            return response()->json([
                'is_liked' => $result === 'liked',
                'likes_count' => $quote->likes()->count(),
            ]);
        }

        return back();
    }
}
