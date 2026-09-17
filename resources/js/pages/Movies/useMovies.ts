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

    const liveMovieIds = new Set(liveMovies.map((movie) => movie.id));

    const combined: MoviesCollection = {
        data: [
            ...liveMovies,
            ...movies.data.filter((movie) => !liveMovieIds.has(movie.id)),
        ],
    };

    return combined;
};

export default useMovies;
