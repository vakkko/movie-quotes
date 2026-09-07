import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';
import type { HeaderProps } from '../../Header';

import EmailVerify from './LoginContent/EmailVerify/EmailVerify';
import LoginContent from './LoginContent/LoginContent';
import RegisterContent from './RegisterContent/RegisterContent';

type AuthOptionsProps = HeaderProps & {
    isLoggedIn: boolean;
    handleLogout: () => void;
};

const AuthOptions = ({
    isLoggedIn,
    handleLogout,
    loginOpen,
    registerOpen,
    setLoginOpen,
    setRegisterOpen,
    setVerifyEmailOpen,
    switchToLogin,
    verifyEmailOpen,
    setShowSuccessModal,
}: AuthOptionsProps) => {
    const { t } = useTranslation();

    const switchToRegister = () => {
        setLoginOpen(false);
        setRegisterOpen(true);
        setVerifyEmailOpen(false);
    };

    const switchToEmailVerification = () => {
        setVerifyEmailOpen(true);
        setLoginOpen(false);
    };

    const handleLoginSuccess = () => {
        setLoginOpen(false);
        setShowSuccessModal(false);
    };

    const handleEmailVerifySuccess = () => {
        setVerifyEmailOpen(false);
    };

    return (
        <>
            {isLoggedIn && !loginOpen ? (
                <button
                    onClick={handleLogout}
                    className="button-transparent-background-white-border"
                >
                    {t('log_out')}
                </button>
            ) : (
                <>
                    <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
                        <DialogTrigger className="button-primary-red-background">
                            {t('sign_up')}
                        </DialogTrigger>
                        <RegisterContent onSwitchToLogin={switchToLogin} />
                    </Dialog>
                    <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                        <DialogTrigger className="button-transparent-background-white-border">
                            {t('log_in')}
                        </DialogTrigger>
                        <LoginContent
                            onSuccess={handleLoginSuccess}
                            onSwitchToRegister={switchToRegister}
                            onSwitchToEmailVerify={switchToEmailVerification}
                        />
                    </Dialog>
                </>
            )}
            <EmailVerify
                open={verifyEmailOpen}
                onOpenChange={setVerifyEmailOpen}
                switchToLogin={switchToLogin}
                handleEmailVerifySuccess={handleEmailVerifySuccess}
            />
        </>
    );
};

export default AuthOptions;
