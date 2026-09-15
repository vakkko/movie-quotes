import type { User } from '@/types/types';

type SharedNotification = {
    id: number;
    actor: Pick<User, 'id' | 'username' | 'avatar_url'>;
    type: 'like' | 'comment';
    quote_id: number;
    comment_id: number | null;
    is_read: boolean;
    created_at: string;
};

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
            notifications: SharedNotification[] | null;
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
    notifications: SharedNotification[] | null;
    locale: string;
    translations: Record<string, string>;
    verified: boolean;
    verifyExpired: boolean;
    verificationSent: boolean;
    verifyUserFromEmailRedirection: { id: number; email: string } | null;
    passwordReset: boolean;
    unverifiedEmail: boolean;
    unverifiedEmailAddress: string | null;
    [key: string]: unknown;
};
