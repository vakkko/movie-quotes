import type { T } from '../authValidation';
import {
    validateEmailField,
    validatePasswordField,
    validatePasswordConfirmationField,
} from '../authValidation';

export type RegisterForm = {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export const initialForm: RegisterForm = {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
};

type FieldValidator = (value: string, form: RegisterForm, t: T) => string;

const requiredFirst =
    (
        invalidWhen: (value: string, form: RegisterForm) => boolean,
        message: (t: T) => string,
    ): FieldValidator =>
    (value, form, t) => {
        if (!value) {
            return t('validation_required');
        }

        return invalidWhen(value, form) ? message(t) : '';
    };

const validators: Record<keyof RegisterForm, FieldValidator> = {
    username: requiredFirst(
        (value) => !/^[a-z]{3,15}$/.test(value),
        (t) => t('validation_username'),
    ),
    email: (value, _form, t) => validateEmailField(value, t),
    password: (value, _form, t) => validatePasswordField(value, t),
    password_confirmation: (value, form, t) =>
        validatePasswordConfirmationField(value, form.password, t),
};

export const validateField = (
    key: keyof RegisterForm,
    value: string,
    form: RegisterForm,
    t: T,
): string => validators[key](value, form, t);

export const validateForm = (form: RegisterForm, t: T): RegisterForm =>
    Object.fromEntries(
        (Object.keys(form) as Array<keyof RegisterForm>).map((key) => [
            key,
            validateField(key, form[key], form, t),
        ]),
    ) as RegisterForm;
