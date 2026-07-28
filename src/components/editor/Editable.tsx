import { useRef, type ElementType, type CSSProperties, type FocusEvent } from "react";

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
  const ref = useRef<HTMLElement>(null);

  return (
    <Tag
      ref={ref}
      data-editable="true"
      contentEditable
      suppressContentEditableWarning
      // innerHTML instead of textContent — this is what lets bold/italic/
      // underline/color survive. Plain typing still works exactly the
      // same, this only matters once the selection toolbar applies a tag.
      onBlur={(e: FocusEvent<HTMLElement>) => onChange(e.currentTarget.innerHTML ?? "")}
      className={`${className ?? ""} outline-none focus:ring-2 focus:ring-offset-2 rounded-sm cursor-text`}
      style={style}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}