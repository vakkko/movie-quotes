import { createInertiaApp } from '@inertiajs/react';
import { configureEcho } from '@laravel/echo-react';
import type { SharedPageProps } from '@/types/global';

configureEcho({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: import.meta.env.VITE_PUSHER_SCHEME === 'https',
});

createInertiaApp({
    title: (title, page) => {
        const appName = (page.props as unknown as SharedPageProps).name;

        return title ? `${title} - ${appName}` : appName;
    },
    progress: {
        color: '#4B5563',
    },
});
