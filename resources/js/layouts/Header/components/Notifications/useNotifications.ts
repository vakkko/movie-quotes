import { router, useHttp, usePage } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { useState } from 'react';
import { show as showQuoteRoute } from '@/routes/news/quotes';
import {
    read as markNotificationAsRead,
    readAll as markAllNotificationsAsRead,
} from '@/routes/notifications';
import type { SharedNotification, SharedPageProps } from '@/types/global';

type UseNotificationsOptions = {
    notifications: SharedNotification[] | null;
};

export const useNotifications = ({
    notifications,
}: UseNotificationsOptions) => {
    const { props } = usePage<SharedPageProps>();
    const { user } = props;
    const [now] = useState(() => Date.now());
    const [liveNotifications, setLiveNotifications] = useState<
        SharedNotification[] | null
    >(notifications);
    const [prevNotifications, setPrevNotifications] = useState(notifications);
    const [readLocally, setReadLocally] = useState<Set<number>>(
        () => new Set(),
    );
    const { patch } = useHttp({});

    if (prevNotifications !== notifications) {
        setPrevNotifications(notifications);
        setLiveNotifications(notifications);
    }

    useEcho<SharedNotification>(
        `App.Models.User.${user?.id}`,
        '.NotificationCreated',
        (notification) => {
            setLiveNotifications((prev) => [notification, ...(prev ?? [])]);
        },
    );

    const isRead = (notification: SharedNotification) =>
        notification.is_read || readLocally.has(notification.id);

    const unreadCount =
        liveNotifications?.filter((notification) => !isRead(notification))
            .length ?? 0;

    const handleNotificationClick = (notification: SharedNotification) => {
        if (!notification.is_read && !readLocally.has(notification.id)) {
            patch(markNotificationAsRead(notification.id).url, {
                onSuccess: () => {
                    setReadLocally((prev) => {
                        const next = new Set(prev);

                        next.add(notification.id);

                        return next;
                    });

                    router.visit(
                        showQuoteRoute.url({ quote: notification.quote_id }),
                    );
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
        liveNotifications,
        isRead,
        unreadCount,
        now,
        handleNotificationClick,
        handleMarkAllRead,
    };
};
