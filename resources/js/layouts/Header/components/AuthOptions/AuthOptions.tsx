import LogoutButton from '@/components/LogoutButton';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';
import type { HeaderProps } from '../../Header';

import LoginContent from './LoginContent/LoginContent';
import EmailVerify from './LoginContent/PasswordReset/EmailVerify/EmailVerify';
import RegisterContent from './RegisterContent/RegisterContent';

type AuthOptionsProps = HeaderProps & {
    isLoggedIn: boolean;
};

const AuthOptions = ({
    isLoggedIn,
    activeModal,
    setActiveModal,
}: AuthOptionsProps) => {
    const { t } = useTranslation();

    const switchToRegister = () => {
        setActiveModal('register');
    };

    const switchToEmailVerification = () => {
        setActiveModal('verify-email');
    };

    const switchToLogin = () => {
        setActiveModal('login');
    };

    const handleLoginSuccess = () => {
        setActiveModal(null);
    };

    const handleEmailVerifySuccess = () => {
        setActiveModal(null);
    };

    return (
        <>
            {isLoggedIn && activeModal !== 'login' ? (
                <LogoutButton
                    showIcon={false}
                    className="button-transparent-background-white-border max-lg:hidden"
                />
            ) : (
                <>
                    <Dialog
                        open={activeModal === 'register'}
                        onOpenChange={(open: boolean) =>
                            setActiveModal(open ? 'register' : null)
                        }
                    >
                        <DialogTrigger className="button-primary-red-background max-[450px]:ml-auto">
                            {t('sign_up')}
                        </DialogTrigger>
                        <RegisterContent onSwitchToLogin={switchToLogin} />
                    </Dialog>
                    <Dialog
                        open={activeModal === 'login'}
                        onOpenChange={(open: boolean) =>
                            setActiveModal(open ? 'login' : null)
                        }
                    >
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
                open={activeModal === 'verify-email'}
                onOpenChange={(open: boolean) =>
                    setActiveModal(open ? 'verify-email' : null)
                }
                switchToLogin={switchToLogin}
                handleEmailVerifySuccess={handleEmailVerifySuccess}
            />
        </>
    );
};

export default AuthOptions;
