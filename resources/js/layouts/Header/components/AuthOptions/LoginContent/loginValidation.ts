import type { T } from '../authValidation';

export type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

export const initialForm: LoginForm = {
    email: '',
    password: '',
    remember: false,
};

export const validateField = (
    key: keyof LoginForm,
    value: boolean | string,
    t: T,
): string => {
    if (key === 'remember') {
        return '';
    }

    if (!value) {
        return t('validation_required');
    }

    if (key === 'email' && !/^\S+@\S+\.\S+$/.test(String(value))) {
        return t('validation_email');
    }

    return '';
};

export const validateForm = (form: LoginForm, t: T): LoginForm => ({
    email: validateField('email', form.email, t),
    password: validateField('password', form.password, t),
    remember: false,
});
