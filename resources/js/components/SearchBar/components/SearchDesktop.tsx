import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';

type SearchDesktopProps = {
    isExpanded: boolean;
    setIsExpanded: (value: boolean) => void;
    search: string;
    setSearch: (value: string) => void;
    placeholder?: string;
};

const SearchDesktop = ({
    isExpanded,
    setIsExpanded,
    search,
    setSearch,
    placeholder,
}: SearchDesktopProps) => {
    const { t } = useTranslation();

    if (!isExpanded) {
        return (
            <Button
                onClick={() => setIsExpanded(true)}
                className="flex-items-center gap-2 text-[2rem] text-silver-gray hover:text-foreground"
            >
                <Search className="size-8" />
                <span>{t('search_by')}</span>
            </Button>
        );
    }

    return (
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
    );
};

export default SearchDesktop;
