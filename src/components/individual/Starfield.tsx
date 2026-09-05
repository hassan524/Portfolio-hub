// components/individual/Starfield.tsx
import { useMemo } from "react";

interface StarfieldProps {
  count?: number;
  className?: string;
}

export function Starfield({ count = 120, className = "" }: StarfieldProps) {
  const stars = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.25 + 0.1,
    }));
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: "none", // hard override — nothing can fade this out
          }}
        />
      ))}
    </div>
  );
}