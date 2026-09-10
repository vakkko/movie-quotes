import { useForm } from '@inertiajs/react';
import type { ChangeEvent } from 'react';
import { resetPassword } from '@/actions/App/Http/Controllers/AuthController';
import type { T } from '../../../authValidation';
import {
    validatePasswordField,
    validatePasswordConfirmationField,
} from '../../../authValidation';

export type CreatePasswordForm = {
    email: string;
    password: string;
    password_confirmation: string;
};

const initialForm = {
    password: '',
    password_confirmation: '',
};

export const useCreatePasswordForm = (
    t: T,
    email: string,
    onSuccess: () => void,
) => {
    const { data, setData, post, processing, errors, clearErrors, setError } =
        useForm<CreatePasswordForm>({ ...initialForm, email });

    const fieldError = (key: keyof CreatePasswordForm) =>
        errors[key as keyof CreatePasswordForm] || '';

    const handleChange = (
        key: Exclude<keyof CreatePasswordForm, 'email'>,
        value: string,
    ) => {
        setData(key, value);
        clearErrors(key);

        let error = '';

        if (key === 'password') {
            error = validatePasswordField(value, t);
        } else if (key === 'password_confirmation') {
            error = validatePasswordConfirmationField(value, data.password, t);
        }

        if (error) {
            setError({ [key]: error });
        }

        if (key === 'password' && data.password_confirmation) {
            const confirmError =
                value === data.password_confirmation
                    ? ''
                    : t('validation_confirmed');

            if (confirmError) {
                setError({ password_confirmation: confirmError });
            }
        }
    };

    const handleSubmit = (e: ChangeEvent) => {
        e.preventDefault();

        const newErrors: Record<string, string> = {};

        const passwordError = validatePasswordField(data.password, t);

        if (passwordError) {
            newErrors.password = passwordError;
        }

        const confirmError = validatePasswordConfirmationField(
            data.password_confirmation,
            data.password,
            t,
        );

        if (confirmError) {
            newErrors.password_confirmation = confirmError;
        }

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);

            return;
        }

        post(resetPassword.url(), { onSuccess });
    };

    return { data, fieldError, handleChange, handleSubmit, processing };
};
