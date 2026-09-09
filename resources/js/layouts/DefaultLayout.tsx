import { usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import type { SharedPageProps } from '@/types/global';

import CreatePasswordModal from './Header/components/AuthOptions/LoginContent/CreatePasswordModal/CreatePasswordModal';
import Header from './Header/Header';
import type { HeaderProps } from './Header/Header';

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
    const { verifyUserFromEmailRedirection } = usePage<SharedPageProps>().props;

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
            <main className={className}>{children}</main>
            {localVerifiedUser && (
                <CreatePasswordModal
                    open={
                        activeModal === 'create-password' ||
                        activeModal === 'success'
                    }
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
