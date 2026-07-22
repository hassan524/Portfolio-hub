import type { ElementType, CSSProperties, FocusEvent } from "react";

export function Editable({
  value,
  onChange,
  as: Tag = "div",
  className,
  style,
}: {
  value: string;
  onChange: (v: string) => void;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <Tag
      contentEditable
      suppressContentEditableWarning
      onBlur={(e: FocusEvent<HTMLElement>) => onChange(e.currentTarget.textContent ?? "")}
      className={`${className ?? ""} outline-none focus:ring-2 focus:ring-offset-2 rounded-sm cursor-text`}
      style={style}
    >
      {value}
    </Tag>
  );
}
