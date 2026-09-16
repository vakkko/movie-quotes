import { InfiniteScroll, Link } from '@inertiajs/react';
import Quote from '@/components/svgs/Quote';
import type { Movie } from '@/types';

type moviesTypes = Movie & {
    quotes_count: number;
};

type MoviesListProps = {
    movies: {
        data: moviesTypes[];
    };
};

const MoviesList = ({ movies }: MoviesListProps) => {
    return (
        <InfiniteScroll data="movies">
            <div className="grid cursor-pointer grid-cols-3 gap-[5rem]">
                {movies.data.map((movie) => (
                    <Link
                        href={`/movies/${String(movie.id)}`}
                        className="flex-column gap-[1.6rem]"
                        key={movie.id}
                    >
                        <img
                            className="h-[37rem] w-[44rem] rounded-[1.2rem]"
                            src={movie.image_url}
                            alt={movie.title}
                        />
                        <div className="flex-column gap-[1.6rem]">
                            <h3 className="font-500-size-24 uppercase">
                                {movie.title} ({movie.released_at})
                            </h3>
                            <div className="flex-items-center gap-[0.8rem]">
                                <span className="font-500-size-20 leading-[150%]">
                                    {movie.quotes_count}
                                </span>
                                <Quote />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default MoviesList;
