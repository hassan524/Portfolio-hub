export const publishedEditable = `
import type { CSSProperties, ElementType, ReactNode } from "react";
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
  const html = value ?? (typeof children === "string" ? children : undefined);
  if (html !== undefined) {
    return <Tag className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <Tag className={className} style={style}>{children}</Tag>;
}
`.trim();