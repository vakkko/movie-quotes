import { useTranslation } from '@/hooks/useTranslation';
import ProfileInputField from '../ProfileInputField';
import type { ProfileForm } from '../profileValidation';
import type { ToggleKey } from './useProfileForm';

type EditModalFieldsProps = {
    field: ToggleKey;
    data: ProfileForm;
    onChange: (key: keyof ProfileForm, value: string) => void;
    fieldError: (key: keyof ProfileForm) => string | undefined;
};

const EditModalFields = ({
    field,
    data,
    onChange,
    fieldError,
}: EditModalFieldsProps) => {
    const { t } = useTranslation();

    if (field === 'username') {
        return (
            <ProfileInputField
                label={t('new_username')}
                htmlFor="new_username"
                placeholder={t('username_placeholder')}
                autoComplete="username"
                value={data.username}
                onChange={(value) => onChange('username', value)}
                error={fieldError('username')}
            />
        );
    }

    if (field === 'email') {
        return (
            <ProfileInputField
                label={t('new_email')}
                htmlFor="new_email"
                type="email"
                placeholder={t('enter_your_email')}
                autoComplete="email"
                value={data.email}
                onChange={(value) => onChange('email', value)}
                error={fieldError('email')}
            />
        );
    }

    return (
        <>
            <ProfileInputField
                label={t('current_password')}
                htmlFor="current_password"
                type="password"
                autoComplete="current-password"
                value={data.current_password}
                onChange={(value) => onChange('current_password', value)}
                error={fieldError('current_password')}
            />
            <ProfileInputField
                label={t('new_password')}
                htmlFor="password"
                type="password"
                autoComplete="new-password"
                value={data.password}
                onChange={(value) => onChange('password', value)}
                error={fieldError('password')}
            />
            <ProfileInputField
                label={t('confirm_password')}
                htmlFor="password_confirmation"
                type="password"
                autoComplete="new-password"
                value={data.password_confirmation}
                onChange={(value) => onChange('password_confirmation', value)}
                error={fieldError('password_confirmation')}
            />
        </>
    );
};

export default EditModalFields;
