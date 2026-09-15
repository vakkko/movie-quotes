import { Link, usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import type { SharedPageProps } from '@/types/global';
import AvatarImage from '../../../components/AvatarImage';

type UserDisplay = {
    avatar?: string | null;
    avatar_url?: string | null;
    name?: string;
    username?: string;
};

type AvatarAndUsernameProps = PropsWithChildren & {
    user?: UserDisplay | null;
    editProfile?: boolean;
    href?: string;
};

const AvatarAndUsername = ({
    user,
    editProfile,
    href,
    children,
}: AvatarAndUsernameProps) => {
    const { t } = useTranslation();
    const page = usePage<SharedPageProps>();
    const currentUser = (user ?? page.props.user) as UserDisplay;

    if (!currentUser) {
        return null;
    }

    const avatarSrc = currentUser.avatar_url ? currentUser.avatar_url : null;
    const username = currentUser.username ? currentUser.username : '';

    const content = (
        <>
            <AvatarImage src={avatarSrc} alt={username} />
            <div className={editProfile ? 'flex-column' : ''}>
                <span className="text-[2.4rem] leading-[150%]">{username}</span>
                {children}
                {editProfile && (
                    <span className="text-[1.6rem] leading-[150%] text-silver-gray">
                        {t('edit_profile')}
                    </span>
                )}
            </div>
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className="flex-items-center gap-[1.6rem] whitespace-nowrap"
            >
                {content}
            </Link>
        );
    }

    return (
        <div className="flex-items-center gap-[1.6rem] whitespace-nowrap">
            {content}
        </div>
    );
};

export default AvatarAndUsername;
