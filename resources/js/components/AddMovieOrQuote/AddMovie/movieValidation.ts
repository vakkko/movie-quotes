import { createFieldValidator } from '@/lib/validation';
import type { TranslateFn } from '@/lib/validation';
import type { MovieDetail } from '@/types/types';

export type MovieForm = {
    title_en: string;
    title_ka: string;
    genre: string[];
    released_at: string;
    director_en: string;
    director_ka: string;
    description_en: string;
    description_ka: string;
    image: File | null;
};

export const initialForm: MovieForm = {
    title_en: '',
    title_ka: '',
    genre: [],
    released_at: '',
    director_en: '',
    director_ka: '',
    description_en: '',
    description_ka: '',
    image: null,
};

export const formFromMovie = (movie: MovieDetail): MovieForm => ({
    title_en: movie.title_en ?? '',
    title_ka: movie.title_ka ?? '',
    genre: movie.genres ?? [],
    released_at: movie.release_date ?? '',
    director_en: movie.director_en ?? '',
    director_ka: movie.director_ka ?? '',
    description_en: movie.description_en ?? '',
    description_ka: movie.description_ka ?? '',
    image: null,
});

export const validateField = createFieldValidator(
    ['title_en', 'director_en', 'description_en'],
    ['title_ka', 'director_ka', 'description_ka'],
);

export const validateForm = (
    form: MovieForm,
    t: TranslateFn,
    isEditing = false,
): Record<keyof MovieForm, string> => ({
    title_en: validateField('title_en', form.title_en, t),
    title_ka: validateField('title_ka', form.title_ka, t),
    genre: form.genre.length === 0 ? t('validation_required') : '',
    released_at: validateField('released_at', form.released_at, t),
    director_en: validateField('director_en', form.director_en, t),
    director_ka: validateField('director_ka', form.director_ka, t),
    description_en: validateField('description_en', form.description_en, t),
    description_ka: validateField('description_ka', form.description_ka, t),
    image: isEditing ? '' : validateField('image', form.image, t),
});
