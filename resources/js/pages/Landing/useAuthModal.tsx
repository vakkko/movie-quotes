import { createContext, useContext } from 'react';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

export type ActiveModal =
    | 'login'
    | 'register'
    | 'verify-email'
    | 'create-password'
    | 'success'
    | null;

type AuthModalContextValue = {
    activeModal: ActiveModal;
    setActiveModal: Dispatch<SetStateAction<ActiveModal>>;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export const AuthModalProvider = ({
    children,
    value,
}: PropsWithChildren<{ value: AuthModalContextValue }>) => (
    <AuthModalContext.Provider value={value}>
        {children}
    </AuthModalContext.Provider>
);

export const useAuthModal = (): AuthModalContextValue => {
    const context = useContext(AuthModalContext);

    if (!context) {
        throw new Error('useAuthModal must be used within AuthModalProvider');
    }

    return context;
};