import type { T } from '@/layouts/Header/components/AuthOptions/authValidation';
import {
    validateEmailField,
    validatePasswordConfirmationField,
} from '@/layouts/Header/components/AuthOptions/authValidation';

export type ProfileForm = {
    username: string;
    email: string;
    current_password: string;
    password: string;
    password_confirmation: string;
    avatar: File | null;
};

export type ProfileErrors = Record<keyof ProfileForm, string>;

export type ProfileEditState = {
    username: boolean;
    email: boolean;
    password: boolean;
};

export const initialProfileForm = (): ProfileForm => ({
    username: '',
    email: '',
    current_password: '',
    password: '',
    password_confirmation: '',
    avatar: null,
});

const usernameValidator = (value: string, required: boolean, t: T): string => {
    if (!value) {
        return required ? t('validation_required') : '';
    }

    return /^[a-z]{3,15}$/.test(value) ? '' : t('validation_username');
};

const emailValidator = (value: string, required: boolean, t: T): string => {
    if (!value) {
        return required ? t('validation_required') : '';
    }

    return validateEmailField(value, t);
};

const passwordValidator = (value: string, t: T): string => {
    if (!value) {
        return t('validation_required');
    }

    return /^[a-z]{8,15}$/.test(value) ? '' : t('validation_password');
};

export const validateField = (
    key: keyof ProfileForm,
    value: string | File | null,
    form: ProfileForm,
    t: T,
    editing: ProfileEditState,
): string => {
    if (key === 'avatar') {
        return '';
    }

    if (key === 'username') {
        return usernameValidator(value as string, editing.username, t);
    }

    if (key === 'email') {
        return emailValidator(value as string, editing.email, t);
    }

    if (editing.password) {
        if (key === 'current_password') {
            return value ? '' : t('validation_required');
        }

        if (key === 'password') {
            return passwordValidator(value as string, t);
        }

        if (key === 'password_confirmation') {
            return validatePasswordConfirmationField(
                value as string,
                form.password,
                t,
            );
        }
    }

    return '';
};

export const validateForm = (
    form: ProfileForm,
    t: T,
    editing: ProfileEditState,
): ProfileErrors => ({
    username: validateField('username', form.username, form, t, editing),
    email: validateField('email', form.email, form, t, editing),
    current_password: validateField(
        'current_password',
        form.current_password,
        form,
        t,
        editing,
    ),
    password: validateField('password', form.password, form, t, editing),
    password_confirmation: validateField(
        'password_confirmation',
        form.password_confirmation,
        form,
        t,
        editing,
    ),
    avatar: '',
});