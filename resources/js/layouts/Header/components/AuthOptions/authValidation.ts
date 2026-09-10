export type T = (key: string) => string;

export const validateEmailField = (value: string, t: T): string => {
    if (!value) {
        return t('validation_required');
    }

    if (!/^\S+@\S+\.\S+$/.test(value)) {
        return t('validation_email');
    }

    return '';
};

export const validatePasswordField = (value: string, t: T): string => {
    if (!value) {
        return t('validation_required');
    }

    if (!/^[a-z]{8,15}$/.test(value)) {
        return t('validation_password');
    }

    return '';
};

export const validatePasswordConfirmationField = (
    value: string,
    password: string,
    t: T,
): string => {
    if (!value) {
        return t('validation_required');
    }

    if (value !== password) {
        return t('validation_confirmed');
    }

    return '';
};
