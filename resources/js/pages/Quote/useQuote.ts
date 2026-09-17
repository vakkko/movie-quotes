import { router, useHttp } from '@inertiajs/react';
import { useState } from 'react';
import { news } from '@/routes';
import { destroy as destroyQuoteRoute } from '@/routes/news/quotes';
import type { Quote as QuoteData } from '../News/types';

type UseQuoteOptions = {
    quote: QuoteData;
    editing?: boolean;
};

export const useQuote = ({ quote, editing = false }: UseQuoteOptions) => {
    const { delete: handleDelete, processing: isDeleting } = useHttp({});
    const [showModal, setShowModal] = useState<'edit' | 'delete' | null>(
        editing ? 'edit' : null,
    );
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleCancel = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setImagePreview(null);
        setShowModal(null);
    };

    const handleDeleteQuote = () => {
        handleDelete(destroyQuoteRoute.url(quote.id), {
            onSuccess: () => {
                setShowModal(null);
                router.visit(news.url());
            },
        });
    };

    const handleSaved = () => {
        setImagePreview(null);
        setShowModal(null);
        router.reload({ only: ['quote'] });
    };

    const handleEditClick = () => setShowModal('edit');

    const handleDeleteClick = () => setShowModal('delete');

    const handleModalOpenChange = (open: boolean) => {
        if (!open) {
            setShowModal(null);
        }
    };

    return {
        showModal,
        imagePreview,
        isDeleting,
        handleCancel,
        handleDeleteQuote,
        handleSaved,
        handleEditClick,
        handleDeleteClick,
        handleModalOpenChange,
        onImageChange: setImagePreview,
    };
};
