import { useHttp } from '@inertiajs/react';
import { useSocketId } from '@laravel/echo-react';
import type { FormEvent, KeyboardEvent } from 'react';
import { store as storeCommentRoute } from '@/routes/quotes/comments';
import type { QuoteComment } from '../../../../types';

type UseUserCommentOptions = {
    quoteId: number;
    onCommentAdded: (comment: QuoteComment) => void;
};

type UseUserCommentData = {
    body: string;
};

export function useUserComment({
    quoteId,
    onCommentAdded,
}: UseUserCommentOptions) {
    const socketId = useSocketId();
    const { data, setData, post, errors, processing, reset } = useHttp<
        UseUserCommentData,
        unknown
    >({ body: '' });

    const body = data.body;
    const showSend = body.trim() !== '';

    const submitComment = () => {
        if (!showSend || processing) {
            return;
        }

        post(storeCommentRoute.url(quoteId), {
            headers: socketId ? { 'X-Socket-ID': socketId } : undefined,
            onSuccess: (response: unknown) => {
                const { comment } = response as { comment: QuoteComment };
                onCommentAdded(comment);
                reset();
            },
        });
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        submitComment();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            submitComment();
        }
    };

    return {
        body,
        setBody: setData,
        errors,
        processing,
        showSend,
        handleSubmit,
        handleKeyDown,
    };
}