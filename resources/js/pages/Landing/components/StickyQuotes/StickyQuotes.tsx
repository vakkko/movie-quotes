import { startWithUpperCase } from '@/lib/utils';
import type { Quote } from '@/types';
import useStickyQuotes from './useStickyQuotes';

type StickyQuotesProps = {
    quotes: Quote[];
};

const StickyQuotes = ({ quotes }: StickyQuotesProps) => {
    const { containerRef, setSectionRef, setTextRef } = useStickyQuotes(
        quotes.length,
    );

    return (
        <div
            ref={containerRef}
            className="relative"
            style={{ height: `${quotes.length * 100}vh` }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {quotes.map((quote, index) => {
                    const year = quote.movie?.released_at
                        ? new Date(quote.movie.released_at).getFullYear()
                        : null;

                    const startSentenceUpperCase = startWithUpperCase(
                        quote.quote,
                    );

                    return (
                        <section
                            key={quote.id}
                            ref={setSectionRef(index)}
                            className="absolute inset-0 flex h-screen w-full items-center overflow-hidden"
                            style={{
                                zIndex: quotes.length - index,
                                willChange: 'clip-path',
                            }}
                        >
                            <img
                                src={quote.image_url}
                                alt={quote.quote}
                                className="absolute inset-0 h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50" />
                            <div
                                ref={setTextRef(index)}
                                className="relative w-[50%] pl-[17rem]"
                                style={{ willChange: 'transform' }}
                            >
                                <blockquote className="flex items-start gap-[1.6rem] font-montserrat font-700-size-50 text-white first-letter:uppercase">
                                    <span className="mt-[4rem] w-[5.3rem] border-2 border-white"></span>
                                    “{startSentenceUpperCase}”
                                </blockquote>
                                <p className="ml-[5rem] font-700-size-30 text-light-gray uppercase">
                                    {quote.movie?.title} <span>{year}</span>
                                </p>
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};

export default StickyQuotes;
