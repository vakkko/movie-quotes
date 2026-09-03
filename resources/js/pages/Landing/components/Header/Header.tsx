import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

import StyledAnchor from '@/components/StyledAnchor';

import { useTranslation } from '@/hooks/useTranslation';
import type { SharedPageProps } from '@/types/global';

import AuthOptions from './components/AuthOptions/AuthOptions';
import LanguageDropDown from './components/LanguageDropDown';

const Header = () => {
    const { t } = useTranslation();
    const { auth } = usePage<SharedPageProps>().props;
    const isLoggedIn = !!auth.user;

    const [loginOpen, setLoginOpen] = useState(false);

    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <header className="[background-image:var(--header-gradient)] pb-[21rem] text-cream">
            <div className="flex-items-center justify-between px-[7rem] pt-[2.4rem]">
                <Link className="font-500-size-16 uppercase">
                    {t('movie_quotes')}
                </Link>
                <div className="flex-items-center gap-[1.6rem]">
                    <LanguageDropDown />
                    <AuthOptions
                        isLoggedIn={isLoggedIn}
                        handleLogout={handleLogout}
                        t={t}
                        loginOpen={loginOpen}
                        setLoginOpen={setLoginOpen}
                    />
                </div>
            </div>
            <div className="mx-auto mt-[28rem] flex-column w-[36.6%] items-center gap-[2.4rem]">
                <h1 className="text-center font-montserrat font-700-size-60 leading-[150%]">
                    {t('hero_title')}
                </h1>
                <StyledAnchor href="/posts" redBackground>
                    {t('get_started')}
                </StyledAnchor>
            </div>
        </header>
    );
};

export default Header;
