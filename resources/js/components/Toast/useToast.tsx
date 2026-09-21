import {
    createContext,
    useCallback,
    useContext,
    useRef,
    useState,
} from 'react';
import type { PropsWithChildren } from 'react';
import Toast from './Toast';
import type { ToastType } from './Toast';

type ToastItem = {
    id: number;
    type: ToastType;
    message: string;
};

type ToastContextValue = {
    showToast: (type: ToastType, message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION = 3000;

export const ToastProvider = ({ children }: PropsWithChildren) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const nextId = useRef(0);

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback(
        (type: ToastType, message: string) => {
            const id = nextId.current++;
            setToasts((prev) => [...prev, { id, type, message }]);

            window.setTimeout(() => removeToast(id), TOAST_DURATION);
        },
        [removeToast],
    );

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="pointer-events-none fixed top-[2rem] left-1/2 z-[100] flex-column -translate-x-1/2 items-center gap-[1rem]">
                {toasts.map((toast) => (
                    <div key={toast.id} className="pointer-events-auto">
                        <Toast
                            type={toast.type}
                            message={toast.message}
                            onClose={() => removeToast(toast.id)}
                        />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = (): ToastContextValue => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }

    return context;
};
