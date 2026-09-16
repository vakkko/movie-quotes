import { useTranslation } from '@/hooks/useTranslation';
import ProfileInputField from './ProfileInputField';
import ProfileRow from './ProfileRow';

type ProfilePasswordSectionProps = {
    editing: boolean;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    onToggle: () => void;
    onCurrentPasswordChange: (value: string) => void;
    onNewPasswordChange: (value: string) => void;
    onConfirmPasswordChange: (value: string) => void;
    currentPasswordError?: string;
    newPasswordError?: string;
    confirmPasswordError?: string;
};

const ProfilePasswordSection = ({
    editing,
    currentPassword,
    newPassword,
    confirmPassword,
    onToggle,
    onCurrentPasswordChange,
    onNewPasswordChange,
    onConfirmPasswordChange,
    currentPasswordError,
    newPasswordError,
    confirmPasswordError,
}: ProfilePasswordSectionProps) => {
    const { t } = useTranslation();

    return (
        <>
            <ProfileRow
                label={editing ? t('current_password') : t('password')}
                displayValue={editing ? currentPassword : ''}
                editing={editing}
                onToggle={onToggle}
                type="password"
                onChange={editing ? onCurrentPasswordChange : undefined}
                error={editing ? currentPasswordError : undefined}
            />
            {editing && (
                <>
                    <ProfileInputField
                        label={t('new_password')}
                        htmlFor="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={newPassword}
                        onChange={onNewPasswordChange}
                        error={newPasswordError}
                    />
                    <ProfileInputField
                        label={t('confirm_password')}
                        htmlFor="password_confirmation"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={onConfirmPasswordChange}
                        error={confirmPasswordError}
                    />
                </>
            )}
        </>
    );
};

export default ProfilePasswordSection;
