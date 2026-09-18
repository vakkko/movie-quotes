import DefaultLayout from '@/layouts/DefaultLayout';
import type { Movie } from '@/types';
import MoviesList from './components/MoviesList';
import MoviesListHeading from './components/MoviesListHeading/MoviesListHeading';
import useMovies from './useMovies';

type MoviesProps = {
    movies: {
        data: (Movie & { quotes_count: number })[];
    };
};

const Movies = ({ movies }: MoviesProps) => {
    const combined = useMovies({ movies });

    return (
        <div className="flex-column w-full gap-[6.6rem]">
            <MoviesListHeading total={combined.data.length} />
            <MoviesList movies={combined} />
        </div>
    );
};

Movies.layout = (page: React.ReactNode) => (
    <DefaultLayout>{page}</DefaultLayout>
);

export default Movies;
