import { useTranslation } from '@/hooks/useTranslation';
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
    const { t } = useTranslation();
    const combined = useMovies({ movies });
    const hasMovies = combined.data.length > 0;

    return (
        <div className="flex-column w-full gap-[6.6rem]">
            <MoviesListHeading total={combined.data.length} />
            {hasMovies ? (
                <MoviesList movies={combined} />
            ) : (
                <div className="rounded-[1.2rem] bg-deep-navy p-[2.4rem] text-white">
                    <p className="text-[2rem]">{t('no_movies_yet')}</p>
                </div>
            )}
        </div>
    );
};

Movies.layout = (page: React.ReactNode) => (
    <DefaultLayout>{page}</DefaultLayout>
);

export default Movies;
