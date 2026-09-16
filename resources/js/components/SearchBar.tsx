import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

type SearchBarProps = {
    isExpanded: boolean;
    setIsExpanded: (value: boolean) => void;
    search: string;
    setSearch: (value: string) => void;
    placeholder?: string;
};

const SearchBar = ({
    isExpanded,
    setIsExpanded,
    search,
    setSearch,
    placeholder,
}: SearchBarProps) => {
    const { t } = useTranslation();

    return (
        <div
            className={cn('flex-items-center', {
                'w-[68rem]': isExpanded,
            })}
        >
            {!isExpanded ? (
                <Button
                    onClick={() => setIsExpanded(true)}
                    className="flex-items-center gap-2 text-[2rem] text-silver-gray hover:text-foreground"
                >
                    <Search className="size-8" />
                    <span>{t('search_by')}</span>
                </Button>
            ) : (
                <div className="relative w-full border-b border-b-cloud-gray pb-[1.3rem]">
                    <Search className="absolute left-3 size-8 text-muted-foreground" />
                    <Input
                        autoFocus
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onBlur={() => setIsExpanded(false)}
                        placeholder={placeholder ?? t('search_placeholder')}
                        className="ml-[2rem] rounded-none border-b border-none !bg-transparent pl-9 !text-[2rem] placeholder:text-[2rem] focus-visible:border-primary focus-visible:ring-0"
                    />
                </div>
            )}
        </div>
    );
};

export default SearchBar;
