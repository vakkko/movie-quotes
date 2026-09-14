import { useEffect, useRef } from 'react';

export const useStickyQuotes = (quoteCount: number) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        let frame: number;

        const updateClips = () => {
            const container = containerRef.current;

            if (!container) {
                return;
            }

            const rect = container.getBoundingClientRect();
            const scrollable = rect.height - window.innerHeight;
            const progress =
                scrollable > 0
                    ? Math.min(Math.max(-rect.top / scrollable, 0), 1)
                    : 0;

            const scaled = progress * quoteCount;

            sectionRefs.current.forEach((el, i) => {
                if (!el) {
                    return;
                }

                if (i === quoteCount - 1) {
                    return;
                }

                const local = Math.min(Math.max(scaled - i, 0), 1);
                el.style.clipPath = `inset(0 0 ${local * 100}% 0)`;

                const content = contentRefs.current[i];

                if (content) {
                    content.style.transform = `translateY(${local * -80}%)`;
                }
            });

            frame = requestAnimationFrame(updateClips);
        };

        frame = requestAnimationFrame(updateClips);

        return () => cancelAnimationFrame(frame);
    }, [quoteCount]);

    return { containerRef, sectionRefs, contentRefs };
};
