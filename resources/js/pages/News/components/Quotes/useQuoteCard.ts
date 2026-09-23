import { useHttp } from '@inertiajs/react';
import { useEchoPublic, useSocketId } from '@laravel/echo-react';
import { useEffect, useRef, useState } from 'react';
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
    const desiredIsLiked = useRef(quote.is_liked);
    const serverIsLiked = useRef(quote.is_liked);
    const serverLikesCount = useRef(quote.likes_count);
    const isLikePending = useRef(false);

    if (prevQuote !== quote) {
        setPrevQuote(quote);
        setComments(quote.comments);
        setCommentsCount(quote.comments_count);
        setLikesCount(quote.likes_count);
        setIsLiked(quote.is_liked);
    }

    useEffect(() => {
        desiredIsLiked.current = quote.is_liked;
        serverIsLiked.current = quote.is_liked;
        serverLikesCount.current = quote.likes_count;
    }, [quote]);

    useEchoPublic<QuoteReactionChanged>(
        `quotes.${quote.id}`,
        '.QuoteReactionChanged',
        (payload) => {
            serverLikesCount.current = payload.likes_count;
            setLikesCount(payload.likes_count);
        },
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

    const fireLike = () => {
        isLikePending.current = true;

        post(likeQuoteRoute(quote.id).url, {
            headers: socketId ? { 'X-Socket-ID': socketId } : undefined,
            onSuccess: (response) => {
                const { is_liked, likes_count } =
                    response as QuoteReactionToggled;
                serverIsLiked.current = is_liked;
                serverLikesCount.current = likes_count;

                if (desiredIsLiked.current === is_liked) {
                    setIsLiked(is_liked);
                    setLikesCount(likes_count);
                    isLikePending.current = false;

                    return;
                }

                setIsLiked(desiredIsLiked.current);
                setLikesCount(likes_count + (desiredIsLiked.current ? 1 : -1));
                fireLike();
            },
            onError: () => {
                desiredIsLiked.current = serverIsLiked.current;
                setIsLiked(serverIsLiked.current);
                setLikesCount(serverLikesCount.current);
                isLikePending.current = false;
            },
        });
    };

    const handleLike = () => {
        desiredIsLiked.current = !desiredIsLiked.current;
        const nextIsLiked = desiredIsLiked.current;
        setIsLiked(nextIsLiked);
        setLikesCount((previous) => previous + (nextIsLiked ? 1 : -1));

        if (isLikePending.current) {
            return;
        }

        fireLike();
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
