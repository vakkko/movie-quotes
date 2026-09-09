import type { User } from '@/types/auth';

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            user: User | null;
            locale: string;
            translations: Record<string, string>;
            verified: boolean;
            verifyExpired: boolean;
            verificationSent: boolean;
            verifyUserFromEmailRedirection: {
                id: number;
                email: string;
            } | null;
            passwordReset: boolean;
            unverifiedEmail: boolean;
            unverifiedEmailAddress: string | null;
            [key: string]: unknown;
        };
    }
}

export type SharedPageProps = {
    name: string;
    user: User | null;
    sidebarOpen: boolean;
    locale: string;
    translations: Record<string, string>;
    verified: boolean;
    verifyExpired: boolean;
    verificationSent: boolean;
    verifyUserFromEmailRedirection: { id: number; email: string } | null;
    passwordReset: boolean;
    unverifiedEmail: boolean;
    [key: string]: unknown;
};
