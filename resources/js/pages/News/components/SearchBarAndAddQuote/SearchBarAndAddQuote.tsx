import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import SearchBar from '@/components/SearchBar/SearchBar';
import AddQuote from './component/AddQuote';

type MovieOption = {
    id: number;
    title: string;
};

type SearchBarAndAddQuoteProps = {
    movies: MovieOption[];
};

const SearchBarAndAddQuote = ({ movies }: SearchBarAndAddQuoteProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 639 });

    return (
        <div className="mb-[2.2rem] flex w-full justify-between gap-[2.4rem] max-xl:flex-column">
            <AddQuote isExpanded={isExpanded} movies={movies} />
            {!isMobile && (
                <SearchBar
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                />
            )}
        </div>
    );
};

export default SearchBarAndAddQuote;
