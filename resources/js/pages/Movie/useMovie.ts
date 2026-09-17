import { router, useHttp, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { movies } from '@/routes';
import { destroy as destroyMovieRoute } from '@/routes/movies';
import { destroy as destroyQuoteRoute } from '@/routes/news/quotes';
import type { MovieQuote } from '@/types';
import type { SharedPageProps } from '@/types/global';

type DeleteTarget = { kind: 'movie' } | { kind: 'quote'; quote: MovieQuote };

type UseMovieOptions = {
    movieId: number;
};

const useMovie = ({ movieId }: UseMovieOptions) => {
    const { user } = usePage<SharedPageProps>().props;
    const { t } = useTranslation();
    const { delete: handleDelete, processing: isDeleting } = useHttp({});
    const [showModal, setShowModal] = useState<'edit' | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);

    const handleConfirmDelete = () => {
        if (!deleteTarget) {
            return;
        }

        if (deleteTarget.kind === 'movie') {
            handleDelete(destroyMovieRoute.url(movieId), {
                onSuccess: () => {
                    router.visit(movies.url());
                },
            });

            return;
        }

        handleDelete(destroyQuoteRoute.url(deleteTarget.quote.id), {
            onSuccess: () => {
                setDeleteTarget(null);
                router.reload({ only: ['movie'] });
            },
        });
    };

    const deleteMessage =
        deleteTarget?.kind === 'quote'
            ? t('delete_quote_confirmation')
            : t('delete_movie_confirmation');

    return {
        user,
        showModal,
        isDeleting,
        deleteTarget,
        deleteMessage,
        handleConfirmDelete,
        handleDeleteMovie: () => setDeleteTarget({ kind: 'movie' }),
        handleDeleteQuote: (quote: MovieQuote) =>
            setDeleteTarget({ kind: 'quote', quote }),
        handleCancelDelete: () => setDeleteTarget(null),
        handleShowModalChange: setShowModal,
    };
};

export default useMovie;
