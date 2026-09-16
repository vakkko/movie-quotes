import { usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import type { SharedPageProps } from '@/types/global';

import CreatePasswordModal from './Header/components/AuthOptions/LoginContent/PasswordReset/CreatePasswordModal/CreatePasswordModal';
import Header from './Header/Header';
import type { HeaderProps } from './Header/Header';
import ProfileAndNavSection from './ProfileAndNavSection/ProfileAndNavSection';

export type ActiveModal =
    | 'login'
    | 'register'
    | 'verify-email'
    | 'create-password'
    | 'success'
    | null;

const DefaultLayout = ({
    children,
    className,
}: PropsWithChildren<{ className?: string }>) => {
    const { url } = usePage();
    const { t } = useTranslation();
    const { verifyUserFromEmailRedirection } = usePage<SharedPageProps>().props;

    const isLandingPage = new URL(url, window.location.origin).pathname === '/';

    const [localVerifiedUser] = useState(verifyUserFromEmailRedirection);

    const [activeModal, setActiveModal] = useState<ActiveModal>(
        verifyUserFromEmailRedirection ? 'create-password' : null,
    );

    const headerProps: HeaderProps = {
        activeModal,
        setActiveModal,
        isLandingPage,
    };

    return (
        <>
            <Header {...headerProps} />
            <main
                className={cn(
                    'mt-[3.2rem] ml-[7rem] flex gap-[12.7rem] pr-[7rem]',
                    className,
                )}
            >
                {!isLandingPage && <ProfileAndNavSection />}
                {children}
            </main>
            {isLandingPage && (
                <footer className="ml-[7rem] py-[1.5rem] max-sm:ml-[3.4rem] max-sm:py-[1rem]">
                    <span className="text-cream max-sm:text-[0.8rem]">
                        {t('footer_copyright')}
                    </span>
                </footer>
            )}
            {localVerifiedUser && (
                <CreatePasswordModal
                    open={activeModal === 'create-password'}
                    onOpenChange={(open: boolean) =>
                        setActiveModal(open ? 'create-password' : null)
                    }
                    user={localVerifiedUser}
                    activeModal={activeModal}
                    setActiveModal={setActiveModal}
                />
            )}
        </>
    );
};

export default DefaultLayout;
