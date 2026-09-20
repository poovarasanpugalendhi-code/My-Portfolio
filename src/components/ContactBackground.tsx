import { useEffect, useRef, useState } from 'react';
import useSharedInView from '../hooks/useSharedInView';

export default function ContactBackground() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isActive, setIsActive] = useState(false);
  const inView = useSharedInView(ref, '100px');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    setIsActive(Boolean(inView));
    // rely on shared observer, no local observer
    return () => {};
  }, []);

  return (
    <div ref={ref} className={`contact-background ${isActive ? 'is-active' : ''}`} aria-hidden="true">
      <div className="contact-background__glow" />
      <div className="contact-background__grid" />

      <svg className="contact-background__svg" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
        <path d="M 170 440 C 300 290, 420 250, 600 240" />
        <path d="M 600 240 C 780 250, 900 290, 1030 440" />
        <g>
          <circle cx="170" cy="440" r="3" />
          <circle cx="320" cy="350" r="3" />
          <circle cx="600" cy="240" r="3" />
          <circle cx="880" cy="350" r="3" />
          <circle cx="1030" cy="440" r="3" />
        </g>
      </svg>

      <div className="contact-pulse-dot contact-pulse-dot--1" />
      <div className="contact-pulse-dot contact-pulse-dot--2" />
      <div className="contact-pulse-dot contact-pulse-dot--3" />
    </div>
  );
}
