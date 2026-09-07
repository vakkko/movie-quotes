import { Link, router, usePage } from '@inertiajs/react';
import type { Dispatch, SetStateAction } from 'react';

import type { SharedPageProps } from '@/types/global';

import AuthOptions from './components/AuthOptions/AuthOptions';
import LanguageDropDown from './components/LanguageDropDown';

export type HeaderProps = {
    loginOpen: boolean;
    setLoginOpen: Dispatch<SetStateAction<boolean>>;
    registerOpen: boolean;
    setRegisterOpen: Dispatch<SetStateAction<boolean>>;
    verifyEmailOpen: boolean;
    setVerifyEmailOpen: Dispatch<SetStateAction<boolean>>;
    switchToLogin: () => void;
    setShowSuccessModal: Dispatch<SetStateAction<boolean>>;
};

const Header = ({
    loginOpen,
    registerOpen,
    setLoginOpen,
    setRegisterOpen,
    setVerifyEmailOpen,
    switchToLogin,
    verifyEmailOpen,
    setShowSuccessModal,
}: HeaderProps) => {
    const { props } = usePage<SharedPageProps>();
    const { user } = props;
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
            <div className="flex-items-center gap-[1.6rem]">
                <LanguageDropDown />
                <AuthOptions
                    isLoggedIn={isLoggedIn}
                    handleLogout={handleLogout}
                    loginOpen={loginOpen}
                    setLoginOpen={setLoginOpen}
                    registerOpen={registerOpen}
                    setRegisterOpen={setRegisterOpen}
                    verifyEmailOpen={verifyEmailOpen}
                    setVerifyEmailOpen={setVerifyEmailOpen}
                    switchToLogin={switchToLogin}
                    setShowSuccessModal={setShowSuccessModal}
                />
            </div>
        </header>
    );
};

export default Header;
