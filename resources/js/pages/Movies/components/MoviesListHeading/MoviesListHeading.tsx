import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useTranslation } from '@/hooks/useTranslation';
import MovieForm from '../../../../components/AddMovieOrQuote/AddMovie/MovieForm';

type MoviesListHeadingProps = {
    total: number;
};

const MoviesListHeading = ({ total }: MoviesListHeadingProps) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 639 });

    return (
        <div className="grid w-full grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_auto]">
            <h2 className="col-span-2 font-500-size-24 md:col-span-1">
                My list of movies (total {total})
            </h2>
            {!isMobile && (
                <SearchBar
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    placeholder={t('search_placeholder_movies')}
                />
            )}
            <MovieForm open={isAddMovieOpen} onOpenChange={setIsAddMovieOpen} />
        </div>
    );
};

export default MoviesListHeading;
