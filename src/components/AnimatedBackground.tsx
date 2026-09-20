import { useMemo, type CSSProperties, type RefObject } from 'react';
import useSharedInView from '../hooks/useSharedInView';

type Sparkle = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: string;
  duration: string;
  driftX: number;
  driftY: number;
};

const buildSparkles = (count: number): Sparkle[] =>
  Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2.2 + 1,
    opacity: Math.random() * 0.7 + 0.2,
    delay: `${(Math.random() * 10).toFixed(2)}s`,
    duration: `${(Math.random() * 10 + 12).toFixed(2)}s`,
    driftX: Math.random() * 16 - 8,
    driftY: Math.random() * -24 - 8,
  }));

type AnimatedBackgroundProps = {
  sectionRef: RefObject<HTMLElement | null>;
  isActive?: boolean;
};

export default function AnimatedBackground({ sectionRef, isActive = true }: AnimatedBackgroundProps) {
  const inView = useSharedInView(sectionRef, '100px');
  const shouldAnimate = isActive && inView;
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const sparkleCount = isMobile ? 4 : 10;
  const sparkles = useMemo(() => buildSparkles(sparkleCount), [sparkleCount]);

  return (
    <div className={`animated-bg ${shouldAnimate ? '' : 'is-static'}`} aria-hidden="true">
      {shouldAnimate ? (
        <>
          <div className="animated-bg__aurora animated-bg__aurora-1" />
          <div className="animated-bg__aurora animated-bg__aurora-2" />
          <div className="animated-bg__grid" />

          {sparkles.map((sparkle, index) => {
            const style = {
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              opacity: sparkle.opacity,
              animationDelay: sparkle.delay,
              animationDuration: sparkle.duration,
              ['--sparkle-drift-x' as string]: `${sparkle.driftX}px`,
              ['--sparkle-drift-y' as string]: `${sparkle.driftY}px`,
            } as CSSProperties;

            return <span key={index} className="animated-bg__sparkle" style={style} />;
          })}
        </>
      ) : null}
    </div>
  );
}
