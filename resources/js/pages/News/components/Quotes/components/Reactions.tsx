import { router } from '@inertiajs/react';
import Comment from '@/components/svgs/Comment';
import Like from '@/components/svgs/Like';
import { toggle as likeQuoteRoute } from '@/routes/quotes/like';
import ReactionWrapper from './ReactionWrapper';

type ReactionsProps = {
    quoteId?: number;
    commentsCount: number;
    likesCount: number;
    isLiked?: boolean;
};

const Reactions = ({
    quoteId,
    commentsCount,
    likesCount,
    isLiked,
}: ReactionsProps) => {
    const handleLike = () => {
        if (!quoteId) {
            return;
        }

        router.post(likeQuoteRoute(quoteId).url, {}, { preserveScroll: true });
    };

    return (
        <div className="my-[2.4rem] flex-items-center gap-[2.4rem]">
            <ReactionWrapper count={commentsCount}>
                <Comment />
            </ReactionWrapper>
            <ReactionWrapper count={likesCount} onClick={handleLike}>
                <Like
                    filled={isLiked}
                    className={isLiked ? 'text-primary-red' : ''}
                />
            </ReactionWrapper>
        </div>
    );
};

export default Reactions;
