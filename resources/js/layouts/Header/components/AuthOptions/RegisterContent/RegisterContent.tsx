import { useTranslation } from '@/hooks/useTranslation';
import AuthContent from '../components/AuthContent';
import AuthInputField from '../components/AuthInputField';
import useAuthFields from '../useAuthFields';
import { useGoogleAuth } from '../useGoogleAuth';
import type { RegisterForm } from './registerValidation';
import { useRegisterForm } from './useRegisterForm';

type RegisterContentProps = {
    onSwitchToLogin?: () => void;
};

const RegisterContent = ({ onSwitchToLogin }: RegisterContentProps) => {
    const { t } = useTranslation();

    const { handleGoogleAuth } = useGoogleAuth();

    const { data, fieldError, handleChange, handleSubmit, processing } =
        useRegisterForm(t);

    const { registerFields } = useAuthFields();

    return (
        <AuthContent
            header={t('create_an_account')}
            subHeader={t('start_your_journey')}
            handleSubmit={handleSubmit}
            processing={processing}
            button={t('create_account')}
            footerText={t('already_have_account')}
            footerAction={t('log_in')}
            onFooterActionClick={onSwitchToLogin}
            googleAuthText={t('sign_up_with_google')}
            onGoogleAuthClick={handleGoogleAuth}
        >
            {registerFields.map(({ key, htmlFor, ...field }) => (
                <AuthInputField
                    key={htmlFor}
                    htmlFor={htmlFor}
                    {...field}
                    value={data[key as keyof RegisterForm]}
                    onChange={(value) =>
                        handleChange(key as keyof RegisterForm, value)
                    }
                    error={fieldError(key as keyof RegisterForm)}
                />
            ))}
        </AuthContent>
    );
};

export default RegisterContent;
