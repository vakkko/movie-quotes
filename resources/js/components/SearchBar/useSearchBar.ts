import { usePage } from '@inertiajs/react';
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import { news } from '@/routes';

export function useSearchBar() {
    const { url } = usePage();

    const initialSearch =
        new URLSearchParams(url.split('?')[1] ?? '').get('search') ?? '';

    const { search, setSearch } = useDebouncedSearch(initialSearch, {
        getUrl: (search) => news.url({ query: search ? { search } : {} }),
        only: ['quotes'],
        reset: ['quotes'],
    });

    return { search, setSearch };
}
