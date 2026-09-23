import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';

type SearchInputProps = {
    search: string;
    setSearch: (value: string) => void;
    placeholder?: string;
};

const SearchInput = ({ search, setSearch, placeholder }: SearchInputProps) => {
    const { t } = useTranslation();

    return (
        <Input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder ?? t('search_placeholder')}
            className="mt-[1.6rem] rounded-none border-none !bg-transparent !text-[2rem] placeholder:text-[2rem] focus-visible:ring-0"
        />
    );
};

export default SearchInput;
