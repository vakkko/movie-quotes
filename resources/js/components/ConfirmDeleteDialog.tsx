import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';

type ConfirmDeleteDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    message: string;
    onConfirm: () => void;
    isDeleting?: boolean;
};

const ConfirmDeleteDialog = ({
    open,
    onOpenChange,
    message,
    onConfirm,
    isDeleting,
}: ConfirmDeleteDialogProps) => {
    const { t } = useTranslation();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="border-none bg-black p-0 sm:max-w-lg"
                showCloseButton={false}
            >
                <div className="flex-column flex items-center gap-[2rem] px-[4rem] py-[3rem] text-center">
                    <p className="font-500-size-24 text-white">{message}</p>
                    <div className="flex gap-[2rem]">
                        <button
                            className="button-primary-red-background"
                            onClick={onConfirm}
                            disabled={isDeleting}
                        >
                            {t('delete')}
                        </button>
                        <button
                            className="button-transparent-background-white-border"
                            onClick={() => onOpenChange(false)}
                            disabled={isDeleting}
                        >
                            {t('cancel')}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDeleteDialog;
