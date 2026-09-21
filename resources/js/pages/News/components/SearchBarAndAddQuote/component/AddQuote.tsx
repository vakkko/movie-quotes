import { useRef, useState } from 'react';
import type { ReactNode } from 'react';
import AddMovieOrQuoteWrapper from '@/components/AddMovieOrQuote/AddMovieOrQuoteWrapper';
import ImageUpload from '@/components/AddMovieOrQuote/ImageUpload/ImageUpload';
import type { ImageUploadHandle } from '@/components/AddMovieOrQuote/ImageUpload/ImageUpload';
import MovieDropdown from '@/components/AddMovieOrQuote/MovieDropdown';
import MovieOrQuoteTextarea from '@/components/AddMovieOrQuote/MovieOrQuoteTextarea';
import useAddMovieOrQuote from '@/hooks/useAddMovieOrQuote';
import { useTranslation } from '@/hooks/useTranslation';
import MovieDetails from '@/pages/Movie/components/MovieDetails';
import { store as storeQuoteRoute } from '@/routes/news/quotes';
import type { Movie } from '@/types';
import { initialForm, validateField, validateForm } from './quoteValidation';

type MovieOption = {
    id: number;
    title: string;
};

type MovieBase = Pick<
    Movie,
    'id' | 'title' | 'released_at' | 'image_url' | 'genres' | 'director'
>;

type AddQuoteProps = {
    isExpanded?: boolean;
    movies: MovieOption[];
    movie?: MovieBase;
    triggerText?: string;
    triggerIcon?: ReactNode;
    modalTitle?: string;
    addQuoteFromMoviePage?: boolean;
};

const AddQuote = ({
    isExpanded = false,
    movies,
    movie,
    triggerText,
    triggerIcon,
    addQuoteFromMoviePage,
    modalTitle,
}: AddQuoteProps) => {
    const { t } = useTranslation();
    const singleMovie = movies.length === 1 ? movies[0] : null;
    const movieId =
        singleMovie?.id ?? (addQuoteFromMoviePage && movie ? movie.id : null);
    const [selectedMovie, setSelectedMovie] = useState<MovieOption | null>(
        singleMovie,
    );
    const [open, setOpen] = useState(false);
    const [formKey, setFormKey] = useState(0);
    const imageUploadRef = useRef<ImageUploadHandle>(null);

    const {
        data,
        fieldError,
        handleChange,
        handleImageChange,
        handleSubmit,
        processing,
    } = useAddMovieOrQuote(t, {
        initialForm:
            movieId !== null
                ? { ...initialForm, movie_id: String(movieId) }
                : initialForm,
        validateField,
        validateForm,
        url: storeQuoteRoute.url(),
        onSuccess: () => {
            setOpen(false);
            imageUploadRef.current?.reset();
            setSelectedMovie(singleMovie);
            setFormKey((prev) => prev + 1);
        },
    });

    const handleMovieChange = (movie: MovieOption | null) => {
        setSelectedMovie(movie);
        handleChange('movie_id', movie ? String(movie.id) : '');
    };

    return (
        <AddMovieOrQuoteWrapper
            triggerText={triggerText ? triggerText : t('write_quote')}
            triggerIcon={triggerIcon}
            isExpanded={isExpanded}
            title={modalTitle ? modalTitle : t('write_quote')}
            open={open}
            onOpenChange={setOpen}
        >
            <form
                key={formKey}
                onSubmit={handleSubmit}
                className="mt-[2.4rem] flex-column gap-[2.4rem]"
            >
                {addQuoteFromMoviePage && movie && (
                    <MovieDetails
                        data={movie}
                        addQuoteFromMoviePage={addQuoteFromMoviePage}
                    />
                )}
                <MovieOrQuoteTextarea
                    placeholder="Start create new quote"
                    languageBadge="ENG"
                    name="quote_en"
                    value={data.quote_en}
                    onChange={(value) => handleChange('quote_en', value)}
                    error={fieldError('quote_en')}
                />
                <MovieOrQuoteTextarea
                    placeholder="ახალი ციტატა"
                    languageBadge="ქარ"
                    name="quote_ka"
                    value={data.quote_ka}
                    onChange={(value) => handleChange('quote_ka', value)}
                    error={fieldError('quote_ka')}
                />
                <ImageUpload
                    ref={imageUploadRef}
                    onFileChange={handleImageChange}
                    error={fieldError('image')}
                />
                {!addQuoteFromMoviePage && (
                    <MovieDropdown
                        movies={movies}
                        value={selectedMovie}
                        onChange={handleMovieChange}
                        disabled={Boolean(singleMovie) || movies.length === 0}
                    />
                )}
                {fieldError('movie_id') && (
                    <span className="text-[1.4rem] text-primary-red">
                        {fieldError('movie_id')}
                    </span>
                )}
                <button
                    className="button-primary-red-background"
                    type="submit"
                    disabled={processing}
                >
                    {t('post')}
                </button>
            </form>
        </AddMovieOrQuoteWrapper>
    );
};

export default AddQuote;
