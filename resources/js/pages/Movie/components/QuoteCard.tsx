import type { MovieQuote } from '@/types';
import Reactions from '../../News/components/Quotes/components/Reactions';

type QuoteCardProps = {
    quote: MovieQuote;
};

const QuoteCard = ({ quote }: QuoteCardProps) => {
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
                commentsCount={quote.comments_count}
                likesCount={quote.likes_count}
            />
        </>
    );
};

export default QuoteCard;