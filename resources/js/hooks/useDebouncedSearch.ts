import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const SEARCH_DEBOUNCE_MS = 500;

type UseDebouncedSearchProps = {
    getUrl: (search: string) => string;
    only: string[];
    reset: string[];
};

export function useDebouncedSearch(
    initialSearch: string = '',
    { getUrl, only, reset }: UseDebouncedSearchProps,
) {
    const [search, setSearch] = useState(initialSearch);
    const previousSearch = useRef(initialSearch);

    useEffect(() => {
        if (search === previousSearch.current) {
            return;
        }

        previousSearch.current = search;

        const timeout = window.setTimeout(() => {
            router.get(
                getUrl(search),
                {},
                {
                    preserveScroll: true,
                    preserveState: true,
                    replace: true,
                    only,
                    reset,
                },
            );
        }, SEARCH_DEBOUNCE_MS);

        return () => window.clearTimeout(timeout);
    }, [search, getUrl, only, reset]);

    return { search, setSearch };
}
