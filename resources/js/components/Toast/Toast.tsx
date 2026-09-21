import { CircleCheck, CircleX, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error';

type ToastProps = {
    type: ToastType;
    message: string;
    onClose: () => void;
};

const Toast = ({ type, message, onClose }: ToastProps) => (
    <div
        role="alert"
        className={cn(
            'flex animate-toast-in items-center gap-[1rem] rounded-[0.4rem] border bg-charcoal-navy px-[2rem] py-[1.2rem] text-white shadow-lg',
            type === 'success'
                ? 'bg-mint-green text-deep-green'
                : 'bg-primary-red',
        )}
    >
        {type === 'success' ? (
            <CircleCheck size={22} className="shrink-0 text-bootstrap-green" />
        ) : (
            <CircleX size={22} className="shrink-0" />
        )}

        <span className="flex-1 font-500-size-16 whitespace-nowrap">
            {message}
        </span>

        <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 text-white/60 hover:text-white"
        >
            <X size={20} color="gray" />
        </button>
    </div>
);

export default Toast;
