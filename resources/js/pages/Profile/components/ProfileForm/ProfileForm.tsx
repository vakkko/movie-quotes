import { useMediaQuery } from 'react-responsive';
import { useTranslation } from '@/hooks/useTranslation';
import type { ProfileUser } from '../../types';
import ProfileAvatarUpload from '../ProfileAvatarUpload';
import ProfileEditModal from '../ProfileEditModal';
import ProfileEmailSection from '../ProfileEmailSection';
import ProfilePasswordSection from '../ProfilePasswordSection';
import ProfileUsernameSection from '../ProfileUsernameSection';
import EditModalFields from './EditModalFields';
import { useProfileForm } from './useProfileForm';

const ProfileForm = ({ user }: { user: ProfileUser }) => {
    const { t } = useTranslation();
    const isMobile = useMediaQuery({ maxWidth: 639 });

    const {
        data,
        fieldError,
        handleChange,
        handleAvatarChange,
        handleSubmit,
        processing,
        editing,
        modalField,
        confirmingSave,
        setConfirmingSave,
        cancelEdit,
        confirmEdit,
        toggleEdit,
        inlineEditing,
        rowEditing,
    } = useProfileForm(t, isMobile);

    return (
        <form
            onSubmit={handleSubmit}
            className="relative flex-column w-full items-center gap-[2.4rem] rounded-[1.2rem] bg-charcoal-navy px-60 pt-64 pb-20 max-2xl:px-28 max-xl:px-7 max-sm:pb-30"
        >
            <ProfileAvatarUpload
                src={user.avatar_url}
                alt={user.username}
                error={fieldError('avatar')}
                onFileChange={handleAvatarChange}
            />
            <ProfileUsernameSection
                username={user.username}
                editing={rowEditing('username')}
                onToggle={() => toggleEdit('username')}
                value={data.username}
                onChange={(value) => handleChange('username', value)}
                error={fieldError('username')}
                inlineEditing={inlineEditing}
                edited={editing.username}
            />
            <ProfileEmailSection
                email={user.email}
                pendingEmail={user.pending_email}
                editing={rowEditing('email')}
                onToggle={() => toggleEdit('email')}
                value={data.email}
                onChange={(value) => handleChange('email', value)}
                error={fieldError('email')}
                hideButton={Boolean(user.google_id)}
                inlineEditing={inlineEditing}
                edited={editing.email}
                className={user.google_id ? 'mr-auto' : ''}
            />
            {!user.google_id && (
                <ProfilePasswordSection
                    editing={rowEditing('password')}
                    onToggle={() => toggleEdit('password')}
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
                    inlineEditing={inlineEditing}
                    edited={editing.password}
                />
            )}
            <button
                type={isMobile ? 'button' : 'submit'}
                disabled={processing}
                onClick={isMobile ? () => setConfirmingSave(true) : undefined}
                className="mt-[0.8rem] button-primary-red-background max-sm:mt-10"
            >
                {t('save_changes')}
            </button>

            {isMobile && modalField && (
                <ProfileEditModal
                    isOpen
                    onCancel={() => cancelEdit(modalField)}
                    onConfirm={() => confirmEdit(modalField)}
                >
                    <EditModalFields
                        field={modalField}
                        data={data}
                        onChange={handleChange}
                        fieldError={fieldError}
                    />
                </ProfileEditModal>
            )}

            {isMobile && confirmingSave && (
                <ProfileEditModal
                    isOpen
                    confirmLabel={t('confirm')}
                    onCancel={() => setConfirmingSave(false)}
                    onConfirm={() => {
                        setConfirmingSave(false);
                        handleSubmit({ preventDefault: () => {} });
                    }}
                >
                    <span className="text-center font-500-size-16 text-white">
                        {t('save_changes_confirmation')}
                    </span>
                </ProfileEditModal>
            )}
        </form>
    );
};

export default ProfileForm;
