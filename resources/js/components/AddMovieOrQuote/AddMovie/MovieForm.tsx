import { useRef } from 'react';
import {
    store as storeMovieRoute,
    update as updateMovieRoute,
} from '@/actions/App/Http/Controllers/MovieController';
import AddMovieOrQuoteWrapper from '@/components/AddMovieOrQuote/AddMovieOrQuoteWrapper';
import DatePicker from '@/components/AddMovieOrQuote/DatePicker';
import GenresDropdown from '@/components/AddMovieOrQuote/GenresDropdown/GenresDropdown';
import ImageUpload from '@/components/AddMovieOrQuote/ImageUpload/ImageUpload';
import type { ImageUploadHandle } from '@/components/AddMovieOrQuote/ImageUpload/ImageUpload';
import MovieOrQuoteInput from '@/components/AddMovieOrQuote/MovieOrQuoteInput';
import MovieOrQuoteTextarea from '@/components/AddMovieOrQuote/MovieOrQuoteTextarea';
import useAddMovieOrQuote from '@/hooks/useAddMovieOrQuote';
import { useTranslation } from '@/hooks/useTranslation';
import type { MovieShowResponse } from '@/types';
import {
    formFromMovie,
    initialForm,
    validateField,
    validateForm,
} from './movieValidation';

type MovieFormProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    movie?: MovieShowResponse;
    editMovie?: boolean;
};

const MovieForm = ({
    open,
    onOpenChange,
    movie,
    editMovie,
}: MovieFormProps) => {
    const { t } = useTranslation();
    const imageUploadRef = useRef<ImageUploadHandle>(null);
    const isEditing = Boolean(movie);

    const {
        data,
        fieldError,
        handleChange,
        handleImageChange,
        handleSubmit,
        processing,
    } = useAddMovieOrQuote(t, {
        initialForm: movie ? formFromMovie(movie.data) : initialForm,
        validateField,
        validateForm: (form, translate) =>
            validateForm(form, translate, isEditing),
        url: movie
            ? updateMovieRoute.url(movie.data.id)
            : storeMovieRoute.url(),
        method: isEditing ? 'put' : 'post',
        onSuccess: () => {
            onOpenChange(false);
            imageUploadRef.current?.reset();
        },
    });

    return (
        <AddMovieOrQuoteWrapper
            addMovie
            triggerText={t('add_movie')}
            title={isEditing ? t('edit_movie') : t('add_movie')}
            hideTrigger={isEditing}
            open={open}
            onOpenChange={onOpenChange}
        >
            <form
                onSubmit={handleSubmit}
                className="mt-[2.8rem] flex-column gap-[2.4rem]"
            >
                <MovieOrQuoteInput
                    placeholder="Movie name"
                    languageBadge="Eng"
                    name="title_en"
                    value={data.title_en}
                    onChange={(value) => handleChange('title_en', value)}
                    error={fieldError('title_en')}
                    editMovie={editMovie}
                />
                <MovieOrQuoteInput
                    placeholder="ფილმის სახელი"
                    languageBadge="ქარ"
                    name="title_ka"
                    value={data.title_ka}
                    onChange={(value) => handleChange('title_ka', value)}
                    error={fieldError('title_ka')}
                    editMovie={editMovie}
                />
                <GenresDropdown
                    value={data.genre}
                    onChange={(value) => handleChange('genre', value)}
                    error={fieldError('genre')}
                />
                <DatePicker
                    value={data.released_at}
                    onChange={(value) => handleChange('released_at', value)}
                    error={fieldError('released_at')}
                />
                <MovieOrQuoteInput
                    placeholder="Director"
                    languageBadge="Eng"
                    name="director_en"
                    value={data.director_en}
                    onChange={(value) => handleChange('director_en', value)}
                    error={fieldError('director_en')}
                    editMovie={editMovie}
                />
                <MovieOrQuoteInput
                    placeholder="რეჟისორი"
                    languageBadge="ქარ"
                    name="director_ka"
                    value={data.director_ka}
                    onChange={(value) => handleChange('director_ka', value)}
                    error={fieldError('director_ka')}
                    editMovie={editMovie}
                />
                <MovieOrQuoteTextarea
                    placeholder="Movie discription"
                    languageBadge="Eng"
                    name="description_en"
                    value={data.description_en}
                    onChange={(value) => handleChange('description_en', value)}
                    error={fieldError('description_en')}
                    editMovie={editMovie}
                />
                <MovieOrQuoteTextarea
                    placeholder="ფილმის აღწერა"
                    languageBadge="ქარ"
                    name="description_ka"
                    value={data.description_ka}
                    onChange={(value) => handleChange('description_ka', value)}
                    error={fieldError('description_ka')}
                    editMovie={editMovie}
                />
                <ImageUpload
                    ref={imageUploadRef}
                    onFileChange={handleImageChange}
                    initialPreview={isEditing ? movie?.data.image_url : null}
                    error={fieldError('image')}
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="mt-[2rem] w-full button-primary-red-background"
                >
                    {isEditing ? t('save_changes') : t('add_movie')}
                </button>
            </form>
        </AddMovieOrQuoteWrapper>
    );
};

export default MovieForm;
