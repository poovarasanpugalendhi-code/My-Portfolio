import { useEffect, useMemo, useRef, useState } from 'react';
import useSharedInView from '../hooks/useSharedInView';

type Firefly = {
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  offsetX: number;
  offsetY: number;
  opacity: number;
};

const buildContourPath = (
  cx: number,
  cy: number,
  baseRadius: number,
  waveAmp: number,
  waves: number,
  rotation: number,
) => {
  const points = Array.from({ length: 48 }, (_, index) => {
    const angle = (index / 48) * Math.PI * 2;
    const radial = baseRadius + Math.sin(angle * waves + rotation) * waveAmp + Math.cos(angle * (waves + 1) + rotation * 0.8) * (waveAmp * 0.45);
    const x = cx + Math.cos(angle) * radial;
    const y = cy + Math.sin(angle) * radial;
    return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
  });

  return `${points.join(' ')} Z`;
};

const buildFireflies = (count: number): Firefly[] => {
  let seed = 1337;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  return Array.from({ length: count }, (_, index) => ({
    left: 6 + random() * 88,
    top: 8 + random() * 78,
    size: 2 + random() * 2.2,
    duration: 9 + random() * 7,
    delay: -(random() * 8 + index * 0.35),
    offsetX: -18 + random() * 36,
    offsetY: -18 + random() * 36,
    opacity: 0.15 + random() * 0.7,
  }));
};

export default function JourneyBackground() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useSharedInView(layerRef, '100px');
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const fireflies = useMemo(() => buildFireflies(isMobile ? 4 : 10), [isMobile]);
  const contourCount = 6;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReducedMotion(media.matches);
    syncMotion();
    media.addEventListener('change', syncMotion);
    return () => media.removeEventListener('change', syncMotion);
  }, []);

  useEffect(() => {
    setIsVisible(isInView);
  }, [isInView]);

  const contourRings = Array.from({ length: contourCount }, (_, index) => {
    const baseRadius = 110 + index * 38;
    const waveAmp = 12 + index * 2.6;
    const waves = 3 + (index % 3);
    const rotation = index * 0.9;

    return {
      d: buildContourPath(600, 400, baseRadius, waveAmp, waves, rotation),
      delay: `${index * 0.7}s`,
      opacity: 0.06 + (index / contourCount) * 0.10,
    };
  });

  return (
    <div
      ref={layerRef}
      className="journey-background"
      data-paused={!isVisible || reducedMotion}
      aria-hidden="true"
    >
      <svg
        className="journey-background__svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="Topographic contour map background"
      >
        {contourRings.map((ring, index) => (
          <path
            key={`contour-${index}`}
            d={ring.d}
            className="journey-background__contour"
            style={{ opacity: ring.opacity, animationDelay: ring.delay }}
          />
        ))}
      </svg>

      <div className="journey-background__fireflies">
        {fireflies.map((firefly, index) => (
          <span
            key={`firefly-${index}`}
            className="journey-background__firefly"
            style={{
              left: `${firefly.left}%`,
              top: `${firefly.top}%`,
              width: `${firefly.size}px`,
              height: `${firefly.size}px`,
              opacity: firefly.opacity,
              animationDuration: `${firefly.duration}s`,
              animationDelay: `${firefly.delay}s`,
              ['--firefly-offset-x' as string]: `${firefly.offsetX}px`,
              ['--firefly-offset-y' as string]: `${firefly.offsetY}px`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
