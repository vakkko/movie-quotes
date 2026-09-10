import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { login as loginRoute } from '@/actions/App/Http/Controllers/AuthController';
import type { T } from '../authValidation';
import type { LoginForm } from './loginValidation';
import { initialForm, validateField, validateForm } from './loginValidation';

type LoginErrors = Record<keyof LoginForm, string>;

export const useLoginForm = (t: T, onSuccess?: () => void) => {
    const [clientErrors, setClientErrors] = useState<LoginErrors>({
        email: '',
        password: '',
        remember: '',
    });

    const { data, setData, post, processing, errors, clearErrors } =
        useForm<LoginForm>(initialForm);

    const fieldError = (key: keyof LoginForm) =>
        clientErrors[key] || errors[key];

    const handleChange = (key: keyof LoginForm, value: boolean | string) => {
        setData(key, value);
        clearErrors(key);

        const nextErrors: LoginErrors = {
            ...clientErrors,
            [key]: validateField(key, value, t),
        };

        setClientErrors(nextErrors);
    };

    const handleSubmit = (e: ChangeEvent) => {
        e.preventDefault();
        const nextErrors = validateForm(data, t);

        setClientErrors({
            email: nextErrors.email,
            password: nextErrors.password,
            remember: '',
        });

        if (!nextErrors.email && !nextErrors.password) {
            post(loginRoute.url(), {
                onSuccess,
            });
        }
    };

    return { data, fieldError, handleChange, handleSubmit, processing };
};
