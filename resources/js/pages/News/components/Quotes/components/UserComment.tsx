import { useHttp } from '@inertiajs/react';
import { useSocketId } from '@laravel/echo-react';
import type { ChangeEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/hooks/useTranslation';
import { store as storeCommentRoute } from '@/routes/quotes/comments';
import type { User } from '@/types';
import AvatarImage from '../../../../../components/AvatarImage';
import type { QuoteComment } from '../../../types';

type UserCommentProps = {
    quoteId: number;
    user: User | null;
    onCommentAdded: (comment: QuoteComment) => void;
};

const UserComment = ({ quoteId, user, onCommentAdded }: UserCommentProps) => {
    const { t } = useTranslation();
    const socketId = useSocketId();
    const { data, setData, post, errors, processing, reset } = useHttp({
        body: '',
    });

    const showSend = data.body.trim() !== '';

    const handleSubmit = (event: ChangeEvent) => {
        event.preventDefault();

        if (!showSend) {
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

    return (
        <form className="mt-[2.4rem]" onSubmit={handleSubmit}>
            <div className="flex-items-center gap-[2.4rem]">
                <AvatarImage
                    src={user && user.avatar_url}
                    alt={user ? user.username : ''}
                />
                <div className="relative w-full min-w-0">
                    <Textarea
                        className="field-sizing-fixed !h-[7rem] w-full min-w-0 resize-none scrollbar-none overflow-y-auto rounded-[1rem] border-none !bg-charcoal-navy py-[2rem] pr-[7.2rem] pl-[2.7rem] !text-[2rem] leading-[150%] text-silver-gray placeholder:text-[2rem] placeholder:text-silver-gray placeholder:not-italic focus-visible:border-0 focus-visible:ring-0 [&::-webkit-scrollbar]:hidden"
                        placeholder={t('write_comment')}
                        value={data.body}
                        onChange={(event) =>
                            setData('body', event.target.value)
                        }
                    />
                    {showSend && (
                        <button
                            className="absolute top-[2rem] right-[2rem] cursor-pointer text-[2rem] leading-[150%] text-blue-500 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            type="submit"
                            disabled={processing}
                        >
                            {t('send')}
                        </button>
                    )}
                </div>
            </div>
            {errors.body && (
                <span className="mt-[1rem] block text-[1.4rem] text-primary-red">
                    {errors.body}
                </span>
            )}
        </form>
    );
};

export default UserComment;
