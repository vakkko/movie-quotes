import Home from '@/components/svgs/Home';
import VideoCamera from '@/components/svgs/VideoCamera';
import { useTranslation } from '@/hooks/useTranslation';
import { profile as profileRoute } from '@/routes';
import AvatarAndUsername from '../../pages/News/components/AvatarAndUsername';
import NavLink from './components/NavLink';

const ProfileAndNavSection = () => {
    const { t } = useTranslation();

    return (
        <div>
            <AvatarAndUsername editProfile href={profileRoute.url()} />
            <nav className="mt-16 pl-4 whitespace-nowrap">
                <ul className="flex-column gap-[4rem]">
                    <NavLink href="/news" icon={<Home />}>
                        {t('news_feed')}
                    </NavLink>
                    <NavLink href="/movies" icon={<VideoCamera />}>
                        {t('list_of_movies')}
                    </NavLink>
                </ul>
            </nav>
        </div>
    );
};

export default ProfileAndNavSection;
