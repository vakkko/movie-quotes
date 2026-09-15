import { useEffect, useRef } from 'react';

const useStickyQuotes = (count: number) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);

    const setSectionRef = (index: number) => (el: HTMLElement | null) => {
        sectionRefs.current[index] = el;
    };

    const setTextRef = (index: number) => (el: HTMLDivElement | null) => {
        textRefs.current[index] = el;
    };

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

            const scaled = progress * count;

            const TEXT_SPEED_MULTIPLIER = 2;

            sectionRefs.current.forEach((el, i) => {
                if (!el) {
                    return;
                }

                if (i === count - 1) {
                    return;
                }

                const local = Math.min(Math.max(scaled - i, 0), 1);
                el.style.clipPath = `inset(0 0 ${local * 100}% 0)`;

                const textEl = textRefs.current[i];

                if (textEl) {
                    const textProgress =
                        Math.max(scaled - i, 0) * TEXT_SPEED_MULTIPLIER;
                    textEl.style.transform = `translateY(-${textProgress * 100}%)`;
                }
            });

            frame = requestAnimationFrame(updateClips);
        };

        frame = requestAnimationFrame(updateClips);

        return () => cancelAnimationFrame(frame);
    }, [count]);

    return { containerRef, setSectionRef, setTextRef };
};

export default useStickyQuotes;
