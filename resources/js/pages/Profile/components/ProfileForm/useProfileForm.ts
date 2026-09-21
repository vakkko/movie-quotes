import { useForm } from '@inertiajs/react';
import type { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { useToast } from '@/components/Toast/useToast';
import type { T } from '@/layouts/Header/components/AuthOptions/authValidation';
import { update as profileUpdate } from '@/routes/profile';
import {
    initialProfileForm,
    validateField,
    validateForm,
} from '../profileValidation';
import type {
    ProfileEditState,
    ProfileErrors,
    ProfileForm,
} from '../profileValidation';

export type ToggleKey = keyof ProfileEditState;

const emptyEditing: ProfileEditState = {
    username: false,
    email: false,
    password: false,
};

const emptyErrors: ProfileErrors = {
    username: '',
    email: '',
    current_password: '',
    password: '',
    password_confirmation: '',
    avatar: '',
};

const toggleField = (
    key: ToggleKey,
    editing: ProfileEditState,
    setEditing: Dispatch<SetStateAction<ProfileEditState>>,
    clearField: (key: keyof ProfileForm) => void,
) => {
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

export const useProfileForm = (t: T, isMobile = false) => {
    const { showToast } = useToast();
    const [initialForm] = useState(initialProfileForm);
    const [clientErrors, setClientErrors] =
        useState<ProfileErrors>(emptyErrors);
    const [editing, setEditing] = useState<ProfileEditState>(emptyEditing);
    const [modalField, setModalField] = useState<ToggleKey | null>(null);
    const [confirmingSave, setConfirmingSave] = useState(false);

    const { data, setData, patch, processing, errors, reset, clearErrors } =
        useForm<ProfileForm>(initialForm);

    const inlineEditing = !isMobile;

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

    const validateSingle = (key: keyof ProfileForm, value: string) => {
        clearErrors(key);

        const error = validateField(key, value, data, t, editing);

        setClientErrors((prev) => ({ ...prev, [key]: error }));

        return error;
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

                    if (isMobile) {
                        showToast('success', t('save_changes_success'));
                    }

                    resetState();
                },
                onError: () => {
                    if (isMobile) {
                        showToast('error', t('save_changes_failed'));
                    }
                },
            });
        }
    };

    const resetState = () => {
        setEditing(emptyEditing);
        setModalField(null);
        setConfirmingSave(false);
    };

    const openModal = (key: ToggleKey) => {
        setEditing((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
        setModalField(key);
    };

    const cancelEdit = (key: ToggleKey) => {
        toggleField(key, editing, setEditing, clearField);
        setModalField(null);
    };

    const confirmEdit = (key: ToggleKey) => {
        const errors =
            key === 'username'
                ? [validateSingle('username', data.username)]
                : key === 'email'
                  ? [validateSingle('email', data.email)]
                  : [
                        validateSingle(
                            'current_password',
                            data.current_password,
                        ),
                        validateSingle('password', data.password),
                        validateSingle(
                            'password_confirmation',
                            data.password_confirmation,
                        ),
                    ];

        if (errors.every((error) => error === '')) {
            setModalField(null);
        }
    };

    const rowEditing = (key: ToggleKey) =>
        inlineEditing ? editing[key] : false;

    return {
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
        openModal,
        cancelEdit,
        confirmEdit,
        inlineEditing,
        rowEditing,
    };
};
