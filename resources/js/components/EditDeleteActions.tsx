import { Minus, Pencil, Trash2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

type EditDeleteActionsProps = {
    showModal: string | null;
    handleCancel: () => void;
    handleEditClick: () => void;
    isDeleting?: boolean;
    handleDeleteClick: () => void;
};

const EditDeleteActions = ({
    showModal,
    handleCancel,
    handleEditClick,
    isDeleting,
    handleDeleteClick,
}: EditDeleteActionsProps) => {
    const { t } = useTranslation();

    return (
        <div className="flex gap-[2.5rem]">
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
