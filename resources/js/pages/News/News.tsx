import { InfiniteScroll, usePage } from '@inertiajs/react';
import { useEcho, useEchoPublic } from '@laravel/echo-react';
import { useState } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import QuoteCard from './components/Quotes/QuoteCard';
import SearchBarAndAddQuote from './components/SearchBarAndAddQuote/SearchBarAndAddQuote';
import type { MovieCreated, NewsProps, Quote, QuoteCreated } from './types';

const News = ({ quotes, movies, user }: NewsProps) => {
    const { url, props } = usePage();
    const locale = props.locale ?? 'en';
    const initialSearch =
        new URLSearchParams(url.split('?')[1] ?? '').get('search') ?? '';

    const [liveQuotes, setLiveQuotes] = useState<Quote[]>([]);
    const [liveMovies, setLiveMovies] = useState<typeof movies>(movies);
    const [prevMovies, setPrevMovies] = useState(movies);

    if (prevMovies !== movies) {
        setPrevMovies(movies);
        setLiveMovies(movies);
    }

    const publishedMovieToOption = (movie: MovieCreated['movie']) => ({
        id: movie.id,
        title: movie.title,
    });

    const publishedQuoteToQuote = (quote: QuoteCreated['quote']): Quote => ({
        id: quote.id,
        quote: locale === 'ka' ? quote.quote_ka : quote.quote_en,
        image_url: quote.image_url,
        created_at: quote.created_at,
        user: quote.user,
        movie: {
            id: quote.movie.id,
            title:
                locale === 'ka' ? quote.movie.title_ka : quote.movie.title_en,
            director:
                locale === 'ka'
                    ? quote.movie.director_ka
                    : quote.movie.director_en,
            released_at: quote.movie.released_at,
        },
        comments: quote.comments,
        likes_count: quote.likes_count,
        comments_count: quote.comments_count,
        is_liked: quote.is_liked,
    });

    useEchoPublic<QuoteCreated>('news', '.QuoteCreated', (payload) => {
        setLiveQuotes((previous) =>
            previous.some((quote) => quote.id === payload.quote.id)
                ? previous
                : [publishedQuoteToQuote(payload.quote), ...previous],
        );
    });

    useEcho<MovieCreated>(
        `App.Models.User.${user?.id}`,
        '.MovieCreated',
        (payload) => {
            setLiveMovies((previous) =>
                previous.some((movie) => movie.id === payload.movie.id)
                    ? previous
                    : [publishedMovieToOption(payload.movie), ...previous],
            );
        },
    );

    const liveQuoteIds = new Set(liveQuotes.map((quote) => quote.id));

    return (
        <>
            <div className="mx-auto">
                <SearchBarAndAddQuote
                    initialSearch={initialSearch}
                    movies={liveMovies}
                />
                {liveQuotes.map((quote) => (
                    <QuoteCard quote={quote} user={user} key={quote.id} />
                ))}
                <InfiniteScroll className="w-fit" data="quotes">
                    {quotes.data
                        .filter((quote) => !liveQuoteIds.has(quote.id))
                        .map((quote) => (
                            <QuoteCard
                                quote={quote}
                                user={user}
                                key={quote.id}
                            />
                        ))}
                </InfiniteScroll>
            </div>
        </>
    );
};

News.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

export default News;
