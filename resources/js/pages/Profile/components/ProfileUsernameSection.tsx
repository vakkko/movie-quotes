import { useTranslation } from '@/hooks/useTranslation';
import ProfileInputField from './ProfileInputField';
import ProfileRow from './ProfileRow';

type ProfileUsernameSectionProps = {
    username: string;
    editing: boolean;
    onToggle: () => void;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    inlineEditing?: boolean;
    edited?: boolean;
};

const ProfileUsernameSection = ({
    username,
    editing,
    onToggle,
    value,
    onChange,
    error,
    inlineEditing = true,
    edited = false,
}: ProfileUsernameSectionProps) => {
    const { t } = useTranslation();
    const showEdited = edited && !inlineEditing;

    return (
        <>
            <ProfileRow
                label={t('username')}
                displayValue={showEdited ? value : username}
                editing={editing}
                onToggle={onToggle}
                edited={showEdited}
            />
            {editing && inlineEditing && (
                <ProfileInputField
                    label={t('new_username')}
                    htmlFor="new_username"
                    placeholder={t('username_placeholder')}
                    autoComplete="username"
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            )}
        </>
    );
};

export default ProfileUsernameSection;
