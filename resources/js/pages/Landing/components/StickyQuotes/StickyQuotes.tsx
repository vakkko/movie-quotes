import { Minus } from 'lucide-react';
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
                                className="relative flex w-[50%] gap-[1.5rem] pl-[17rem] max-xl:pl-[8rem] max-sm:w-[70%] max-sm:pl-[2.5rem]"
                                style={{ willChange: 'transform' }}
                            >
                                <div>
                                    <Minus
                                        color="white"
                                        size={50}
                                        className="max-sm:w-[2rem]"
                                    />
                                </div>
                                <div className="flex-column gap-[1rem]">
                                    <blockquote className="font-montserrat font-700-size-50 text-white first-letter:uppercase max-xl:text-[3rem] max-sm:text-[2rem]">
                                        “{startSentenceUpperCase}”
                                    </blockquote>
                                    <p className="font-700-size-30 text-light-gray uppercase max-xl:text-[2rem] max-sm:text-[1.6rem]">
                                        {quote.movie?.title} <span>{year}</span>
                                    </p>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>
        </div>
    );
};

export default StickyQuotes;
