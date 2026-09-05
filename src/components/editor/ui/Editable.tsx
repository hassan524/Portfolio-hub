import { useRef, type ElementType, type CSSProperties, type FocusEvent, type ReactNode } from "react";
import { handleEditableBlur } from "@/lib/functions/template";

export function Editable({
  value,
  onChange,
  children,
  as: Tag = "div",
  className,
  style,
}: {
  value?: string;
  onChange?: (v: string) => void;
  children?: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);

  return (
    <Tag
      ref={ref}
      data-editable="true"
      contentEditable
      suppressContentEditableWarning
      onBlur={onChange ? (e: FocusEvent<HTMLElement>) => handleEditableBlur(e, onChange) : undefined}
      className={`${className ?? ""} outline-none focus:ring-2 focus:ring-offset-2 rounded-sm cursor-text`}
      style={style}
      {...(value !== undefined ? { dangerouslySetInnerHTML: { __html: value } } : {})}
    >
      {value === undefined ? children : undefined}
    </Tag>
  );
}
