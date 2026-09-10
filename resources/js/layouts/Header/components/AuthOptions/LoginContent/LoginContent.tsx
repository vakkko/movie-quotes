import { useTranslation } from '@/hooks/useTranslation';
import AuthContent from '../components/AuthContent';
import AuthInputField from '../components/AuthInputField';
import useAuthFields from '../useAuthFields';
import { useGoogleAuth } from '../useGoogleAuth';
import type { LoginForm } from './loginValidation';
import { useLoginForm } from './useLoginForm';

type LoginContentProps = {
    onSuccess?: () => void;
    onSwitchToRegister?: () => void;
    onSwitchToEmailVerify: () => void;
};

const LoginContent = ({
    onSuccess,
    onSwitchToRegister,
    onSwitchToEmailVerify,
}: LoginContentProps) => {
    const { t } = useTranslation();

    const { handleGoogleAuth } = useGoogleAuth();

    const { data, fieldError, handleChange, handleSubmit, processing } =
        useLoginForm(t, onSuccess);

    const { loginFields } = useAuthFields();

    return (
        <AuthContent
            header={t('login_account')}
            subHeader={t('welcome_back_enter_details')}
            handleSubmit={handleSubmit}
            processing={processing}
            buttonText={t('sign_in')}
            footerConfig={{
                text: t('already_have_account'),
                action: t('sign_up'),
                onActionClick: onSwitchToRegister,
            }}
            googleAuthConfig={{
                text: t('sign_in_with_google'),
                onClick: handleGoogleAuth,
            }}
        >
            {loginFields.map(({ key, htmlFor, ...field }) => (
                <AuthInputField
                    key={htmlFor}
                    htmlFor={htmlFor}
                    {...field}
                    value={data[key as Exclude<keyof LoginForm, 'remember'>]}
                    onChange={(value) =>
                        handleChange(key as keyof LoginForm, value)
                    }
                    error={fieldError(key as keyof LoginForm)}
                />
            ))}
            <div className="flex-items-center justify-between">
                <label
                    htmlFor="remember"
                    className="flex items-center gap-[1rem] text-[1.4rem] text-slate-gray"
                >
                    <input
                        id="remember"
                        name="remember"
                        type="checkbox"
                        checked={data.remember}
                        onChange={(event) =>
                            handleChange('remember', event.target.checked)
                        }
                        className="size-[1.6rem] accent-primary-red"
                    />
                    {t('remember_me')}
                </label>
                <button
                    type="button"
                    onClick={onSwitchToEmailVerify}
                    className="text-blue-underline"
                >
                    {t('forgot_password')}
                </button>
            </div>
        </AuthContent>
    );
};

export default LoginContent;
