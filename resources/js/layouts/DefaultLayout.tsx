import { usePage } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import type { SharedPageProps } from '@/types/global';

import CreatePasswordModal from './Header/components/AuthOptions/LoginContent/CreatePasswordModal/CreatePasswordModal';
import Header from './Header/Header';

const DefaultLayout = ({ children, className }: PropsWithChildren<{ className?: string }>) => {
    const { verifyUserFromEmailRedirection } = usePage<SharedPageProps>().props;

    const [localVerifiedUser] = useState(verifyUserFromEmailRedirection);

    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [verifyEmailOpen, setVerifyEmailOpen] = useState(false);
    const [showCreatePassword, setShowCreatePassword] = useState(
        !!verifyUserFromEmailRedirection,
    );
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const switchToLogin = () => {
        setLoginOpen(true);
        setRegisterOpen(false);
        setVerifyEmailOpen(false);
        setShowSuccessModal(false);
    };

    return (
        <>
            <Header
                loginOpen={loginOpen}
                setLoginOpen={setLoginOpen}
                registerOpen={registerOpen}
                setRegisterOpen={setRegisterOpen}
                verifyEmailOpen={verifyEmailOpen}
                setVerifyEmailOpen={setVerifyEmailOpen}
                switchToLogin={switchToLogin}
                setShowSuccessModal={setShowSuccessModal}
            />
            <main className={className}>{children}</main>
            {localVerifiedUser && (
                <CreatePasswordModal
                    open={showCreatePassword}
                    onOpenChange={setShowCreatePassword}
                    user={localVerifiedUser}
                    switchToLogin={switchToLogin}
                    showSuccessModal={showSuccessModal}
                    setShowSuccessModal={setShowSuccessModal}
                />
            )}
        </>
    );
};

export default DefaultLayout;
