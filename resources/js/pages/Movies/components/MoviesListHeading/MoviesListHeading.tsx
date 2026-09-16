import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import { useTranslation } from '@/hooks/useTranslation';
import { movies } from '@/routes';
import AddMovie from '../../../../components/AddMovieOrQuote/AddMovie/AddMovie';

type MoviesListHeadingProps = {
    total: number;
    initialSearch?: string;
};

const MoviesListHeading = ({
    total,
    initialSearch,
}: MoviesListHeadingProps) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
    const { search, setSearch } = useDebouncedSearch(initialSearch, {
        getUrl: (search) => movies.url({ query: search ? { search } : {} }),
        only: ['movies'],
        reset: ['movies'],
    });

    return (
        <div className="flex-items-center w-full justify-between">
            <h2 className="font-500-size-24">
                My list of movies (total {total})
            </h2>
            <div className="flex-items-center gap-[4rem]">
                <SearchBar
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    search={search}
                    setSearch={setSearch}
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
