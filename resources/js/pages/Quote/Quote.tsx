import { Link, router, useHttp, usePage } from '@inertiajs/react';
import { useState } from 'react';
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog';
import EditDeleteActions from '@/components/EditDeleteActions';
import { useTranslation } from '@/hooks/useTranslation';
import DefaultLayout from '@/layouts/DefaultLayout';
import { news } from '@/routes';
import { destroy as destroyQuoteRoute } from '@/routes/news/quotes';
import type { SharedPageProps } from '@/types/global';
import type { Quote as QuoteData } from '../News/types';
import QuoteEditor from './QuoteEditor';

type QuoteProps = {
    quote: QuoteData;
    editing?: boolean;
};

const Quote = ({ quote, editing = false }: QuoteProps) => {
    const { user } = usePage<SharedPageProps>().props;
    const { t } = useTranslation();

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
        if (!quote) {
            return;
        }

        handleDelete(destroyQuoteRoute.url(quote.id), {
            onSuccess: () => {
                setShowModal(null);
                router.visit(news.url());
            },
        });
    };

    return (
        <div className="mx-auto flex w-full flex-col rounded-[1.2rem] bg-black sm:max-w-7xl">
            <header className="flex shrink-0 flex-row items-center justify-between border-b border-b-cloud-gray px-[4.6rem] pt-[4rem] pb-[2.4rem]">
                <EditDeleteActions
                    handleCancel={handleCancel}
                    handleEditClick={() => setShowModal('edit')}
                    handleDeleteClick={() => setShowModal('delete')}
                    showModal={showModal}
                    isDeleting={isDeleting}
                />
                <span className="font-500-size-24 text-white">
                    {t('view_quote')}
                </span>
                <Link href={news.url()} className="text-white">
                    {t('back_to_news')}
                </Link>
            </header>
            <div className="scrollbar-hide overflow-y-auto px-[2.2rem]">
                {showModal !== 'delete' && quote && (
                    <QuoteEditor
                        key={quote.id}
                        quote={quote}
                        user={user}
                        isEditing={showModal === 'edit'}
                        imagePreview={imagePreview}
                        onImageChange={setImagePreview}
                        onSaved={() => {
                            setImagePreview(null);
                            setShowModal(null);
                            router.reload({ only: ['quote'] });
                        }}
                    />
                )}
            </div>
            <ConfirmDeleteDialog
                open={showModal === 'delete'}
                onOpenChange={(open) => !open && setShowModal(null)}
                message={t('delete_quote_confirmation')}
                onConfirm={handleDeleteQuote}
                isDeleting={isDeleting}
            />
        </div>
    );
};

Quote.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

export default Quote;
