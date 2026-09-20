import { useEffect, useMemo, useRef, useState } from 'react';
import useSharedInView from '../hooks/useSharedInView';

type Token = {
  text: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
};

const tokens = [
  'class',
  'public',
  'static',
  'int',
  'String',
  'List<String>',
  'for',
  'return',
  '{}',
  ';',
  'import',
  'new',
  'private',
  'final',
  'void',
];

const circuitPaths = [
  'M 0 60 H 160 V 120 H 300',
  'M 110 0 V 80 H 260 V 200',
  'M 200 120 H 520 V 60 H 720',
  'M 420 200 V 340 H 560 V 460',
  'M 620 60 V 180 H 820',
  'M 720 200 V 320 H 920',
  'M 160 260 H 360 V 360 H 520',
  'M 500 340 H 700 V 520',
  'M 850 260 V 420 H 1040',
  'M 40 420 H 220 V 560',
];

export default function AboutBackground() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useSharedInView(sectionRef, '100px');
  const spotlightRef = useRef({ x: 72, y: 18 });
  const isVisibleRef = useRef(true);
  const [isVisible, setIsVisible] = useState(true);

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const floatingTokens = useMemo<Token[]>(() =>
    tokens.filter((_, index) => index % 2 === 0).slice(0, isMobile ? 4 : 10).map((text, index) => ({
      text,
      x: 8 + (index * 7) % 78,
      y: 10 + (index * 13) % 75,
      size: 10 + ((index * 7) % 9),
      duration: 20 + index * 2.8,
      delay: index * 1.1,
      opacity: 0.04 + (index % 4) * 0.01,
    })),
  []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (reduceMotion || !isInView) {
      setIsVisible(false);
      spotlightRef.current = { x: 75, y: 18 };
      return;
    }

    if (coarsePointer) {
      spotlightRef.current = { x: 78, y: 18 };
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (reduceMotion || coarsePointer || !sectionRef.current) return;

    const section = sectionRef.current;
    const target = { x: 72, y: 18 };
    let frameId = 0;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      target.x = ((event.clientX - rect.left) / rect.width) * 100;
      target.y = ((event.clientY - rect.top) / rect.height) * 100;
    };

    const animate = () => {
      const prev = spotlightRef.current;
      const nextX = prev.x + (target.x - prev.x) * 0.08;
      const nextY = prev.y + (target.y - prev.y) * 0.08;
      spotlightRef.current = { x: nextX, y: nextY };
      const el = section.querySelector('.about-background__spotlight') as HTMLElement | null;
      if (el) {
        el.style.transform = `translate(${nextX - 24}%, ${nextY - 18}%)`;
      }
      frameId = requestAnimationFrame(animate);
    };

    section.addEventListener('pointermove', handlePointerMove);
    frameId = requestAnimationFrame(animate);

    return () => {
      section.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(frameId);
    };
  }, [isVisible, isInView]);

  const spotlightTransform = undefined;

  if (!isInView) {
    return <div ref={sectionRef} className="about-background about-background--static" aria-hidden="true" />;
  }

  return (
    <div
      ref={sectionRef}
      className="about-background"
      aria-hidden="true"
      data-visible={isVisible}
    >
      <div className="about-background__spotlight" style={spotlightTransform} />

      <svg className="about-background__circuit" viewBox="0 0 1100 640" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Circuit traces background">
        <defs />

        {circuitPaths.map((path, index) => (
          <path
            key={path + index}
            d={path}
            className="about-background__trace"
            style={{ animationDelay: `${index * 0.7}s` }}
          />
        ))}

        {[{ x: 100, y: 60 }, { x: 214, y: 120 }, { x: 440, y: 60 }, { x: 562, y: 200 }, { x: 760, y: 60 }, { x: 875, y: 260 }, { x: 500, y: 360 }, { x: 720, y: 520 }, { x: 320, y: 360 }, { x: 180, y: 420 }].map((node, index) => (
          <g key={`node-${index}`}>
            <circle cx={node.x} cy={node.y} r="3.2" className="about-background__node" />
            <circle cx={node.x} cy={node.y} r="8" className="about-background__node about-background__node--pulse" style={{ animationDelay: `${index * 0.8}s` }} />
          </g>
        ))}

        {[
          { x: 120, y: 90, w: 86, h: 50 },
          { x: 430, y: 150, w: 94, h: 52 },
          { x: 690, y: 210, w: 96, h: 54 },
          { x: 570, y: 425, w: 110, h: 54 },
        ].map((chip, index) => (
          <g key={`chip-${index}`} className="about-background__chip" style={{ animationDelay: `${index * 0.9}s` }}>
            <rect x={chip.x} y={chip.y} width={chip.w} height={chip.h} rx="6" />
            <line x1={chip.x + 10} y1={chip.y + 16} x2={chip.x + chip.w - 10} y2={chip.y + 16} />
            <line x1={chip.x + 10} y1={chip.y + 34} x2={chip.x + chip.w - 10} y2={chip.y + 34} />
          </g>
        ))}

        <g className="about-background__pulse-group">
          <circle r="5" className="about-background__pulse-dot" style={{ animationDelay: '0s' }}>
            <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
              <mpath href="#pulsePath1" />
            </animateMotion>
          </circle>
          <circle r="5" className="about-background__pulse-dot" style={{ animationDelay: '2.4s' }}>
            <animateMotion dur="12s" repeatCount="indefinite" rotate="auto">
              <mpath href="#pulsePath3" />
            </animateMotion>
          </circle>
        </g>

        <path id="pulsePath1" d="M 0 60 H 160 V 120 H 300" fill="none" stroke="transparent" />
        <path id="pulsePath3" d="M 200 120 H 520 V 60 H 720" fill="none" stroke="transparent" />
      </svg>

      <div className="about-background__code-layer">
        {floatingTokens.map((token, index) => (
          <span
            key={`${token.text}-${index}`}
            className="about-background__token"
            style={{
              left: `${token.x}%`,
              top: `${token.y}%`,
              fontSize: `${token.size}px`,
              animationDuration: `${token.duration}s`,
              animationDelay: `${token.delay}s`,
              opacity: token.opacity,
            }}
          >
            {token.text}
          </span>
        ))}
      </div>
    </div>
  );
}
