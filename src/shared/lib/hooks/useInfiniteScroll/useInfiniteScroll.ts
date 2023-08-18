import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions {
    callback?: () => void;
    triggerRef: MutableRefObject<HTMLElement>;
    wrapperRef: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({
    callback,
    triggerRef,
    wrapperRef,
}: UseInfiniteScrollOptions) {
    useEffect(() => {
        const triggerElement = triggerRef.current;
        const wrapperElement = wrapperRef.current;

        if (!callback) {
            return () => {};
        }
        const options = {
            root: wrapperElement,
            rootMargin: '0px',
            threshold: 1.0,
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callback();
            }
        }, options);

        observer.observe(triggerElement);

        return () => {
            if (observer) {
                observer?.unobserve(triggerElement);
            }
        };
    }, []);
}
