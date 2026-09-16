import { useEchoPublic } from '@laravel/echo-react';
import { useState } from 'react';
import type { MovieQuote } from '@/types';
import Reactions from '../../News/components/Quotes/components/Reactions';
import type { QuoteReactionChanged } from '../../News/types';

type QuoteCardProps = {
    quote: MovieQuote;
};

const QuoteCard = ({ quote }: QuoteCardProps) => {
    const [commentsCount, setCommentsCount] = useState(quote.comments_count);
    const [likesCount, setLikesCount] = useState(quote.likes_count);
    const [prevQuote, setPrevQuote] = useState(quote);

    if (prevQuote !== quote) {
        setPrevQuote(quote);
        setCommentsCount(quote.comments_count);
        setLikesCount(quote.likes_count);
    }

    useEchoPublic<QuoteReactionChanged>(
        `quotes.${quote.id}`,
        '.QuoteReactionChanged',
        (payload) => setLikesCount(payload.likes_count),
    );

    return (
        <>
            <div className="mb-[2rem] flex gap-[2.4rem]">
                <img
                    className="h-[14rem] w-[22.6rem] rounded-[0.2rem]"
                    src={quote.image_url}
                    alt={quote.quote}
                />
                <div className="flex-items-center gap-[3.8rem]">
                    <p className="mr-[4.7rem]">{quote.quote}</p>
                </div>
            </div>
            <hr />
            <Reactions
                commentsCount={commentsCount}
                likesCount={likesCount}
            />
        </>
    );
};

export default QuoteCard;