import { useEffect, useState, type RefObject } from 'react';

export default function useInView<T extends HTMLElement>(ref: RefObject<T | null>, rootMargin = '200px') {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncReducedMotion = () => {
      if (media.matches) {
        setIsInView(false);
      }
    };

    syncReducedMotion();

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { root: null, threshold: 0.15, rootMargin },
    );

    observer.observe(element);

    if (media.addEventListener) {
      media.addEventListener('change', syncReducedMotion);
    } else {
      media.addListener(syncReducedMotion);
    }

    return () => {
      observer.disconnect();
      if (media.removeEventListener) {
        media.removeEventListener('change', syncReducedMotion);
      } else {
        media.removeListener(syncReducedMotion);
      }
    };
  }, [ref, rootMargin]);

  return isInView;
}
