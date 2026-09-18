import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import SearchDesktop from './components/SearchDesktop';
import SearchMobile from './components/SearchMobile';
import { useSearchBar } from './useSearchBar';

type SearchBarProps = {
    isExpanded: boolean;
    setIsExpanded: (value: boolean) => void;
    placeholder?: string;
    variant?: 'default' | 'header';
};

const SearchBar = ({
    isExpanded,
    setIsExpanded,
    placeholder,
    variant = 'default',
}: SearchBarProps) => {
    const { t } = useTranslation();
    const { search, setSearch } = useSearchBar();

    const isHeaderVariant = variant === 'header';

    const searchInput = (
        <Input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder ?? t('search_placeholder')}
            className="mt-[1.6rem] rounded-none border-none !bg-transparent !text-[2rem] placeholder:text-[2rem] focus-visible:ring-0"
        />
    );

    return (
        <div
            className={cn('flex-items-center', {
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
