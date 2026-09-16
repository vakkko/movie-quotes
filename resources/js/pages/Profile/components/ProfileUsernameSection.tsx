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
};

const ProfileUsernameSection = ({
    username,
    editing,
    onToggle,
    value,
    onChange,
    error,
}: ProfileUsernameSectionProps) => {
    const { t } = useTranslation();

    return (
        <>
            <ProfileRow
                label={t('username')}
                displayValue={username}
                editing={editing}
                onToggle={onToggle}
            />
            {editing && (
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
