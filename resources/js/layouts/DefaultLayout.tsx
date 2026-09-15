import { usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

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
    const { verifyUserFromEmailRedirection } = usePage<SharedPageProps>().props;

    const isLandingPage = new URL(url, window.location.origin).pathname === '/';

    const [localVerifiedUser] = useState(verifyUserFromEmailRedirection);

    const [activeModal, setActiveModal] = useState<ActiveModal>(
        verifyUserFromEmailRedirection ? 'create-password' : null,
    );

    const headerProps: HeaderProps = {
        activeModal,
        setActiveModal,
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
