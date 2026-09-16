<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuoteCommentRequest;
use App\Models\Quote;
use App\Services\QuoteCommentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class StoreCommentController extends Controller
{
    public function __construct(
        private QuoteCommentService $commentService
    ) {}

    public function storeComment(
        StoreQuoteCommentRequest $request,
        Quote $quote,
    ): RedirectResponse|JsonResponse {
        $comment = $this->commentService->addComment(
            Auth::user(),
            $quote,
            $request->input('body')
        );

        if ($request->expectsJson()) {
            return response()->json([
                'comment' => [
                    'id' => $comment->id,
                    'body' => $comment->body,
                    'created_at' => $comment->created_at,
                    'user' => [
                        'id' => Auth::id(),
                        'username' => Auth::user()->username,
                        'avatar_url' => Auth::user()->avatar_url,
                    ],
                ],
            ], 201);
        }

        return back();
    }
}
