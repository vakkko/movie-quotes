import { useForm } from '@inertiajs/react';
import type { ChangeEvent } from 'react';
import { forgot as sendPasswordReset } from '@/routes/password';
import type { T } from '../../../authValidation';
import { validateEmailField } from '../../../authValidation';

type PasswordResetForm = {
    email: string;
};

export const useEmailVerifyForm = (t: T, onSuccess: () => void) => {
    const { data, setData, post, processing, errors, setError, clearErrors } =
        useForm<PasswordResetForm>({ email: '' });

    const validatePasswordResetForm = (
        form: PasswordResetForm,
        t: T,
    ): PasswordResetForm => ({
        email: validateEmailField(form.email, t),
    });

    const fieldError = (key: keyof PasswordResetForm) => errors[key] ?? '';

    const handleChange = (value: string) => {
        setData('email', value);
        const error = validateEmailField(value, t);

        if (error) {
            setError('email', error);
        } else {
            clearErrors('email');
        }
    };

    const handleSubmit = (e: ChangeEvent) => {
        e.preventDefault();

        const nextErrors = validatePasswordResetForm(data, t);

        if (nextErrors.email) {
            setError('email', nextErrors.email);

            return;
        }

        clearErrors('email');
        post(sendPasswordReset.url(), { onSuccess });
    };

    return { data, fieldError, handleChange, handleSubmit, processing };
};
