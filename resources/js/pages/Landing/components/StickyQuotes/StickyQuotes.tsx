import { startWithUpperCase } from '@/lib/utils';
import type { Quote } from '@/types';
import { useStickyQuotes } from './useStickyQuotes';

type StickyQuotesProps = {
    quotes: Quote[];
};

const StickyQuotes = ({ quotes }: StickyQuotesProps) => {
    const { containerRef, sectionRefs, contentRefs } = useStickyQuotes(
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
                            ref={(el) => {
                                sectionRefs.current[index] = el;
                            }}
                            className="absolute inset-0 h-screen w-full overflow-hidden"
                            style={{
                                zIndex: quotes.length - index,
                                willChange: 'clipPath',
                            }}
                        >
                            <div
                                ref={(el) => {
                                    contentRefs.current[index] = el;
                                }}
                                className="relative flex h-full w-full items-center"
                                style={{ willChange: 'transform' }}
                            >
                                <img
                                    src={quote.image_url}
                                    alt={quote.quote}
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50" />
                                <div className="relative flex w-[50%] items-start gap-[1.6rem] pl-[17rem] max-xl:w-full max-xl:pl-[10rem] max-sm:pl-[3.5rem]">
                                    <span className="mt-[2rem] w-[5.3rem] border-2 max-sm:w-[1.7rem]"></span>
                                    <div>
                                        <blockquote className="font-montserrat font-700-size-50 text-white max-sm:text-[2rem]">
                                            “{startSentenceUpperCase}”
                                        </blockquote>
                                        <p className="font-700-size-30 text-light-gray uppercase max-sm:text-[1.6rem]">
                                            {quote.movie?.title},{' '}
                                            <span>{year}</span>
                                        </p>
                                    </div>
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
