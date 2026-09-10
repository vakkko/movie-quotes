import { useState } from 'react';
import Letter from '@/components/svgs/Letter';
import { Dialog } from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';
import StatusModal from '@/pages/Landing/components/StatusModal/StatusModal';
import AuthContent from '../../../components/AuthContent';
import AuthInputField from '../../../components/AuthInputField';
import useAuthFields from '../../../useAuthFields';
import { useEmailVerifyForm } from './useEmailVerifyForm';

type EmailVerifyProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    switchToLogin: () => void;
    handleEmailVerifySuccess: () => void;
};

const EmailVerify = ({
    open,
    onOpenChange,
    switchToLogin,
    handleEmailVerifySuccess,
}: EmailVerifyProps) => {
    const { t } = useTranslation();
    const [showEmailStatus, setShowEmailStatus] = useState(false);

    const { emailField } = useAuthFields();

    const onSuccess = () => {
        setShowEmailStatus(true);
        handleEmailVerifySuccess();
    };

    const { data, fieldError, handleChange, handleSubmit, processing } =
        useEmailVerifyForm(t, onSuccess);

    const redirectToMail = () => {
        window.open(
            'https://mail.google.com/mail/',
            '_blank',
            'noopener,noreferrer',
        );
    };

    const closeStatusModal = () => {
        setShowEmailStatus(false);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <AuthContent
                    header={t('forgot_password')}
                    subHeader={t('forgot_password_description')}
                    buttonText={t('send_instructions')}
                    handleSubmit={handleSubmit}
                    processing={processing}
                    switchToLogin={switchToLogin}
                >
                    <AuthInputField
                        key={emailField.key}
                        htmlFor={emailField.htmlFor}
                        label={emailField.label}
                        type={emailField.type}
                        autoComplete={emailField.autoComplete}
                        placeholder={emailField.placeholder}
                        value={data.email}
                        onChange={handleChange}
                        error={fieldError('email')}
                    />
                </AuthContent>
            </Dialog>
            {showEmailStatus && (
                <StatusModal
                    header={t('check_email')}
                    infotext={t('password_recover_instruction')}
                    anchorText={t('go_to_mail')}
                    showModal={showEmailStatus}
                    setShowModal={setShowEmailStatus}
                    onAction={redirectToMail}
                    closeStatusModal={closeStatusModal}
                >
                    <Letter />
                </StatusModal>
            )}
        </>
    );
};

export default EmailVerify;
