import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { register as registerRoute } from '@/actions/App/Http/Controllers/AuthController';
import type { T } from '../authValidation';
import type { RegisterForm } from './registerValidation';
import { initialForm, validateField, validateForm } from './registerValidation';

export const useRegisterForm = (t: T) => {
    const [clientErrors, setClientErrors] = useState<RegisterForm>(initialForm);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
        isDirty,
    } = useForm<RegisterForm>(initialForm);

    const fieldError = (key: keyof RegisterForm) =>
        clientErrors[key] || errors[key];

    const handleChange = (key: keyof RegisterForm, value: string) => {
        setData(key, value);
        clearErrors(key);

        const nextErrors: RegisterForm = {
            ...clientErrors,
            [key]: validateField(key, value, data, t),
        };

        if (key === 'password' && data.password_confirmation) {
            nextErrors.password_confirmation =
                value === data.password_confirmation
                    ? ''
                    : t('validation_confirmed');
        }

        setClientErrors(nextErrors);
    };

    const handleSubmit = () => {
        const nextErrors = validateForm(data, t);

        setClientErrors(nextErrors);

        if (Object.values(nextErrors).every((message) => message === '')) {
            post(registerRoute.url(), {
                onSuccess: () => reset(),
            });
        }
    };

    return {
        data,
        fieldError,
        handleChange,
        handleSubmit,
        processing,
        isDirty,
        setData,
    };
};
