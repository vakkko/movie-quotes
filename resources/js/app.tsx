import { createInertiaApp } from '@inertiajs/react';
import { configureEcho } from '@laravel/echo-react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

configureEcho({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: import.meta.env.VITE_PUSHER_SCHEME === 'https',
});

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#4B5563',
    },
});
