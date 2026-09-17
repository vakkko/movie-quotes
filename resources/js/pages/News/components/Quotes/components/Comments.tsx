import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import AvatarImage from '../../../../../components/AvatarImage';
import type { QuoteComment } from '../../../types';

type CommentsProps = {
    comments: QuoteComment[];
};

const VISIBLE_COMMENTS_STEP = 3;

const Comments = ({ comments }: CommentsProps) => {
    const { t } = useTranslation();
    const [visibleComments, setVisibleComments] = useState(
        VISIBLE_COMMENTS_STEP,
    );

    const hasMoreComments = comments.length > visibleComments;

    return (
        <div className="mt-[2.4rem] flex-column gap-[2.4rem]">
            {comments.slice(0, visibleComments).map((comment) => (
                <div className="flex gap-[2.4rem]" key={comment.id}>
                    <AvatarImage
                        src={comment.user.avatar_url}
                        alt={comment.user.username}
                    />
                    <div className="flex-column w-full gap-[1.1rem]">
                        <span>{comment.user.username}</span>
                        <span className="mb-[2.4rem]">{comment.body}</span>
                        <hr className="border-cloud-gray" />
                    </div>
                </div>
            ))}
            {hasMoreComments && (
                <button
                    className="cursor-pointer self-start text-[2rem] leading-[150%] text-blue-500 transition-colors hover:text-white"
                    type="button"
                    onClick={() =>
                        setVisibleComments(
                            (previous) => previous + VISIBLE_COMMENTS_STEP,
                        )
                    }
                >
                    {t('show_more_comments')}
                </button>
            )}
        </div>
    );
};

export default Comments;
