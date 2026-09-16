import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import type { ProfileUser } from '../types';
import ProfileAvatarUpload from './ProfileAvatarUpload';
import ProfileEmailSection from './ProfileEmailSection';
import ProfilePasswordSection from './ProfilePasswordSection';
import ProfileUsernameSection from './ProfileUsernameSection';
import type { ProfileEditState } from './profileValidation';
import { useProfileForm } from './useProfileForm';

type ToggleKey = keyof ProfileEditState;

const ProfileForm = ({ user }: { user: ProfileUser }) => {
    const { t } = useTranslation();
    const [editing, setEditing] = useState<ProfileEditState>({
        username: false,
        email: false,
        password: false,
    });

    const {
        data,
        fieldError,
        handleChange,
        clearField,
        handleAvatarChange,
        handleSubmit,
        processing,
    } = useProfileForm(t, editing, () =>
        setEditing({ username: false, email: false, password: false }),
    );

    const toggle = (key: ToggleKey) => {
        if (editing[key]) {
            if (key === 'password') {
                clearField('current_password');
                clearField('password');
                clearField('password_confirmation');
            } else {
                clearField(key);
            }
        }

        setEditing((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="relative flex-column w-full items-center gap-[2.4rem] rounded-[1.2rem] bg-deep-navy px-[15rem] pt-[16rem]"
        >
            <ProfileAvatarUpload
                src={user.avatar_url}
                alt={user.username}
                error={fieldError('avatar')}
                onFileChange={handleAvatarChange}
            />
            <ProfileUsernameSection
                username={user.username}
                editing={editing.username}
                onToggle={() => toggle('username')}
                value={data.username}
                onChange={(value) => handleChange('username', value)}
                error={fieldError('username')}
            />
            <ProfileEmailSection
                email={user.email}
                pendingEmail={user.pending_email}
                editing={editing.email}
                onToggle={() => toggle('email')}
                value={data.email}
                onChange={(value) => handleChange('email', value)}
                error={fieldError('email')}
                hideButton={Boolean(user.google_id)}
            />
            {!user.google_id && (
                <ProfilePasswordSection
                    editing={editing.password}
                    onToggle={() => toggle('password')}
                    currentPassword={data.current_password}
                    newPassword={data.password}
                    confirmPassword={data.password_confirmation}
                    onCurrentPasswordChange={(value) =>
                        handleChange('current_password', value)
                    }
                    onNewPasswordChange={(value) =>
                        handleChange('password', value)
                    }
                    onConfirmPasswordChange={(value) =>
                        handleChange('password_confirmation', value)
                    }
                    currentPasswordError={fieldError('current_password')}
                    newPasswordError={fieldError('password')}
                    confirmPasswordError={fieldError('password_confirmation')}
                />
            )}
            <button
                type="submit"
                disabled={processing}
                className="mt-[0.8rem] button-primary-red-background"
            >
                {t('save_changes')}
            </button>
        </form>
    );
};

export default ProfileForm;
