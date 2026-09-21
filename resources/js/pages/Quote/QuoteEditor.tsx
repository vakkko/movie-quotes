import { useHttp } from '@inertiajs/react';
import MovieOrQuoteTextarea from '@/components/AddMovieOrQuote/MovieOrQuoteTextarea';
import { useTranslation } from '@/hooks/useTranslation';
import QuoteCard from '@/pages/News/components/Quotes/QuoteCard';
import type { Quote } from '@/pages/News/types';
import { update as updateQuoteRoute } from '@/routes/news/quotes';
import type { User } from '@/types';

type QuoteEditorProps = {
    quote: Quote;
    user: User | null;
    isEditing: boolean;
    imagePreview: string | null;
    onImageChange: (preview: string | null) => void;
    onSaved: () => void;
};

const QuoteEditor = ({
    quote,
    user,
    isEditing,
    imagePreview,
    onImageChange,
    onSaved,
}: QuoteEditorProps) => {
    const { t } = useTranslation();

    const { data, setData, put, processing } = useHttp({
        quote_en: String(quote?.quote_en ?? ''),
        quote_ka: String(quote?.quote_ka ?? ''),
        image: null as File | null,
    });

    const handleImageChange = (file: File | null) => {
        onImageChange(file ? URL.createObjectURL(file) : null);
        setData('image', file);
    };

    const handleSave = () => {
        put(updateQuoteRoute.url(quote.id), {
            onSuccess: () => {
                onSaved();
            },
        });
    };

    return (
        <>
            <QuoteCard
                quote={quote}
                user={user}
                isEditing={isEditing}
                imagePreview={imagePreview}
                onImageChange={isEditing ? handleImageChange : undefined}
            >
                <div className="mt-[2.4rem] mb-[3.2rem] flex-column gap-[2rem]">
                    <MovieOrQuoteTextarea
                        placeholder="Quote"
                        languageBadge="Eng"
                        name="quote_en"
                        value={data.quote_en}
                        onChange={(value) => setData('quote_en', value)}
                        readOnly={!isEditing}
                    />
                    <MovieOrQuoteTextarea
                        placeholder="ციტატა"
                        languageBadge="ქარ"
                        name="quote_ka"
                        value={data.quote_ka}
                        onChange={(value) => setData('quote_ka', value)}
                        readOnly={!isEditing}
                    />
                </div>
            </QuoteCard>
            {isEditing && (
                <button
                    className="w-full button-primary-red-background"
                    onClick={handleSave}
                    disabled={processing}
                >
                    {t('save_changes')}
                </button>
            )}
        </>
    );
};

export default QuoteEditor;
