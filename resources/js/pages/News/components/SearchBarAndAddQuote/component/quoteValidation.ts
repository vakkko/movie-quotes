import { createFieldValidator } from '@/lib/validation';
import type { TranslateFn } from '@/lib/validation';

export type QuoteForm = {
    quote_en: string;
    quote_ka: string;
    movie_id: string;
    image: File | null;
};

export const initialForm: QuoteForm = {
    quote_en: '',
    quote_ka: '',
    movie_id: '',
    image: null,
};

export const validateField = createFieldValidator(['quote_en'], ['quote_ka']);

export const validateForm = (
    form: QuoteForm,
    t: TranslateFn,
): Record<keyof QuoteForm, string> => ({
    quote_en: validateField('quote_en', form.quote_en, t),
    quote_ka: validateField('quote_ka', form.quote_ka, t),
    movie_id: validateField('movie_id', form.movie_id, t),
    image: validateField('image', form.image, t),
});
