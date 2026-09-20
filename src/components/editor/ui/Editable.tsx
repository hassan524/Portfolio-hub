import {
  createContext,
  useContext,
  useRef,
  type ElementType,
  type CSSProperties,
  type FocusEvent,
  type ReactNode,
} from "react";
import { handleEditableBlur } from "@/lib/functions/template";

type TextOverrideContextValue = {
  overrides: Record<string, string>;
  nextIndex: () => number;
};

const TextOverrideContext = createContext<TextOverrideContextValue | null>(null);

export function TextOverrideProvider({
  overrides,
  children,
}: {
  overrides?: Record<string, string>;
  children: ReactNode;
}) {
  const indexRef = useRef(0);
  indexRef.current = 0;

  return (
    <TextOverrideContext.Provider
      value={{
        overrides: overrides ?? {},
        nextIndex: () => indexRef.current++,
      }}
    >
      {children}
    </TextOverrideContext.Provider>
  );
}

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
  const textContext = useContext(TextOverrideContext);
  const textIndex = textContext ? textContext.nextIndex() : undefined;
  const override =
    textIndex === undefined ? undefined : textContext?.overrides[String(textIndex)];
  const renderedValue = override ?? value;

  return (
    <Tag
      ref={ref}
      data-editable="true"
      contentEditable
      suppressContentEditableWarning
      onBlur={onChange ? (e: FocusEvent<HTMLElement>) => handleEditableBlur(e, onChange) : undefined}
      className={`${className ?? ""} outline-none focus:ring-2 focus:ring-offset-2 rounded-sm cursor-text`}
      style={style}
      {...(textIndex !== undefined ? { "data-text-index": textIndex } : {})}
      {...(renderedValue !== undefined ? { dangerouslySetInnerHTML: { __html: renderedValue } } : {})}
    >
      {renderedValue === undefined ? children : undefined}
    </Tag>
  );
}
