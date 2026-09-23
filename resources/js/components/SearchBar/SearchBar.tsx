import { cn } from '@/lib/utils';
import SearchDesktop from './components/SearchDesktop';
import SearchInput from './components/SearchInput';
import SearchMobile from './components/SearchMobile';
import { useSearchBar } from './useSearchBar';

type SearchBarProps = {
    isExpanded: boolean;
    setIsExpanded: (value: boolean) => void;
    placeholder?: string;
    variant?: 'default' | 'header';
    className?: string;
};

const SearchBar = ({
    isExpanded,
    setIsExpanded,
    placeholder,
    variant = 'default',
    className,
}: SearchBarProps) => {
    const { search, setSearch } = useSearchBar();

    const isHeaderVariant = variant === 'header';

    const searchInput = (
        <SearchInput
            search={search}
            setSearch={setSearch}
            placeholder={placeholder}
        />
    );

    return (
        <div
            className={cn('flex-items-center', className, {
                'w-full': isExpanded,
            })}
        >
            {!isHeaderVariant ? (
                <SearchDesktop
                    isExpanded={isExpanded}
                    setIsExpanded={setIsExpanded}
                    search={search}
                    setSearch={setSearch}
                    placeholder={placeholder}
                />
            ) : (
                <SearchMobile
                    isExpanded={isExpanded}
                    searchInput={searchInput}
                    setIsExpanded={setIsExpanded}
                />
            )}
        </div>
    );
};

export default SearchBar;
