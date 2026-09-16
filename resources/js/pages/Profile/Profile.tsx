import { useTranslation } from '@/hooks/useTranslation';
import DefaultLayout from '@/layouts/DefaultLayout';
import ProfileForm from './components/ProfileForm';
import type { ProfileUser } from './types';

type ProfileProps = {
    user: ProfileUser;
};

const Profile = ({ user }: ProfileProps) => {
    const { t } = useTranslation();

    return (
        <div className="ml-[16rem] flex-column w-[50%] gap-[12rem]">
            <h1 className="ml-[6rem] font-700-size-30">{t('my_profile')}</h1>
            <ProfileForm user={user} />
        </div>
    );
};

Profile.layout = (page: React.ReactNode) => (
    <DefaultLayout>{page}</DefaultLayout>
);

export default Profile;
