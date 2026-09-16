import { Link, usePage } from '@inertiajs/react';
import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog';
import EditDeleteActions from '@/components/EditDeleteActions';
import { useTranslation } from '@/hooks/useTranslation';
import DefaultLayout from '@/layouts/DefaultLayout';
import { news } from '@/routes';
import type { SharedPageProps } from '@/types/global';
import type { Quote as QuoteData } from '../News/types';
import QuoteEditor from './QuoteEditor';
import { useQuote } from './useQuote';

type QuoteProps = {
    quote: QuoteData;
    editing?: boolean;
};

const Quote = ({ quote, editing = false }: QuoteProps) => {
    const { user } = usePage<SharedPageProps>().props;
    const { t } = useTranslation();
    const {
        showModal,
        imagePreview,
        isDeleting,
        handleCancel,
        handleDeleteQuote,
        handleSaved,
        handleEditClick,
        handleDeleteClick,
        handleModalOpenChange,
        onImageChange,
    } = useQuote({ quote, editing });

    return (
        <div className="mx-auto flex w-full flex-col rounded-[1.2rem] bg-black sm:max-w-7xl">
            <div className="flex shrink-0 flex-row items-center justify-between border-b border-b-cloud-gray px-[4.6rem] pt-[4rem] pb-[2.4rem]">
                <EditDeleteActions
                    handleCancel={handleCancel}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    showModal={showModal}
                    isDeleting={isDeleting}
                />
                <span className="font-500-size-24 text-white">
                    {t('view_quote')}
                </span>
                <Link href={news.url()} className="text-white">
                    {t('back_to_news')}
                </Link>
            </div>
            <div className="scrollbar-hide overflow-y-auto px-[2.2rem]">
                {showModal !== 'delete' && quote && (
                    <QuoteEditor
                        key={quote.id}
                        quote={quote}
                        user={user}
                        isEditing={showModal === 'edit'}
                        imagePreview={imagePreview}
                        onImageChange={onImageChange}
                        onSaved={handleSaved}
                    />
                )}
            </div>
            <ConfirmDeleteDialog
                open={showModal === 'delete'}
                onOpenChange={handleModalOpenChange}
                message={t('delete_quote_confirmation')}
                onConfirm={handleDeleteQuote}
                isDeleting={isDeleting}
            />
        </div>
    );
};

Quote.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;

export default Quote;