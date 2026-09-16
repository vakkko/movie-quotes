import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { send as resendVerification } from '@/routes/verification';
import ProfileInputField from './ProfileInputField';
import ProfileRow from './ProfileRow';

type ProfileEmailSectionProps = {
    email: string;
    pendingEmail: string | null;
    editing: boolean;
    onToggle: () => void;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    hideButton?: boolean;
};

const ProfileEmailSection = ({
    email,
    pendingEmail,
    editing,
    onToggle,
    value,
    onChange,
    error,
    hideButton,
}: ProfileEmailSectionProps) => {
    const { t } = useTranslation();
    const [sending, setSending] = useState(false);

    const handleResend = () => {
        setSending(true);
        router.post(
            resendVerification.url(),
            { email: pendingEmail },
            {
                preserveScroll: true,
                onFinish: () => setSending(false),
            },
        );
    };

    return (
        <>
            <ProfileRow
                label={t('email')}
                displayValue={email}
                editing={editing}
                onToggle={onToggle}
                hideButton={hideButton}
            />
            {pendingEmail && (
                <div className="flex-items-center w-full gap-[1.2rem] rounded-[0.4rem] bg-primary-red/10 px-[1.3rem] py-[0.8rem]">
                    <span className="flex-1 text-[1.4rem] text-slate-gray">
                        {t('pending_email_notice')}{' '}
                        <span className="font-600 text-cream">{pendingEmail}</span>{' '}
                        {t('pending_email_check_inbox')}
                    </span>
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={sending}
                        className="text-[1.4rem] font-600 text-primary-red"
                    >
                        {t('resend')}
                    </button>
                </div>
            )}
            {editing && (
                <ProfileInputField
                    label={t('new_email')}
                    htmlFor="new_email"
                    type="email"
                    placeholder={t('enter_your_email')}
                    autoComplete="email"
                    value={value}
                    onChange={onChange}
                    error={error}
                />
            )}
        </>
    );
};

export default ProfileEmailSection;
