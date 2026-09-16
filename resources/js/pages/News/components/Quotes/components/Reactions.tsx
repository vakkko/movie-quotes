import Comment from '@/components/svgs/Comment';
import Like from '@/components/svgs/Like';
import ReactionWrapper from './ReactionWrapper';

type ReactionsProps = {
    commentsCount: number;
    likesCount: number;
    isLiked?: boolean;
    onLike?: () => void;
};

const Reactions = ({
    commentsCount,
    likesCount,
    isLiked,
    onLike,
}: ReactionsProps) => {
    return (
        <div className="my-[2.4rem] flex-items-center gap-[2.4rem]">
            <ReactionWrapper count={commentsCount}>
                <Comment />
            </ReactionWrapper>
            <ReactionWrapper count={likesCount} onClick={onLike}>
                <Like
                    filled={isLiked}
                    className={isLiked ? 'text-primary-red' : ''}
                />
            </ReactionWrapper>
        </div>
    );
};

export default Reactions;
