import { useForm } from '@inertiajs/react';
import { useSocketId } from '@laravel/echo-react';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { TranslateFn } from '@/lib/validation';

type AddForm = Record<string, string | string[] | File | null>;

type UseAddMovieOrQuoteOptions<Form extends AddForm> = {
    initialForm: Form;
    validateField: (
        key: keyof Form,
        value: string | string[] | File | null,
        t: TranslateFn,
    ) => string;
    validateForm: (form: Form, t: TranslateFn) => Record<keyof Form, string>;
    url: string;
    method?: 'post' | 'put';
    onSuccess?: () => void;
};

const emptyErrorsFor = <Form extends object>(
    form: Form,
): Record<keyof Form, string> =>
    Object.fromEntries(Object.keys(form).map((key) => [key, ''])) as Record<
        keyof Form,
        string
    >;

const useAddMovieOrQuote = <Form extends AddForm>(
    t: TranslateFn,
    {
        initialForm,
        validateField,
        validateForm,
        url,
        method = 'post',
        onSuccess,
    }: UseAddMovieOrQuoteOptions<Form>,
) => {
    const [emptyErrors] = useState(() => emptyErrorsFor(initialForm));
    const [clientErrors, setClientErrors] =
        useState<Record<keyof Form, string>>(emptyErrors);

    const socketId = useSocketId();

    const form = useForm<AddForm>(initialForm);
    const { setData, post, put, processing, errors, clearErrors, reset } = form;
    const data = form.data as Form;

    const fieldError = (key: keyof Form) =>
        clientErrors[key] || errors[key as string];

    const handleChange = (key: string, value: string | string[]) => {
        setData(key, value);
        clearErrors(key);

        setClientErrors((prev) => ({
            ...prev,
            [key]: validateField(key as keyof Form, value, t),
        }));
    };

    const handleImageChange = (file: File | null) => {
        setData('image', file);
        clearErrors('image');

        setClientErrors((prev) => ({
            ...prev,
            image: file ? '' : validateField('image', null, t),
        }));
    };

    const handleSubmit = (e: ChangeEvent) => {
        e.preventDefault();
        const allErrors = validateForm(data, t);

        setClientErrors(allErrors);

        const hasErrors = Object.values(allErrors).some(
            (error) => error !== '',
        );

        if (!hasErrors) {
            const options = {
                forceFormData: true,
                headers: socketId ? { 'X-Socket-ID': socketId } : undefined,
                onSuccess: () => {
                    reset();
                    setClientErrors(emptyErrors);
                    onSuccess?.();
                },
            };

            if (method === 'put') {
                put(url, options);
            } else {
                post(url, options);
            }
        }
    };

    return {
        data,
        fieldError,
        handleChange,
        handleImageChange,
        handleSubmit,
        processing,
    };
};

export default useAddMovieOrQuote;
