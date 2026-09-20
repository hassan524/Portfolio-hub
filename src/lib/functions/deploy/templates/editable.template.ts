export const publishedEditable = `
import { createContext, useContext, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

const TextOverrideContext = createContext<{ overrides: Record<string, string>; nextIndex: () => number } | null>(null);

export function TextOverrideProvider({ overrides, children }: { overrides?: Record<string, string>; children: ReactNode }) {
  const indexRef = useRef(0);
  indexRef.current = 0;
  return <TextOverrideContext.Provider value={{ overrides: overrides ?? {}, nextIndex: () => indexRef.current++ }}>{children}</TextOverrideContext.Provider>;
}

export function Editable({
  value,
  as: Tag = "div",
  className,
  style,
  children,
}: {
  value?: string;
  onChange?: (value: string) => void;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const context = useContext(TextOverrideContext);
  const index = context ? context.nextIndex() : undefined;
  const override = index === undefined ? undefined : context?.overrides[String(index)];
  const html = override ?? value ?? (typeof children === "string" ? children : undefined);
  if (html !== undefined) {
    return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <Tag className={className} style={style}>{children}</Tag>;
}
`.trim();