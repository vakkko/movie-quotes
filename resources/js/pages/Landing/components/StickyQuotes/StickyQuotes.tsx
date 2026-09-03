import type { Quote } from '@/types';

type StickyQuotesProps = {
    quotes: Quote[];
};

const StickyQuotes = ({ quotes }: StickyQuotesProps) => {
    return (
        <div className="relative h-screen">
            {quotes.map((quote) => {
                const year = quote.movie?.released_at
                    ? new Date(quote.movie.released_at).getFullYear()
                    : null;

                return (
                    <section
                        key={quote.id}
                        className="sticky top-0 flex h-screen w-full items-center overflow-hidden"
                    >
                        <img
                            src={quote.image_url}
                            alt={quote.quote}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="relative w-[50%] pl-[17rem]">
                            <blockquote className="flex items-start gap-[1.6rem] font-montserrat font-700-size-50 text-white first-letter:uppercase">
                                <span className="mt-[4rem] w-[5.3rem] border-2 border-white"></span>
                                “{quote.quote}”
                            </blockquote>
                            <p className="ml-[5rem] font-700-size-30 text-light-gray uppercase">
                                {quote.movie?.title}, <span>{year}</span>
                            </p>
                        </div>
                    </section>
                );
            })}
        </div>
    );
};

export default StickyQuotes;
