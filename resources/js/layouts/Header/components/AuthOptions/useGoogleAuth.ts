import { redirect as redirectToGoogle } from '@/actions/App/Http/Controllers/GoogleAuthController';

export const useGoogleAuth = () => {
    const handleGoogleAuth = () => {
        window.location.assign(redirectToGoogle.url());
    };

    return { handleGoogleAuth };
};
