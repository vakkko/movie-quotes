<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuoteCommentRequest;
use App\Http\Requests\StoreQuoteRequest;
use App\Http\Requests\UpdateQuoteRequest;
use App\Http\Resources\QuoteResource;
use App\Models\Quote;
use App\Services\NewsControllerService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class NewsController extends Controller
{
    public function __construct(
        private NewsControllerService $newsService
    ) {}

    public function index(Request $request)
    {
        if (! Auth::check()) {
            abort(403);
        }

        $quotes = $this->newsService->getQuotesPaginated($request);
        $movies = $this->newsService->getMoviesForUser(Auth::user());

        return Inertia::render('News/News', [
            'quotes' => Inertia::scroll(QuoteResource::collection($quotes)),
            'movies' => $movies,
        ]);
    }

    public function show(Quote $quote): JsonResponse
    {
        $quote = $this->newsService->getQuoteDetails($quote);

        $data = (new QuoteResource($quote))->resolve();

        $rawQuote = json_decode($quote->getRawOriginal('quote'), true);
        unset($data['quote']);
        $data['quote_en'] = $rawQuote['en'] ?? null;
        $data['quote_ka'] = $rawQuote['ka'] ?? null;

        return response()->json($data);
    }

    public function update(UpdateQuoteRequest $request, Quote $quote): RedirectResponse|JsonResponse
    {
        if (! Auth::check()) {
            abort(403);
        }

        $quote = $this->newsService->updateQuote(
            $quote,
            $request->validated(),
            $request->file('image')
        );

        if ($request->expectsJson()) {
            return response()->json([
                'id' => $quote->id,
                'quote_en' => $quote->getTranslation('quote', 'en'),
                'quote_ka' => $quote->getTranslation('quote', 'ka'),
                'image_url' => $quote->image_url,
            ]);
        }

        return back();
    }

    public function destroy(Quote $quote): RedirectResponse|JsonResponse
    {
        if ($quote->user_id !== Auth::id()) {
            abort(403);
        }

        $this->newsService->deleteQuote($quote);

        if (request()->expectsJson()) {
            return response()->json(['message' => 'Quote deleted successfully']);
        }

        return back();
    }

    public function store(StoreQuoteRequest $request): RedirectResponse
    {
        if (! Auth::check()) {
            abort(403);
        }

        $this->newsService->createQuote(
            Auth::user(),
            $request->validated(),
            $request->file('image')
        );

        return redirect()->route('news');
    }

    public function storeComment(
        StoreQuoteCommentRequest $request,
        Quote $quote,
    ): RedirectResponse|JsonResponse {
        if (! Auth::check()) {
            abort(403);
        }

        $comment = $this->newsService->addComment(
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
                        'avatar' => Auth::user()->avatar_url,
                    ],
                ],
            ], 201);
        }

        return back();
    }

    public function toggleLike(Quote $quote): RedirectResponse
    {
        if (! Auth::check()) {
            abort(403);
        }

        $this->newsService->toggleLike(Auth::user(), $quote);

        return back();
    }
}
