import { useState } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import { useTranslation } from '@/hooks/useTranslation';
import AddMovie from '../../../../components/AddMovieOrQuote/AddMovie/AddMovie';

type MoviesListHeadingProps = {
    total: number;
};

const MoviesListHeading = ({ total }: MoviesListHeadingProps) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);

    return (
        <div className="flex-items-center w-full justify-between">
            <h2 className="font-500-size-24">
                My list of movies (total {total})
            </h2>
            <div className="flex-items-center gap-[4rem]">
                <SearchBar
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    placeholder={t('search_placeholder_movies')}
                />
                <AddMovie
                    open={isAddMovieOpen}
                    onOpenChange={setIsAddMovieOpen}
                />
            </div>
        </div>
    );
};

export default MoviesListHeading;
