import AvatarImage from '../../../../../components/AvatarImage';
import type { QuoteComment } from '../../../types';

type CommentsProps = {
    comments: QuoteComment[];
};

const Comments = ({ comments }: CommentsProps) => {
    return (
        <div className="mt-[2.4rem] flex-column gap-[2.4rem]">
            {comments.map((comment) => (
                <div className="flex gap-[2.4rem]" key={comment.id}>
                    <AvatarImage
                        src={comment.user.avatar}
                        alt={comment.user.username}
                    />
                    <div className="flex-column w-full gap-[1.1rem]">
                        <span>{comment.user.username}</span>
                        <span className="mb-[2.4rem]">{comment.body}</span>
                        <hr className="border-cloud-gray" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Comments;
