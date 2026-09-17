import { ArrowLeft, Search } from 'lucide-react';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { useTranslation } from '@/hooks/useTranslation';

type SearchMobileProps = {
    setIsExpanded: (value: boolean) => void;
    isExpanded: boolean;
    searchInput: JSX.Element;
};

const SearchMobile = ({
    setIsExpanded,
    isExpanded,
    searchInput,
}: SearchMobileProps) => {
    const { t } = useTranslation();

    return (
        <>
            <Button
                onClick={() => setIsExpanded(true)}
                className="flex-items-center gap-2 text-[2rem] text-silver-gray hover:text-foreground"
            >
                <Search className="size-11" />
            </Button>
            <Sheet open={isExpanded} onOpenChange={setIsExpanded}>
                <SheetContent
                    side="top"
                    className="h-[30vh] border-none bg-soft-navy px-[1.6rem] pt-[2rem] text-white [&>button]:hidden"
                >
                    <div className="flex-items-center gap-[1.6rem] border-b border-b-cloud-gray pb-[1.3rem] text-white">
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            aria-label={t('back')}
                        >
                            <ArrowLeft className="size-8" />
                        </button>
                        <SheetTitle className="font-500 text-[2rem] text-white">
                            {t('search_by')}
                        </SheetTitle>
                    </div>
                    {searchInput}
                </SheetContent>
            </Sheet>
            ;
        </>
    );
};

export default SearchMobile;
