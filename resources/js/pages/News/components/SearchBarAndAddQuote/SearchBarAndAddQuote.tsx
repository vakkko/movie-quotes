import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import { news } from '@/routes';
import AddQuote from './component/AddQuote';

type MovieOption = {
    id: number;
    title: string;
};

const SearchBarAndAddQuote = ({
    initialSearch,
    movies,
}: {
    initialSearch?: string;
    movies: MovieOption[];
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { search, setSearch } = useDebouncedSearch(initialSearch, {
        getUrl: (search) => news.url({ query: search ? { search } : {} }),
        only: ['quotes'],
        reset: ['quotes'],
    });

    return (
        <div className="mb-[2.2rem] flex justify-between gap-[2.4rem]">
            <AddQuote isExpanded={isExpanded} movies={movies} />
            <SearchBar
                isExpanded={isExpanded}
                setIsExpanded={setIsExpanded}
                search={search}
                setSearch={setSearch}
            />
        </div>
    );
};

export default SearchBarAndAddQuote;
