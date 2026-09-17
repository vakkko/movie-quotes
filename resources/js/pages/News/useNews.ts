import { usePage } from '@inertiajs/react';
import { useEcho, useEchoPublic } from '@laravel/echo-react';
import { useState } from 'react';
import type {
    MovieCreated,
    MovieOption,
    NewsProps,
    Quote,
    QuoteCreated,
} from './types';

const toMovieOption = (movie: MovieCreated['movie']): MovieOption => ({
    id: movie.id,
    title: movie.title,
});

const toQuote = (quote: QuoteCreated['quote'], locale: string): Quote => ({
    id: quote.id,
    quote: locale === 'ka' ? quote.quote_ka : quote.quote_en,
    image_url: quote.image_url,
    created_at: quote.created_at,
    user: quote.user,
    movie: {
        id: quote.movie.id,
        title: locale === 'ka' ? quote.movie.title_ka : quote.movie.title_en,
        director:
            locale === 'ka' ? quote.movie.director_ka : quote.movie.director_en,
        released_at: quote.movie.released_at,
    },
    comments: quote.comments,
    likes_count: quote.likes_count,
    comments_count: quote.comments_count,
    is_liked: quote.is_liked,
});

export const useNews = ({ movies, user }: NewsProps) => {
    const { props } = usePage();
    const locale = props.locale ?? 'en';

    const [liveQuotes, setLiveQuotes] = useState<Quote[]>([]);
    const [liveMovies, setLiveMovies] = useState(movies);
    const [prevMovies, setPrevMovies] = useState(movies);

    if (prevMovies !== movies) {
        setPrevMovies(movies);
        setLiveMovies(movies);
    }

    useEchoPublic<QuoteCreated>('news', '.QuoteCreated', (payload) => {
        setLiveQuotes((previous) =>
            previous.some((quote) => quote.id === payload.quote.id)
                ? previous
                : [toQuote(payload.quote, locale), ...previous],
        );
    });

    useEcho<MovieCreated>(
        `App.Models.User.${user?.id}`,
        '.MovieCreated',
        (payload) => {
            setLiveMovies((previous) =>
                previous.some((movie) => movie.id === payload.movie.id)
                    ? previous
                    : [toMovieOption(payload.movie), ...previous],
            );
        },
    );

    const liveQuoteIds = new Set(liveQuotes.map((quote) => quote.id));

    return { liveQuotes, liveMovies, liveQuoteIds };
};
