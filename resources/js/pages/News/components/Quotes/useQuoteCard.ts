import { useHttp } from '@inertiajs/react';
import { useEchoPublic, useSocketId } from '@laravel/echo-react';
import { useState } from 'react';
import { toggle as likeQuoteRoute } from '@/routes/quotes/like';
import type {
    Quote,
    QuoteComment,
    QuoteCommentCreated,
    QuoteReactionChanged,
    QuoteReactionToggled,
} from '../../types';

type UseQuoteCardOptions = {
    quote: Quote;
};

export const useQuoteCard = ({ quote }: UseQuoteCardOptions) => {
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

    return {
        comments,
        commentsCount,
        likesCount,
        isLiked,
        handleCommentAdded,
        handleLike,
    };
};