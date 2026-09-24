import { InfiniteScroll } from '@inertiajs/react';
import DefaultLayout from '@/layouts/DefaultLayout';
import { cn } from '@/lib/utils';
import NoSearchResults from './components/NoSearchResults';
import QuoteCard from './components/Quotes/QuoteCard';
import SearchBarAndAddQuote from './components/SearchBarAndAddQuote/SearchBarAndAddQuote';
import type { NewsProps } from './types';
import { useNews } from './useNews';

const News = ({ quotes, movies, user }: NewsProps) => {
    const { liveQuotes, liveMovies, liveQuoteIds, removedQuoteIds } = useNews({
        quotes,
        movies,
        user,
    });

    const visibleLiveQuotes = liveQuotes.filter(
        (quote) => !removedQuoteIds.has(quote.id),
    );
    const visibleServerQuotes = quotes.data.filter(
        (quote) =>
            !removedQuoteIds.has(quote.id) && !liveQuoteIds.has(quote.id),
    );

    const hasSearchResults =
        visibleLiveQuotes.length > 0 || visibleServerQuotes.length > 0;

    return (
        <div
            className={cn('mx-auto', {
                'w-356': !hasSearchResults,
            })}
        >
            <SearchBarAndAddQuote movies={liveMovies} />
            {visibleLiveQuotes.map((quote) => (
                <QuoteCard quote={quote} user={user} key={quote.id} />
            ))}
            <InfiniteScroll className="w-fit" data="quotes">
                {visibleServerQuotes.map((quote) => (
                    <QuoteCard quote={quote} user={user} key={quote.id} />
                ))}
            </InfiniteScroll>
            {!hasSearchResults && <NoSearchResults />}
        </div>
    );
};

News.layout = (page: React.ReactNode) => (
    <DefaultLayout className="max-xl:gap-28 max-lg:ml-0 max-lg:pr-0 max-sm:pr-0!">
        {page}
    </DefaultLayout>
);

export default News;
