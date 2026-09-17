<?php

namespace App\Http\Controllers;

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
use Inertia\Response;

class NewsController extends Controller
{
    public function __construct(
        private NewsControllerService $newsService
    ) {}

    public function index(Request $request): Response
    {
        $quotes = $this->newsService->getQuotesPaginated($request);
        $movies = $this->newsService->getMoviesForUser(Auth::user());

        return Inertia::render('News/News', [
            'quotes' => Inertia::scroll(QuoteResource::collection($quotes)),
            'movies' => $movies,
        ]);
    }

    public function show(Request $request, Quote $quote): Response
    {
        $this->authorize('view', $quote);

        $quote = $this->newsService->getQuoteDetails($quote);

        $data = (new QuoteResource($quote))->resolve();

        $rawQuote = json_decode($quote->getRawOriginal('quote'), true);
        unset($data['quote']);
        $data['quote_en'] = $rawQuote['en'] ?? null;
        $data['quote_ka'] = $rawQuote['ka'] ?? null;

        return Inertia::render('Quote/Quote', [
            'quote' => $data,
            'editing' => (bool) $request->boolean('edit'),
        ]);
    }

    public function update(UpdateQuoteRequest $request, Quote $quote): RedirectResponse|JsonResponse
    {
        $this->authorize('update', $quote);

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
                'image_url' => $quote->getFirstMediaUrl('image'),
            ]);
        }

        return back();
    }

    public function destroy(Quote $quote): RedirectResponse|JsonResponse
    {
        $this->authorize('delete', $quote);

        $this->newsService->deleteQuote($quote);

        if (request()->expectsJson()) {
            return response()->json(['message' => 'Quote deleted successfully']);
        }

        return back();
    }

    public function store(StoreQuoteRequest $request): RedirectResponse
    {
        $this->newsService->createQuote(
            Auth::user(),
            $request->validated(),
            $request->file('image')
        );

        return redirect()->route('news');
    }
}
