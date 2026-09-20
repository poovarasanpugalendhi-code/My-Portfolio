import { useEffect, useRef, type RefObject } from 'react';
import useSharedInView from '../hooks/useSharedInView';

type SkillsBackgroundProps = {
  sectionRef: RefObject<HTMLElement>;
};

export default function SkillsBackground({ sectionRef }: SkillsBackgroundProps) {
  const currentRef = useRef({ x: 260, y: 180 });
  const targetRef = useRef({ x: 260, y: 180 });
  const rafRef = useRef<number | null>(null);
  const isInView = useSharedInView(sectionRef, '100px');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !isInView) return;

    const motionQuery = window.matchMedia('(max-width: 768px)');
    const isMobile = motionQuery.matches;

    const tick = () => {
      const current = currentRef.current;
      const target = targetRef.current;

      const nextX = current.x + (target.x - current.x) * 0.08;
      const nextY = current.y + (target.y - current.y) * 0.08;

      currentRef.current = { x: nextX, y: nextY };
      section.style.setProperty('--mx', `${nextX}px`);
      section.style.setProperty('--my', `${nextY}px`);

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);

    if (isMobile) {
      return () => {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      const nextX = event.clientX - rect.left;
      const nextY = event.clientY - rect.top;

      targetRef.current = { x: nextX, y: nextY };
    };

    const handlePointerLeave = () => {
      const rect = section.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      targetRef.current = { x: centerX, y: centerY };
    };

    section.addEventListener('pointermove', handlePointerMove);
    section.addEventListener('pointerleave', handlePointerLeave);

    const observer = new IntersectionObserver(
      ([entry]) => {
        section.classList.toggle('is-paused', !entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    const handleVisibility = () => {
      section.classList.toggle('is-paused', document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
      section.removeEventListener('pointermove', handlePointerMove);
      section.removeEventListener('pointerleave', handlePointerLeave);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isInView, sectionRef]);

  return (
    <div className="skills-background" aria-hidden="true">
      <svg className="skills-background__base" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="skills-hex-pattern" width="18" height="15.5" patternUnits="userSpaceOnUse">
            <path
              d="M9 0 L17 4.5 L17 11 L9 15.5 L1 11 L1 4.5 Z"
              fill="none"
              stroke="rgba(255,255,255,0.045)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#skills-hex-pattern)" />
      </svg>

      <div className="skills-background__gold">
        <svg className="skills-background__svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="skills-hex-pattern-gold" width="18" height="15.5" patternUnits="userSpaceOnUse">
              <path
                d="M9 0 L17 4.5 L17 11 L9 15.5 L1 11 L1 4.5 Z"
                fill="none"
                stroke="rgba(223,168,78,0.55)"
                strokeWidth="0.8"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#skills-hex-pattern-gold)" />
        </svg>
      </div>

      <div className="skills-background__glow" />
    </div>
  );
}
