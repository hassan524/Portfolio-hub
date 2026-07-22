import type { Theme } from "@/types/builder.schema";

// Every block variant component gets this exact shape.
// `onChange` merges a partial patch into this block's props —
// same pattern as the old onUpdateBlock, just generic across all kinds.
export type BlockComponentProps<P> = {
  id: string;
  props: P;
  theme: Theme;
  onChange: (patch: Partial<P>) => void;
};
