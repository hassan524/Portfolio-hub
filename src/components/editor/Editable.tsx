import { useRef, type ElementType, type CSSProperties, type FocusEvent } from "react";
import { handleEditableBlur } from "@/lib/functions/TemplateDialog";

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
      onBlur={(e: FocusEvent<HTMLElement>) => handleEditableBlur(e, onChange)}
      className={`${className ?? ""} outline-none focus:ring-2 focus:ring-offset-2 rounded-sm cursor-text`}
      style={style}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}