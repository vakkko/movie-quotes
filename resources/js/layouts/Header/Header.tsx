import { Link, router, usePage } from '@inertiajs/react';
import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive';
import SearchBar from '@/components/SearchBar';
import Notifications from '@/layouts/Header/components/Notifications/Notifications';

import type { ActiveModal } from '@/pages/Landing/useAuthModal';
import type { SharedPageProps } from '@/types/global';

import AuthOptions from './components/AuthOptions/AuthOptions';
import LanguageDropDown from './components/LanguageDropDown';
import MobileMenu from './components/MobileMenu';

export type HeaderProps = {
    activeModal: ActiveModal;
    setActiveModal: Dispatch<SetStateAction<ActiveModal>>;
    isLandingPage?: boolean;
};

const Header = ({
    activeModal,
    setActiveModal,
    isLandingPage,
}: HeaderProps) => {
    const { props } = usePage<SharedPageProps>();
    const { user } = props;
    const { notifications } = props;
    const { url } = usePage();
    const isLoggedIn = !!user;
    const isHome = url === '/';

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const isMobile = useMediaQuery({ maxWidth: 639 });

    useEffect(() => {
        return router.on('start', () => {
            setIsMenuOpen(false);
        });
    }, []);

    return (
        <header
            className={`flex-items-center justify-between px-[7rem] pt-[2.4rem] text-cream max-sm:px-[1.6rem] ${!isHome && 'pb-3rem bg-soft-navy pb-[3rem]'}`}
        >
            <Link
                href="/"
                className={`font-500-size-16 uppercase ${!isHome && 'max-lg:hidden'}`}
            >
                Movie quotes
            </Link>
            {!isLandingPage && (
                <MobileMenu
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />
            )}
            <div className="flex-items-center gap-[4rem] max-sm:gap-[2rem]">
                {user && !isLandingPage && (
                    <>
                        {isMobile && (
                            <SearchBar
                                isExpanded={isExpanded}
                                setIsExpanded={setIsExpanded}
                                variant="header"
                            />
                        )}
                        <Notifications notifications={notifications} />
                    </>
                )}
                <LanguageDropDown />
                <AuthOptions
                    isLoggedIn={isLoggedIn}
                    activeModal={activeModal}
                    setActiveModal={setActiveModal}
                />
            </div>
        </header>
    );
};

export default Header;
