import { Minus, Pencil, Trash2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

type EditDeleteActionsProps = {
    showModal?: string | null;
    handleCancel: () => void;
    handleEditClick: () => void;
    isDeleting?: boolean;
    handleDeleteClick?: () => void;
    className?: string;
};

const EditDeleteActions = ({
    showModal,
    handleCancel,
    handleEditClick,
    isDeleting,
    handleDeleteClick,
    className,
}: EditDeleteActionsProps) => {
    const { t } = useTranslation();

    return (
        <div className={cn('flex-items-center gap-[1.5rem]', className)}>
            {showModal === 'edit' ? (
                <button
                    className="flex-items-center gap-[1rem] text-white"
                    onClick={handleCancel}
                >
                    {t('cancel')}
                </button>
            ) : (
                <button onClick={handleEditClick}>
                    <Pencil />
                </button>
            )}
            <Minus className="h-full rotate-90" color="#6c757d" />
            <button onClick={handleDeleteClick} disabled={isDeleting}>
                <Trash2 />
            </button>
        </div>
    );
};

export default EditDeleteActions;
