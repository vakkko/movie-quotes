import { useHttp } from '@inertiajs/react';
import { useEchoPublic, useSocketId } from '@laravel/echo-react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import QuotePoster from '@/components/QuotePoster';
import { cn, startWithUpperCase } from '@/lib/utils';
import { toggle as likeQuoteRoute } from '@/routes/quotes/like';
import type { User } from '@/types';
import type {
    Quote,
    QuoteComment,
    QuoteCommentCreated,
    QuoteReactionChanged,
    QuoteReactionToggled,
} from '../../types';
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
    const [likesCount, setLikesCount] = useState(quote.likes_count);
    const [isLiked, setIsLiked] = useState(quote.is_liked);
    const [prevQuote, setPrevQuote] = useState(quote);
    const socketId = useSocketId();
    const { post } = useHttp();

    if (prevQuote !== quote) {
        setPrevQuote(quote);
        setComments(quote.comments);
        setCommentsCount(quote.comments_count);
        setLikesCount(quote.likes_count);
        setIsLiked(quote.is_liked);
    }

    useEchoPublic<QuoteReactionChanged>(
        `quotes.${quote.id}`,
        '.QuoteReactionChanged',
        (payload) => setLikesCount(payload.likes_count),
    );

    useEchoPublic<QuoteCommentCreated>(
        `quotes.${quote.id}`,
        '.QuoteCommentCreated',
        (payload) => {
            setComments((previous) =>
                previous.some((comment) => comment.id === payload.comment.id)
                    ? previous
                    : [payload.comment, ...previous],
            );
            setCommentsCount((previous) => previous + 1);
        },
    );

    const handleCommentAdded = (comment: QuoteComment) => {
        setComments((previous) => [comment, ...previous]);
        setCommentsCount((previous) => previous + 1);
    };

    const handleLike = () => {
        const nextIsLiked = !isLiked;
        setIsLiked(nextIsLiked);
        setLikesCount((previous) => previous + (nextIsLiked ? 1 : -1));

        post(likeQuoteRoute(quote.id).url, {
            headers: socketId ? { 'X-Socket-ID': socketId } : undefined,
            onSuccess: (response) => {
                const { is_liked, likes_count } =
                    response as QuoteReactionToggled;
                setIsLiked(is_liked);
                setLikesCount(likes_count);
            },
            onError: () => {
                setIsLiked(!nextIsLiked);
                setLikesCount((previous) => previous - (nextIsLiked ? 1 : -1));
            },
        });
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
                    <span className="text-cream">{quote.movie.title}</span> (
                    {quote.movie.released_at})
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
                        commentsCount={commentsCount}
                        likesCount={likesCount}
                        isLiked={isLiked}
                        onLike={handleLike}
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
