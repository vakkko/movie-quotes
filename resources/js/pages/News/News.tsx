import { InfiniteScroll, usePage } from '@inertiajs/react';
import DefaultLayout from '@/layouts/DefaultLayout';
import QuoteCard from './components/Quotes/QuoteCard';
import SearchBarAndAddQuote from './components/SearchBarAndAddQuote/SearchBarAndAddQuote';
import type { NewsProps } from './types';

const News = ({ quotes, movies, user }: NewsProps) => {
    const { url } = usePage();
    const initialSearch =
        new URLSearchParams(url.split('?')[1] ?? '').get('search') ?? '';

    return (
        <>
            <div className="mx-auto">
                <SearchBarAndAddQuote
                    initialSearch={initialSearch}
                    movies={movies}
                />
                <InfiniteScroll className="w-fit" data="quotes">
                    {quotes.data.map((quote) => (
                        <QuoteCard quote={quote} user={user} key={quote.id} />
                    ))}
                </InfiniteScroll>
            </div>
        </>
    );
};

News.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

export default News;
