import type { Theme } from "@/types/builder.schema";

export type BlockComponentProps<P> = {
  id: string;
  props: P;
  theme: Theme;
  onChange: (patch: Partial<P>) => void;
};
