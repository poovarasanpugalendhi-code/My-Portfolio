import { useMemo, useRef } from 'react';
import useSharedInView from '../hooks/useSharedInView';

type DustDot = {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

const buildDustDots = (count: number): DustDot[] => {
  let seed = 17;

  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  return Array.from({ length: count }, (_, index) => ({
    left: 5 + random() * 90,
    top: 8 + random() * 74,
    size: 2 + random() * 2.6,
    duration: 4 + random() * 5,
    delay: -(random() * 9 + index * 0.38),
    opacity: 0.12 + random() * 0.38,
  }));
};

const filmRows = [
  [18, 32, 44, 58, 72, 90, 62, 40],
  [22, 38, 54, 48, 76, 94, 60],
];

export default function IeeeBackground() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useSharedInView(sectionRef, '100px');
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const dust = useMemo(() => buildDustDots(isMobile ? 4 : 10), [isMobile]);

  if (!isInView) {
    return <div ref={sectionRef} className="ieee-background ieee-background--static" aria-hidden="true" />;
  }

  return (
    <div ref={sectionRef} className="ieee-background" aria-hidden="true">
      <div className="ieee-background__dust">
        {dust.map((dot, index) => (
          <span
            key={`dust-${index}`}
            className="ieee-background__dust-dot"
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              opacity: dot.opacity,
              animationDuration: `${dot.duration}s`,
              animationDelay: `${dot.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="ieee-background__film-strip">
        {filmRows.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className={`ieee-background__film-row ieeebg-film-row--${rowIndex === 0 ? 'top' : 'bottom'}`}
          >
            {row.map((width, index) => (
              <span
                key={`${rowIndex}-${index}`}
                className="ieee-background__clip"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
        ))}

        <div className="ieee-background__ruler" />
        <div className="ieee-background__playhead">
          <span className="ieee-background__playhead-head" />
        </div>
      </div>
    </div>
  );
}
