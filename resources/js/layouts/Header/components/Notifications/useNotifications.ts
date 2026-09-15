import { router, useHttp } from '@inertiajs/react';
import { useState } from 'react';
import {
    show as showQuoteRoute,
} from '@/routes/news/quotes';
import {
    read as markNotificationAsRead,
    readAll as markAllNotificationsAsRead,
} from '@/routes/notifications';
import type { SharedNotification } from '@/types/global';

type UseNotificationsOptions = {
    notifications: SharedNotification[] | null;
};

export const useNotifications = ({
    notifications,
}: UseNotificationsOptions) => {
    const [readLocally, setReadLocally] = useState<Set<number>>(
        () => new Set(),
    );
    const { patch } = useHttp({});

    const isRead = (notification: SharedNotification) =>
        notification.is_read || readLocally.has(notification.id);

    const unreadCount =
        notifications?.filter((notification) => !isRead(notification)).length ??
        0;

    const handleNotificationClick = (notification: SharedNotification) => {
        if (!notification.is_read && !readLocally.has(notification.id)) {
            patch(markNotificationAsRead(notification.id).url, {
                onSuccess: () => {
                    setReadLocally((prev) => {
                        const next = new Set(prev);

                        next.add(notification.id);

                        return next;
                    });

                    router.visit(showQuoteRoute.url({ quote: notification.quote_id }));
                },
            });

            return;
        }

        router.visit(showQuoteRoute.url({ quote: notification.quote_id }));
    };

    const handleMarkAllRead = () => {
        if (!notifications?.length) {
            return;
        }

        patch(markAllNotificationsAsRead().url, {
            onSuccess: () => {
                setReadLocally((prev) => {
                    const next = new Set(prev);

                    notifications.forEach((notification) =>
                        next.add(notification.id),
                    );

                    return next;
                });
            },
        });
    };

    return {
        isRead,
        unreadCount,
        handleNotificationClick,
        handleMarkAllRead,
    };
};
