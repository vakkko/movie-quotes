import { InfiniteScroll } from '@inertiajs/react';
import DefaultLayout from '@/layouts/DefaultLayout';
import NoSearchResults from './components/NoSearchResults';
import QuoteCard from './components/Quotes/QuoteCard';
import SearchBarAndAddQuote from './components/SearchBarAndAddQuote/SearchBarAndAddQuote';
import type { NewsProps } from './types';
import { useNews } from './useNews';

const News = ({ quotes, movies, user }: NewsProps) => {
    const { liveQuotes, liveMovies, liveQuoteIds } = useNews({
        quotes,
        movies,
        user,
    });

    const hasSearchResults =
        liveQuotes.length > 0 ||
        quotes.data.some((quote) => !liveQuoteIds.has(quote.id));

    return (
        <div className="mx-auto">
            <SearchBarAndAddQuote movies={liveMovies} />
            {liveQuotes.map((quote) => (
                <QuoteCard quote={quote} user={user} key={quote.id} />
            ))}
            <InfiniteScroll className="w-fit" data="quotes">
                {quotes.data
                    .filter((quote) => !liveQuoteIds.has(quote.id))
                    .map((quote) => (
                        <QuoteCard quote={quote} user={user} key={quote.id} />
                    ))}
            </InfiniteScroll>
            {!hasSearchResults && <NoSearchResults />}
        </div>
    );
};

News.layout = (page: React.ReactNode) => (
    <DefaultLayout className="ml-[7rem] max-xl:gap-[7rem] max-lg:ml-0 max-lg:pr-0 max-sm:!pr-0">
        {page}
    </DefaultLayout>
);

export default News;
