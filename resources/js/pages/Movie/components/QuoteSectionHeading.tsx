import { Minus, Plus } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import type { Movie } from '@/types';
import AddQuote from '../../News/components/SearchBarAndAddQuote/component/AddQuote';

type QuoteSectionHeadingProps = {
    quotesCount: number;
    movie: Omit<Movie, 'description'>;
};

const QuoteSectionHeading = ({
    quotesCount,
    movie,
}: QuoteSectionHeadingProps) => {
    const { t } = useTranslation();

    return (
        <div className="mt-[4rem] mb-[6rem] flex-items-center gap-[1.6rem]">
            <p className="text-[2rem]">
                {t('quotes')} ({t('total')} {quotesCount})
            </p>
            <Minus className="h-full w-auto rotate-90" color="#6c757d" />
            <AddQuote
                isExpanded={true}
                triggerText={t('add_quote')}
                triggerIcon={<Plus />}
                movies={[]}
                movie={movie}
                modalTitle={t('add_quote')}
                addQuoteFromMoviePage
            />
        </div>
    );
};

export default QuoteSectionHeading;
