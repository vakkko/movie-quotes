import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import type { T } from '@/layouts/Header/components/AuthOptions/authValidation';
import { update as profileUpdate } from '@/routes/profile';
import {
    initialProfileForm,
    validateField,
    validateForm,
} from './profileValidation';
import type { ProfileEditState } from './profileValidation';
import type { ProfileErrors, ProfileForm } from './profileValidation';

const emptyErrors: ProfileErrors = {
    username: '',
    email: '',
    current_password: '',
    password: '',
    password_confirmation: '',
    avatar: '',
};

export const useProfileForm = (
    t: T,
    editing: ProfileEditState,
    onSuccess?: () => void,
) => {
    const [initialForm] = useState(initialProfileForm);
    const [clientErrors, setClientErrors] =
        useState<ProfileErrors>(emptyErrors);

    const { data, setData, patch, processing, errors, reset, clearErrors } =
        useForm<ProfileForm>(initialForm);

    const fieldError = (key: keyof ProfileForm): string | undefined =>
        (clientErrors[key] || errors[key]) as string | undefined;

    const handleChange = (key: keyof ProfileForm, value: string) => {
        setData(key, value);
        clearErrors(key);

        const nextErrors: ProfileErrors = {
            ...clientErrors,
            [key]: validateField(key, value, data, t, editing),
        };

        if (key === 'password' && data.password_confirmation) {
            nextErrors.password_confirmation =
                value === data.password_confirmation
                    ? ''
                    : t('validation_confirmed');
        }

        setClientErrors(nextErrors);
    };

    const clearField = (key: keyof ProfileForm) => {
        setData(key, '');
        clearErrors(key);
        setClientErrors((prev) => ({ ...prev, [key]: '' }));
    };

    const handleAvatarChange = (file: File | null) => {
        setData('avatar', file);
        clearErrors('avatar');
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const nextErrors = validateForm(data, t, editing);

        setClientErrors(nextErrors);

        if (Object.values(nextErrors).every((message) => message === '')) {
            patch(profileUpdate.url(), {
                forceFormData: true,
                onSuccess: () => {
                    reset(
                        'current_password',
                        'password',
                        'password_confirmation',
                    );
                    setData('avatar', null);
                    setClientErrors(emptyErrors);
                    onSuccess?.();
                },
            });
        }
    };

    return {
        data,
        fieldError,
        handleChange,
        clearField,
        handleAvatarChange,
        handleSubmit,
        processing,
    };
};
