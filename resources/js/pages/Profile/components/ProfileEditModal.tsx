import type { PropsWithChildren } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

type ProfileEditModalProps = PropsWithChildren<{
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    confirmLabel?: string;
}>;

const ProfileEditModal = ({
    isOpen,
    onCancel,
    onConfirm,
    confirmLabel,
    children,
}: ProfileEditModalProps) => {
    const { t } = useTranslation();

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className={cn(
                'absolute top-[-10rem] z-50 flex h-[100vh] w-[100vw] justify-center bg-deep-navy',
                { 'h-fit bg-charcoal-navy': confirmLabel },
            )}
        >
            {confirmLabel && (
                <div className="fixed inset-0 z-40 backdrop-blur-md" />
            )}
            <div
                className={cn(
                    'relative z-50 flex-column w-full items-center gap-[2rem] overflow-y-auto pt-[10rem] pb-[2rem]',
                    {
                        'h-fit bg-charcoal-navy': confirmLabel,
                    },
                )}
            >
                <div className="flex-column w-full gap-[1.6rem] bg-charcoal-navy px-[2.2rem] py-[8rem]">
                    {children}
                </div>
                <div
                    className={cn(
                        'mt-[1rem] flex w-full justify-between gap-[1.6rem] px-[2.2rem]',
                        {
                            'border-t border-t-silver-gray-20 pt-10':
                                confirmLabel,
                        },
                    )}
                >
                    <button
                        className="text-silver-gray"
                        type="button"
                        onClick={onCancel}
                    >
                        {t('cancel')}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="button-primary-red-background"
                    >
                        {confirmLabel ?? t('edit')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileEditModal;
