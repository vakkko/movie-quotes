import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import QuotePoster from '@/components/QuotePoster';
import { cn, startWithUpperCase } from '@/lib/utils';
import type { User } from '@/types';
import type { Quote, QuoteComment } from '../../types';
import AvatarAndUsername from '../AvatarAndUsername';
import Comments from './components/Comments';
import Reactions from './components/Reactions';
import UserComment from './components/UserComment';

type QuoteCardProps = PropsWithChildren & {
    quote: Quote;
    user: User | null;
    isEditing?: boolean;
    imagePreview?: string | null;
    onImageChange?: (file: File | null) => void;
};

const QuoteCard = ({
    quote,
    user,
    isEditing = false,
    imagePreview,
    onImageChange,
    children,
}: QuoteCardProps) => {
    const [comments, setComments] = useState<QuoteComment[]>(quote.comments);
    const [commentsCount, setCommentsCount] = useState(quote.comments_count);

    const handleCommentAdded = (comment: QuoteComment) => {
        setComments((previous) => [comment, ...previous]);
        setCommentsCount((previous) => previous + 1);
    };

    const startSentenceUpperCase = startWithUpperCase(quote.quote ?? '');

    return (
        <div
            className={cn(
                'mb-[4rem] w-fit max-w-[89rem] rounded-[1.2rem] bg-deep-navy p-[2.4rem] text-white',
                { 'bg-black': children },
            )}
        >
            <AvatarAndUsername
                user={{
                    avatar: quote.user.avatar,
                    username: quote.user.username,
                }}
            />
            {children ? (
                children
            ) : (
                <p className="mt-[1.6rem] mb-[2.8rem] text-[2rem]">
                    &ldquo;{startSentenceUpperCase}&rdquo; -{' '}
                    <span className="text-cream">{quote.movie.director}</span>.(
                    {quote.movie.released_at}){' '}
                </p>
            )}
            <QuotePoster
                src={quote.image_url}
                alt={quote.movie.title}
                preview={imagePreview}
                onChangeFile={isEditing ? onImageChange : undefined}
            />
            {!isEditing && (
                <>
                    <Reactions
                        quoteId={quote.id}
                        commentsCount={commentsCount}
                        likesCount={quote.likes_count}
                        isLiked={quote.is_liked}
                    />
                    <hr className="border-cloud-gray" />
                    <Comments comments={comments} />
                    <UserComment
                        quoteId={quote.id}
                        user={user}
                        onCommentAdded={handleCommentAdded}
                    />
                </>
            )}
        </div>
    );
};

export default QuoteCard;
