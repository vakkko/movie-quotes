import { usePage } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { useState } from 'react';
import type { Movie } from '@/types';
import type { MovieCreated } from '../News/types';

export type MovieListItem = Movie & {
    quotes_count: number;
};

type MoviesCollection = {
    data: MovieListItem[];
};

type UseMoviesOptions = {
    movies: MoviesCollection;
};

const publishedMovieToMovie = (
    movie: MovieCreated['movie'],
): MovieListItem => ({
    id: movie.id,
    title: movie.title,
    released_at: movie.released_at,
    image_url: movie.image_url,
    genres: movie.genres,
    description: movie.description,
    director: movie.director,
    quotes_count: movie.quotes_count,
});

const useMovies = ({ movies }: UseMoviesOptions) => {
    const { props } = usePage();

    const [liveMovies, setLiveMovies] = useState<MovieListItem[]>([]);
    const [removedMovieIds, setRemovedMovieIds] = useState<Set<number>>(
        () => new Set(),
    );

    useEcho<MovieCreated>(
        `App.Models.User.${props.user?.id}`,
        '.MovieCreated',
        (payload) => {
            setLiveMovies((previous) =>
                previous.some((movie) => movie.id === payload.movie.id)
                    ? previous
                    : [publishedMovieToMovie(payload.movie), ...previous],
            );
        },
    );

    useEcho<{ movie_id: number }>(
        `App.Models.User.${props.user?.id}`,
        '.MovieDeleted',
        (payload) => {
            setLiveMovies((previous) =>
                previous.filter((movie) => movie.id !== payload.movie_id),
            );
            setRemovedMovieIds((previous) => {
                if (previous.has(payload.movie_id)) {
                    return previous;
                }

                const next = new Set(previous);

                next.add(payload.movie_id);

                return next;
            });
        },
    );

    const liveMovieIds = new Set(liveMovies.map((movie) => movie.id));

    const combined: MoviesCollection = {
        data: [
            ...liveMovies,
            ...movies.data.filter(
                (movie) =>
                    !liveMovieIds.has(movie.id) &&
                    !removedMovieIds.has(movie.id),
            ),
        ],
    };

    return combined;
};

export default useMovies;
