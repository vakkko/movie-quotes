import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';
import StyledAnchor from '@/components/StyledAnchor';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogOverlay,
} from '@/components/ui/dialog';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

type StatusModalProps = PropsWithChildren & {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    header: string;
    infotext: string;
    anchorText: string;
    href?: string;
    onAction?: () => void;
    closeStatusModal?: () => void;
};

const StatusModal = ({
    setShowModal,
    showModal,
    children,
    header,
    infotext,
    anchorText,
    href,
    onAction,
    closeStatusModal,
}: StatusModalProps) => {
    const { t } = useTranslation();

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogOverlay className="fixed inset-0 z-50" />
            <DialogContent
                className="border-none bg-dark-navy px-[9rem] py-[6rem] text-white max-sm:max-w-none sm:max-w-4xl"
                showCloseButton={false}
            >
                <DialogHeader className="items-center">{children}</DialogHeader>
                <div className="my-[3.9rem] text-center">
                    <h2 className="mb-[3rem] font-500-size-32 leading-[120%]">
                        {header}
                    </h2>
                    <p> {infotext}</p>
                </div>
                {onAction && (
                    <button
                        onClick={onAction}
                        className={cn(
                            'button-primary-red-background text-center',
                        )}
                    >
                        {anchorText}
                    </button>
                )}
                {href && (
                    <StyledAnchor href={href} redBackground>
                        {anchorText}
                    </StyledAnchor>
                )}
                {closeStatusModal && (
                    <button
                        onClick={closeStatusModal}
                        className="mt-[3.2rem] text-slate-gray"
                    >
                        {t('skip_confirm')}
                    </button>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default StatusModal;
