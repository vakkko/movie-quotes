import { useTranslation } from '@/hooks/useTranslation';

type FieldConfig = {
    key: string;
    htmlFor: string;
    label: string;
    type?: string;
    autoComplete: string;
    placeholder: string;
    hasEyeIcon?: boolean;
};

const useAuthFields = () => {
    const { t } = useTranslation();

    const usernameField: FieldConfig = {
        key: 'username',
        htmlFor: 'username',
        label: t('username'),
        autoComplete: 'username',
        placeholder: t('username_placeholder'),
    };
    const emailField: FieldConfig = {
        key: 'email',
        htmlFor: 'email',
        label: t('email'),
        type: 'email',
        autoComplete: 'email',
        placeholder: t('enter_your_email'),
    };
    const passwordField: FieldConfig = {
        key: 'password',
        htmlFor: 'password',
        label: t('password'),
        type: 'password',
        autoComplete: 'new-password',
        placeholder: t('password_placeholder'),
        hasEyeIcon: true,
    };
    const confirmPasswordField: FieldConfig = {
        key: 'password_confirmation',
        htmlFor: 'confirm_password',
        label: t('confirm_password'),
        type: 'password',
        autoComplete: 'new-password',
        placeholder: t('confirm_password_placeholder'),
        hasEyeIcon: true,
    };

    const loginFields: FieldConfig[] = [emailField, passwordField];

    const registerFields: FieldConfig[] = [
        usernameField,
        emailField,
        passwordField,
        confirmPasswordField,
    ];

    const passwordResetFields: FieldConfig[] = [
        passwordField,
        confirmPasswordField,
    ];

    return { registerFields, loginFields, emailField, passwordResetFields };
};

export default useAuthFields;
