// components/individual/TopSection.tsx
import { ReactNode } from "react";
import { Starfield } from "./Starfield";

export function TopSection({ children }: { children: ReactNode }) {
  return (
    <div className="relative  overflow-hidden">
      <Starfield count={150} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}