import { useEffect, useState, type RefObject } from 'react';

type EntryRecord = {
  ref: Element;
  callback: (v: boolean) => void;
};

const observers = new Map<string, { observer: IntersectionObserver; entries: Set<Element> }>();

function getObserver(rootMargin = '100px') {
  const key = String(rootMargin);
  if (observers.has(key)) return observers.get(key)!;

  const entries = new Set<Element>();
  const observer = new IntersectionObserver(
    (items) => {
      items.forEach((it) => {
        const el = it.target as Element & { __sharedInViewCallback?: ((v: boolean) => void) | undefined };
        if (el && typeof el.__sharedInViewCallback === 'function') {
          el.__sharedInViewCallback(it.isIntersecting);
        }
      });
    },
    { root: null, threshold: 0.15, rootMargin }
  );

  const entry = { observer, entries };
  observers.set(key, entry);
  return entry;
}

export default function useSharedInView<T extends HTMLElement>(ref: RefObject<T | null>, rootMargin = '100px') {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { observer, entries } = getObserver(rootMargin);

    // attach a callback directly to the element to avoid re-traversing maps
    (el as any).__sharedInViewCallback = (v: boolean) => setIsInView(v && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    entries.add(el);
    observer.observe(el);

    return () => {
      try {
        observer.unobserve(el);
      } catch (e) {
        // ignore
      }
      entries.delete(el);
      delete (el as any).__sharedInViewCallback;
    };
  }, [ref, rootMargin]);

  return isInView;
}
