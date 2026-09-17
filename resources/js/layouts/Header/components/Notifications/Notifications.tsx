import { Bell, Heart } from 'lucide-react';
import { useState } from 'react';
import AvatarImage from '@/components/AvatarImage';
import Quote from '@/components/svgs/Quote';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverArrow,
} from '@/components/ui/popover';
import { useTranslation } from '@/hooks/useTranslation';
import { getTimeAgo } from '@/layouts/Header/utils';
import type { SharedNotification } from '@/types/global';
import { useNotifications } from './useNotifications';

type NotificationsProps = {
    notifications: SharedNotification[] | null;
};

const Notifications = ({ notifications }: NotificationsProps) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);

    const {
        liveNotifications,
        isRead,
        unreadCount,
        now,
        handleNotificationClick,
        handleMarkAllRead,
    } = useNotifications({ notifications });

    const handleNotificationClickAndClose = (
        notification: SharedNotification,
    ) => {
        setIsOpen(false);
        handleNotificationClick(notification);
    };

    const handleMarkAllReadAndClose = () => {
        setIsOpen(false);
        handleMarkAllRead();
    };

    return (
        <>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger className="relative">
                    <span className="flex items-center justify-center">
                        <Bell color="white" size={33} />
                    </span>
                    {unreadCount > 0 && (
                        <span className="absolute bottom-[1.5rem] left-[1.6rem] flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full bg-primary-red">
                            {unreadCount}
                        </span>
                    )}
                </PopoverTrigger>
                <PopoverContent className="scroll-none mr-[6.4rem] max-h-[60vh] w-[40vw] overflow-y-auto rounded-[1rem] border-none bg-black px-[3.2rem] py-[4rem] text-white [&::-webkit-scrollbar]:hidden">
                    <PopoverArrow
                        width={20}
                        height={10}
                        className="fill-black"
                    />
                    <PopoverHeader className="mb-[2.3rem] flex-row justify-between">
                        <h3 className="font-500-size-32">
                            {t('notifications')}
                        </h3>
                        <button
                            type="button"
                            className="text-[2rem] underline"
                            onClick={handleMarkAllReadAndClose}
                        >
                            {t('mark_all_read')}
                        </button>
                    </PopoverHeader>
                    <div className="flex flex-col gap-[1.6rem]">
                        {(!liveNotifications ||
                            liveNotifications.length === 0) && (
                            <p className="py-[1rem] text-center text-[2rem] text-white">
                                {t('no_notifications')}
                            </p>
                        )}
                        {liveNotifications?.map((notification) => (
                            <div
                                key={notification.id}
                                className="flex cursor-pointer gap-[2.4rem] rounded-[0.4rem] border border-slate-gray-50 px-[2rem] py-[1.5rem] hover:bg-charcoal-navy"
                                onClick={() =>
                                    handleNotificationClickAndClose(
                                        notification,
                                    )
                                }
                            >
                                <AvatarImage
                                    alt={notification.actor.username}
                                    src={notification.actor.avatar_url}
                                />
                                <div className="flex w-full flex-col">
                                    <div className="flex justify-between">
                                        <span>
                                            {notification.actor.username}
                                        </span>
                                        <small>
                                            {getTimeAgo(
                                                notification.created_at,
                                                now,
                                            )}
                                        </small>
                                    </div>
                                    <div className="flex justify-between">
                                        {notification.type === 'comment' && (
                                            <p className="flex items-center gap-[1.2rem]">
                                                <Quote width={24} height={24} />{' '}
                                                {t('commented_to_quote')}
                                            </p>
                                        )}
                                        {notification.type === 'like' && (
                                            <p className="flex items-center gap-[1.2rem]">
                                                <Heart
                                                    fill="red"
                                                    stroke="red"
                                                />{' '}
                                                {t('reacted_to_quote')}
                                            </p>
                                        )}
                                        {!isRead(notification) && (
                                            <span className="text-bootstrap-green">
                                                {t('new')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </>
    );
};

export default Notifications;
