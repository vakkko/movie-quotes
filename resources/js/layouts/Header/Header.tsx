import { Link, router, usePage } from '@inertiajs/react';
import type { Dispatch, SetStateAction } from 'react';

import type { ActiveModal } from '@/layouts/DefaultLayout';
import Notifications from '@/layouts/Header/components/Notifications/Notifications';
import type { SharedPageProps } from '@/types/global';

import AuthOptions from './components/AuthOptions/AuthOptions';
import LanguageDropDown from './components/LanguageDropDown';

export type HeaderProps = {
    activeModal: ActiveModal;
    setActiveModal: Dispatch<SetStateAction<ActiveModal>>;
};

const Header = ({ activeModal, setActiveModal }: HeaderProps) => {
    const { props } = usePage<SharedPageProps>();
    const { user } = props;
    const { notifications } = props;
    const { url } = usePage();
    const isLoggedIn = !!user;
    const isHome = url === '/';

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <header
            className={`flex-items-center justify-between px-[7rem] pt-[2.4rem] text-cream max-sm:px-[1.6rem] ${!isHome ? 'pb-3rem bg-soft-navy pb-[3rem]' : ''}`}
        >
            <Link href="/" className="font-500-size-16 uppercase">
                Movie quotes
            </Link>
            <div className="flex-items-center gap-[4rem]">
                {user && <Notifications notifications={notifications} />}
                <LanguageDropDown />
                <AuthOptions
                    isLoggedIn={isLoggedIn}
                    handleLogout={handleLogout}
                    activeModal={activeModal}
                    setActiveModal={setActiveModal}
                />
            </div>
        </header>
    );
};

export default Header;
