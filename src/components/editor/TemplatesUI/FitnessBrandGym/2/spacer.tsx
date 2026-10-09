// @ts-nocheck
import React from "react";

export function SpacerBlock({ props = {}, theme = {} }: any) {
  const bg = props?.backgroundColor || theme?.bg || "transparent";
  const height = props?.height || 80;

  return (
    <div
      style={{
        backgroundColor: bg,
        height: `${height}px`,
        width: "100%",
      }}
      className="transition-all"
    />
  );
}

export const FitnessBrandGym2Spacer = SpacerBlock;
export default SpacerBlock;
