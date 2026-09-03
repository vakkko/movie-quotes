import { usePage } from '@inertiajs/react';

import type { SharedPageProps } from '@/types/global';

export function useTranslation(): { t: (key: string) => string } {
    const { props } = usePage<SharedPageProps>();

    const translations = props.translations ?? {};

    const t = (key: string): string => translations[key] ?? key;

    return { t };
}
