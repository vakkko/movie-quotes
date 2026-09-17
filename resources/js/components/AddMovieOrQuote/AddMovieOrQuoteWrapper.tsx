import { Edit, PlusCircle, X } from 'lucide-react';
import type { PropsWithChildren, ReactNode } from 'react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import AvatarAndUsername from '@/pages/News/components/AvatarAndUsername';

type AddMovieOrQuoteWrapperProps = PropsWithChildren & {
    isExpanded?: boolean;
    triggerText: string;
    triggerIcon?: ReactNode;
    addMovie?: boolean;
    hideTrigger?: boolean;
    title: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
};

const AddMovieOrQuoteWrapper = ({
    isExpanded = false,
    children,
    triggerText,
    triggerIcon,
    addMovie,
    hideTrigger,
    title,
    open,
    onOpenChange,
}: AddMovieOrQuoteWrapperProps) => {
    const [internalOpen, setInternalOpen] = useState(false);

    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const handleModalClose = () => {
        if (isControlled) {
            onOpenChange?.(!isOpen);
        } else {
            setInternalOpen((prev) => !prev);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleModalClose}>
            {!hideTrigger && (
                <DialogTrigger
                    className={cn(
                        'flex-items-center w-full gap-[1.6rem] rounded-[1rem] bg-charcoal-navy px-[1.6rem] py-[1.1rem] whitespace-nowrap max-sm:w-fit',
                        { 'w-fit max-xl:w-full': isExpanded },
                        { 'w-fit !button-primary-red-background': addMovie },
                        { 'bg-primary-red': triggerIcon },
                    )}
                >
                    {addMovie || triggerIcon ? <PlusCircle /> : <Edit />}
                    {triggerText}
                </DialogTrigger>
            )}
            <DialogContent
                className="top-0 left-0 flex max-h-[calc(100vh-4rem)] w-full max-w-full translate-x-0 translate-y-0 flex-col rounded-none border-none bg-deep-navy p-0"
                showCloseButton={false}
            >
                <DialogHeader className="shrink-0 flex-row items-center justify-between border-b border-b-cloud-gray pt-[4rem] pb-[2.4rem]">
                    <DialogTitle className="mx-auto font-500-size-24">
                        {title}
                    </DialogTitle>
                    <button className="mr-[2rem]" onClick={handleModalClose}>
                        <X size={16} />
                    </button>
                </DialogHeader>
                <div className="flex-1 scrollbar-none overflow-y-auto p-[3.2rem] [&::-webkit-scrollbar]:hidden">
                    <AvatarAndUsername />
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddMovieOrQuoteWrapper;
