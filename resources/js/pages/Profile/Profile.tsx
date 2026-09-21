import { ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import DefaultLayout from '@/layouts/DefaultLayout';
import ProfileForm from './components/ProfileForm/ProfileForm';
import type { ProfileUser } from './types';

type ProfileProps = {
    user: ProfileUser;
};

const Profile = ({ user }: ProfileProps) => {
    const { t } = useTranslation();

    return (
        <div className="ml-64 flex-column w-[50%] gap-48 max-lg:ml-0 max-lg:w-full!">
            <button
                type="button"
                onClick={() => window.history.back()}
                aria-label={t('back')}
                className="relative z-60 flex-items-center w-fit text-slate-gray max-sm:ml-8 sm:hidden"
            >
                <ArrowLeft size={35} className="text-white" />
            </button>
            <h1 className="ml-24 hidden text-[30px] font-bold sm:block">
                {t('my_profile')}
            </h1>
            <ProfileForm user={user} />
        </div>
    );
};

Profile.layout = (page: React.ReactNode) => (
    <DefaultLayout className="max-sm:mt-0 max-sm:ml-0 max-sm:bg-deep-navy max-sm:pt-12 max-sm:pr-0">
        {page}
    </DefaultLayout>
);

export default Profile;
