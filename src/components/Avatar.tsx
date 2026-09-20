import { useState } from 'react';

type AvatarProps = {
  size?: number;
  loading?: 'eager' | 'lazy';
  className?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
};

export default function Avatar({ size = 44, loading = 'eager', className = '', fetchPriority }: AvatarProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`avatar avatar-fallback ${className}`.trim()}
        aria-label="Poovarasan P."
        role="img"
        style={{ width: size, height: size, ['--avatar-size' as string]: `${size}px` }}
      >
        <span className="avatar-fallback-mark">P<span>.</span></span>
      </span>
    );
  }

  return (
    <span className={`avatar ${className}`.trim()} style={{ width: size, height: size, ['--avatar-size' as string]: `${size}px` }}>
      <img
        src="/ProfilePic.png"
        alt="Poovarasan P."
        width={size}
        height={size}
        loading={loading}
        {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
        decoding="async"
        className="avatar-image"
        onError={() => setFailed(true)}
      />
    </span>
  );
}
