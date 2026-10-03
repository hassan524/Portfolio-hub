import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Sliders,
  Trash2,
  Eye,
  EyeOff,
  PanelLeft,
  RotateCcw,
  Wand2,
  Square,
  Layers,
  Ban,
  X,
} from "lucide-react";
import type { PreviewElementEdit, PreviewElementStyle, ResponsiveBreakpoint } from "@/types/previewEditTypes";
import type { Theme } from "@/types/builder.schema";
import { extractElementComputedStyles } from "@/lib/functions/TemplateDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { SidebarTabTrigger as ElementTabTrigger } from "@/components/editor/ui/TemplateSidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CORNER_MAP,
  DEPTH_PRESETS,
  ENTRANCE_OPTIONS,
  FONT_FAMILIES_STATIC,
  GRADIENT_PRESETS,
  HOVER_EFFECT_OPTIONS,
  SPACING_MAP,
  TEXT_SHADOW_PRESETS,
  activeStylePresetKey,
  buildGradient,
  cornerKeyFromValue,
  fadeIn,
  parseGradient,
  spacingKeyFromValue,
  type CornerKey,
  type SpacingKey,
} from "@/lib/functions/elementStyle";
import {
  ColorPicker,
  NumberField,
  PresetRow,
  SliderField,
  DimensionField,
  fieldClass,
  labelClass,
} from "@/components/editor/element-style/ElementStyleFields";

type Props = {
  edit: PreviewElementEdit | null;
  theme?: Theme;
  responsiveEditMode?: boolean;
  editBreakpoint?: ResponsiveBreakpoint;
  availableSectionLinks?: string[];
  onThemeChange?: (patch: Partial<Theme>) => void;
  onChange: (patch: Partial<PreviewElementStyle>) => void;
  onRemove: () => void;
  onReset: () => void;
  onClose: () => void;
};

type CardPreset = {
  key: string;
  name: string;
  icon: typeof Square;
  apply: Partial<PreviewElementStyle>;
};

const CARD_STYLE_PRESETS: CardPreset[] = [
  {
    key: "none",
    name: "None",
    icon: Ban,
    apply: {
      glassmorphism: false,
      backgroundColor: undefined,
      borderWidth: undefined,
      borderColor: undefined,
      boxShadow: "none",
    },
  },
  {
    key: "flat",
    name: "Flat",
    icon: Square,
    apply: { glassmorphism: false, backgroundColor: "#18181b", borderWidth: 0, boxShadow: "none" },
  },
  {
    key: "soft",
    name: "Soft",
    icon: Layers,
    apply: {
      glassmorphism: false,
      backgroundColor: "#18181b",
      borderWidth: 0,
      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.4), 0 4px 6px -2px rgba(0,0,0,0.2)",
    },
  },
  { key: "glass", name: "Glass", icon: Wand2, apply: { glassmorphism: true } },
  {
    key: "outline",
    name: "Outline",
    icon: Square,
    apply: {
      glassmorphism: false,
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: "#ffffff40",
      boxShadow: "none",
    },
  },
];

/* ---------------------------------- main panel ---------------------------------- */

export function ElementStylePanel({
  edit,
  theme,
  responsiveEditMode,
  editBreakpoint,
  availableSectionLinks = [],
  onChange,
  onRemove,
  onReset,
  onClose,
}: Props) {
  if (!edit) return null;

  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null);

  const [computedStyles, setComputedStyles] = useState<Partial<PreviewElementStyle>>(
    () => edit.computedStyle || {},
  );

  useEffect(() => {
    if (!edit?.id) return;
    try {
      const el =
        document.querySelector<HTMLElement>(`[data-preview-edit-id="${CSS.escape(edit.id)}"]`) ||
        document.querySelector<HTMLElement>(`[data-preview-edit-id="${edit.id}"]`);
      if (el) {
        const extracted = extractElementComputedStyles(el);
        setComputedStyles(extracted);
      } else if (edit.computedStyle) {
        setComputedStyles(edit.computedStyle);
      }
    } catch {
      if (edit.computedStyle) setComputedStyles(edit.computedStyle);
    }
  }, [edit?.id, edit?.computedStyle]);

  const style = useMemo(() => {
    const base: PreviewElementStyle = { ...computedStyles, ...edit.style };
    if (editBreakpoint && edit.style.responsive) {
      if (edit.style.responsive[editBreakpoint]) {
        Object.assign(base, edit.style.responsive[editBreakpoint]);
      }
      const otherBreakpoints: ResponsiveBreakpoint[] = (["desktop", "tablet", "mobile"] as ResponsiveBreakpoint[]).filter(
        (b) => b !== editBreakpoint
      );
      for (const otherBp of otherBreakpoints) {
        const otherOverrides = edit.style.responsive[otherBp];
        if (otherOverrides) {
          for (const k in otherOverrides) {
            if (!edit.style.responsive[editBreakpoint] || !(k in edit.style.responsive[editBreakpoint]!)) {
              if (computedStyles && (computedStyles as any)[k] !== undefined) {
                (base as any)[k] = (computedStyles as any)[k];
              } else {
                delete (base as any)[k];
              }
            }
          }
        }
      }
    }
    return base;
  }, [computedStyles, edit.style, editBreakpoint]);
  const isHidden = Boolean(style.hidden || style.visibility === "hidden");
  const gradient = parseGradient(style.backgroundGradient || "");

  const dynamicFontFamilies = [
    { label: "Theme Default", value: "inherit" },
    ...FONT_FAMILIES_STATIC,
  ];

  const formatValues = [
    style.bold ? "bold" : "",
    style.italic ? "italic" : "",
    style.underline ? "underline" : "",
    style.strikethrough ? "strike" : "",
  ].filter(Boolean);

  const activeCard = activeStylePresetKey(style, CARD_STYLE_PRESETS);

  const [linkInput, setLinkInput] = useState(style.linkHref || "");
  const [linkError, setLinkError] = useState<string | null>(null);

  useEffect(() => {
    setLinkInput(style.linkHref || "");
    setLinkError(null);
  }, [edit.id, style.linkHref]);

  function validateLink(value: string): { url: string; error?: string } {
    const trimmed = value.trim();
    if (!trimmed) return { url: "" };

    if (trimmed.startsWith("#")) {
      return { url: trimmed.toLowerCase() };
    }

    if (trimmed.startsWith("/")) {
      return { url: "", error: "Other pages coming soon. Use #section or https://..." };
    }

    if (trimmed.startsWith("mailto:") || trimmed.startsWith("tel:")) {
      return { url: trimmed };
    }

    let candidate = trimmed;
    if (!/^https?:\/\//i.test(candidate)) {
      if (/^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/.test(candidate)) {
        candidate = `https://${candidate}`;
      }
    }

    try {
      const parsed = new URL(candidate);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        return { url: parsed.toString() };
      }
      return { url: "", error: "Please enter a valid URL or #section." };
    } catch {
      return { url: "", error: "Please enter a valid URL or #section." };
    }
  }

  const handleApplyLink = (overrideValue?: string) => {
    const val = overrideValue !== undefined ? overrideValue : linkInput;
    const trimmed = val.trim();
    if (!trimmed) {
      handleClearLink();
      return;
    }

    const result = validateLink(trimmed);
    if (result.error) {
      setLinkError(result.error);
      return;
    }

    setLinkError(null);
    const finalHref = result.url || null;
    const autoTarget = finalHref && /^https?:\/\//i.test(finalHref) ? "_blank" : "_self";

    onChange({
      linkHref: finalHref,
      linkTarget: finalHref ? autoTarget : null,
      cursor: finalHref ? "pointer" : "",
    });

    if (finalHref) {
      setLinkInput(finalHref);
    }
  };

  const handleClearLink = () => {
    setLinkInput("");
    setLinkError(null);
    onChange({
      linkHref: null,
      linkTarget: null,
      cursor: "",
    });
  };

  const handleSelectSection = (section: string) => {
    setLinkInput(section);
    setLinkError(null);
    onChange({
      linkHref: section,
      linkTarget: "_self",
      cursor: "pointer",
    });
  };

  return (
    <aside className="w-full shrink-0 border-r border-l border-zinc-800 text-sm flex flex-col h-full rounded-none bg-zinc-950 select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* Header matching TemplateSidebar */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-800 px-4 bg-zinc-950 shadow-xs">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-zinc-900 border border-zinc-800 shadow-xs text-zinc-200">
            <Sliders className="h-4 w-4" />
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-xs font-semibold text-white">
              Element Style
            </span>
            <span className="truncate text-[10px] text-zinc-400 capitalize">
              {edit.blockKind ? `${edit.blockKind} section` : "Selected Element"}
              {responsiveEditMode && editBreakpoint ? ` · ${editBreakpoint}` : ""}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onReset}
            title="Reset Element Styles"
            className="h-7 w-7 rounded-lg cursor-pointer text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            title="Back to Sidebar"
            className="h-7 w-7 rounded-lg cursor-pointer text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors"
          >
            <PanelLeft className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="text" className="flex min-h-0 flex-1 flex-col gap-0">
        <div className="shrink-0 border-b border-zinc-800">
          <TabsList className="w-full h-9 rounded-none! grid grid-cols-6 gap-0 bg-background p-0">
            <ElementTabTrigger value="text">
              Text
            </ElementTabTrigger>
            <ElementTabTrigger value="fill">
              Fill
            </ElementTabTrigger>
            <ElementTabTrigger value="border">
              Border
            </ElementTabTrigger>
            <ElementTabTrigger value="fx">
              FX
            </ElementTabTrigger>
            <ElementTabTrigger value="layout">
              Layout
            </ElementTabTrigger>
            <ElementTabTrigger value="link">
              <span className="flex items-center justify-center gap-1">
                Link
                {style.linkHref ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0 ring-2 ring-emerald-400/30 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                ) : null}
              </span>
            </ElementTabTrigger>
          </TabsList>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-4 simple-scrollbar bg-zinc-950">
          {/* Tab 1: Typography */}
          <TabsContent value="text" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-4">
              <div className="space-y-2.5">
                <div className="grid grid-cols-[1fr_80px] gap-2">
                  <div className="space-y-1">
                    <Select value={style.fontFamily ?? "inherit"} onValueChange={(fontFamily) => onChange({ fontFamily })}>
                      <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                      <SelectContent className="templates-category-select-content">
                        {dynamicFontFamilies.map((font) => (
                          <SelectItem
                            key={font.value}
                            value={font.value}
                            className="cursor-pointer text-[11px]"
                            style={{ fontFamily: font.value }}
                          >
                            {font.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <NumberField value={style.fontSize ?? 16} min={8} max={140} unit="px" onChange={(fontSize) => onChange({ fontSize })} />
                </div>

                <div className="space-y-3 pt-1">
                  <SliderField label="Line Height" value={style.lineHeight ?? 1.5} min={0.8} max={3} step={0.1} onChange={(lineHeight) => onChange({ lineHeight })} />
                  <SliderField label="Letter Spacing" value={style.letterSpacing ?? 0} min={-5} max={20} step={0.5} unit="px" onChange={(letterSpacing) => onChange({ letterSpacing })} />
                </div>
              </div>

              <Separator className="bg-zinc-800" />

              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                  {/* Bold / Italic / Underline / Strikethrough */}
                  <div className="flex w-full h-7 rounded-md border border-white/10 bg-zinc-950 overflow-hidden">
                    <ToggleGroup
                      type="multiple"
                      value={formatValues}
                      onValueChange={(v) =>
                        onChange({
                          bold: v.includes("bold"),
                          italic: v.includes("italic"),
                          underline: v.includes("underline"),
                          strikethrough: v.includes("strike"),
                        })
                      }
                      className="flex w-full !gap-0 !p-0 !rounded-none !border-0 !bg-transparent"
                    >
                      <ToggleGroupItem
                        value="bold"
                        className="flex-1 !rounded-none !border-0 !shadow-none flex items-center justify-center cursor-pointer text-zinc-400 hover:bg-white/5 hover:text-white data-[state=on]:bg-white/10 data-[state=on]:text-white border-r border-white/10"
                        title="Bold"
                      >
                        <Bold className="h-3.5 w-3.5" />
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="italic"
                        className="flex-1 !rounded-none !border-0 !shadow-none flex items-center justify-center cursor-pointer text-zinc-400 hover:bg-white/5 hover:text-white data-[state=on]:bg-white/10 data-[state=on]:text-white border-r border-white/10"
                        title="Italic"
                      >
                        <Italic className="h-3.5 w-3.5" />
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="underline"
                        className="flex-1 !rounded-none !border-0 !shadow-none flex items-center justify-center cursor-pointer text-zinc-400 hover:bg-white/5 hover:text-white data-[state=on]:bg-white/10 data-[state=on]:text-white border-r border-white/10"
                        title="Underline"
                      >
                        <Underline className="h-3.5 w-3.5" />
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="strike"
                        className="flex-1 !rounded-none !border-0 !shadow-none flex items-center justify-center cursor-pointer text-zinc-400 hover:bg-white/5 hover:text-white data-[state=on]:bg-white/10 data-[state=on]:text-white"
                        title="Strikethrough"
                      >
                        <Strikethrough className="h-3.5 w-3.5" />
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>

                  {/* Text alignment */}
                  <div className="flex w-full h-7 rounded-md border border-white/10 bg-zinc-950 overflow-hidden">
                    <ToggleGroup
                      type="single"
                      value={style.textAlign ?? "left"}
                      onValueChange={(v) =>
                        v && onChange({ textAlign: v as PreviewElementStyle["textAlign"] })
                      }
                      className="flex w-full !gap-0 !p-0 !rounded-none !border-0 !bg-transparent"
                    >
                      <ToggleGroupItem
                        value="left"
                        className="flex-1 !rounded-none !border-0 !shadow-none flex items-center justify-center cursor-pointer text-zinc-400 hover:bg-white/5 hover:text-white data-[state=on]:bg-white/10 data-[state=on]:text-white border-r border-white/10"
                        title="Align Left"
                      >
                        <AlignLeft className="h-3.5 w-3.5" />
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="center"
                        className="flex-1 !rounded-none !border-0 !shadow-none flex items-center justify-center cursor-pointer text-zinc-400 hover:bg-white/5 hover:text-white data-[state=on]:bg-white/10 data-[state=on]:text-white border-r border-white/10"
                        title="Align Center"
                      >
                        <AlignCenter className="h-3.5 w-3.5" />
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="right"
                        className="flex-1 !rounded-none !border-0 !shadow-none flex items-center justify-center cursor-pointer text-zinc-400 hover:bg-white/5 hover:text-white data-[state=on]:bg-white/10 data-[state=on]:text-white border-r border-white/10"
                        title="Align Right"
                      >
                        <AlignRight className="h-3.5 w-3.5" />
                      </ToggleGroupItem>
                      <ToggleGroupItem
                        value="justify"
                        className="flex-1 !rounded-none !border-0 !shadow-none flex items-center justify-center cursor-pointer text-zinc-400 hover:bg-white/5 hover:text-white data-[state=on]:bg-white/10 data-[state=on]:text-white"
                        title="Justify"
                      >
                        <AlignJustify className="h-3.5 w-3.5" />
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
              </div>

              <Separator className="bg-zinc-800" />

              <div className="space-y-3">
                <ColorPicker
                  id="text-color"
                  label="Text Color"
                  value={style.color ?? "#ffffff"}
                  isOpen={activeColorPicker === "text-color"}
                  onOpenChange={(open) => setActiveColorPicker(open ? "text-color" : null)}
                  onChange={(color) => onChange({ color })}
                />

                <div className="space-y-1">
                  <Label className={`${labelClass} block mb-2 mt-2`}>
                    Text Shadow
                  </Label>
                  <Select value={style.textShadow || "none"} onValueChange={(v) => onChange({ textShadow: v === "none" ? "" : v })}>
                    <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {TEXT_SHADOW_PRESETS.map((preset) => (
                        <SelectItem key={preset.name} value={preset.value || "none"} className="cursor-pointer text-[11px]">{preset.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Tab 2: Fill */}
          <TabsContent value="fill" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-4">
              <div className="space-y-3">
                <ColorPicker
                  id="bg-color"
                  label="Background Color"
                  value={style.backgroundColor ?? "#000000"}
                  isOpen={activeColorPicker === "bg-color"}
                  onOpenChange={(open) => setActiveColorPicker(open ? "bg-color" : null)}
                  onChange={(backgroundColor) => onChange({ backgroundColor })}
                />
              </div>

              <Separator className="bg-primary/15" />

              <div className="space-y-3">

                <div className="space-y-1">
                  <Label className={`${labelClass} block mb-2`}>Gradient Overlay</Label>
                  <Select value={style.backgroundGradient || "none"} onValueChange={(v) => onChange({ backgroundGradient: v === "none" ? "" : v })}>
                    <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {GRADIENT_PRESETS.map((grad) => (
                        <SelectItem key={grad.name} value={grad.value || "none"} className="cursor-pointer text-[11px]">{grad.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {style.backgroundGradient ? (
                  <div className="space-y-3 rounded-xl border border-white/15 bg-zinc-950 p-3 shadow-xs">
                    <SliderField label="Angle" value={gradient.angle} min={0} max={360} unit="°" onChange={(angle) => onChange({ backgroundGradient: buildGradient(angle, gradient.colorA, gradient.colorB) })} />
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <ColorPicker
                        id="stop-a"
                        label="Stop A"
                        value={gradient.colorA}
                        isOpen={activeColorPicker === "stop-a"}
                        onOpenChange={(open) => setActiveColorPicker(open ? "stop-a" : null)}
                        onChange={(colorA) => onChange({ backgroundGradient: buildGradient(gradient.angle, colorA, gradient.colorB) })}
                      />
                      <ColorPicker
                        id="stop-b"
                        label="Stop B"
                        value={gradient.colorB}
                        isOpen={activeColorPicker === "stop-b"}
                        onOpenChange={(open) => setActiveColorPicker(open ? "stop-b" : null)}
                        onChange={(colorB) => onChange({ backgroundGradient: buildGradient(gradient.angle, gradient.colorA, colorB) })}
                      />
                    </div>
                  </div>
                ) : null}
              </div>


              <div className="space-y-3">
                <SliderField label="Opacity" value={Math.round((style.opacity ?? 1) * 100)} min={0} max={100} unit="%" onChange={(v) => onChange({ opacity: v / 100 })} />
              </div>
            </motion.div>
          </TabsContent>

          {/* Tab 3: Border */}
          <TabsContent value="border" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-4">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <NumberField label="Border Width" value={style.borderWidth ?? 0} min={0} max={20} unit="px" onChange={(borderWidth) => onChange({ borderWidth })} />
                  <div className="space-y-1">
                    <Label className={labelClass}>Style</Label>
                    <Select value={style.borderStyle ?? "solid"} onValueChange={(borderStyle) => onChange({ borderStyle: borderStyle as PreviewElementStyle["borderStyle"] })}>
                      <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solid" className="cursor-pointer text-[11px]">Solid</SelectItem>
                        <SelectItem value="dashed" className="cursor-pointer text-[11px]">Dashed</SelectItem>
                        <SelectItem value="dotted" className="cursor-pointer text-[11px]">Dotted</SelectItem>
                        <SelectItem value="none" className="cursor-pointer text-[11px]">None</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <NumberField label="Corner Radius" value={style.borderRadius ?? 0} min={0} max={120} unit="px" onChange={(borderRadius) => onChange({ borderRadius })} />

                <ColorPicker
                  id="stroke-color"
                  label="Border Color"
                  value={style.borderColor ?? "#ffffff"}
                  isOpen={activeColorPicker === "stroke-color"}
                  onOpenChange={(open) => setActiveColorPicker(open ? "stroke-color" : null)}
                  onChange={(borderColor) => onChange({ borderColor })}
                />
              </div>
            </motion.div>
          </TabsContent>

          {/* Tab 4: FX */}
          <TabsContent value="fx" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-4">
              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Card Presets</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {CARD_STYLE_PRESETS.map((preset) => {
                    const Icon = preset.icon;
                    const isActive = activeCard === preset.key;
                    return (
                      <button
                        key={preset.key}
                        type="button"
                        onClick={() => onChange(preset.apply)}
                        className={`flex items-center gap-2 rounded-md border px-2.5 py-2 text-[11px] font-medium cursor-pointer ${isActive
                          ? "border-white/20 bg-white/10 text-white"
                          : "border-white/10 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                          }`}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0" />
                        {preset.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Separator className="bg-zinc-800" />

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Hover Effect</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {HOVER_EFFECT_OPTIONS.map((opt) => {
                    const isActive = (style.hoverEffect ?? "none") === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => onChange({ hoverEffect: opt.value as PreviewElementStyle["hoverEffect"] })}
                        className={`flex items-center justify-center rounded-md border px-2 py-2 text-[11px] font-medium cursor-pointer ${isActive
                          ? "border-white/20 bg-white/10 text-white"
                          : "border-white/10 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                          }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Separator className="bg-zinc-800" />

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Entrance Animation</div>
                <div className="grid grid-cols-2 gap-1.5">
                  {ENTRANCE_OPTIONS.map((opt) => {
                    const isActive = (style.entrance ?? "none") === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => onChange({ entrance: opt.value as PreviewElementStyle["entrance"] })}
                        className={`flex items-center justify-center rounded-md border px-2.5 py-2 text-[11px] font-medium cursor-pointer ${isActive
                          ? "border-white/20 bg-white/10 text-white"
                          : "border-white/10 bg-zinc-900/40 text-zinc-400 hover:bg-zinc-900 hover:text-white"
                          }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {style.entrance && style.entrance !== "none" && (
                  <SliderField
                    label="Animation Duration"
                    value={style.entranceDuration ?? 0.6}
                    min={0.1}
                    max={2}
                    step={0.1}
                    unit="s"
                    onChange={(entranceDuration) => onChange({ entranceDuration })}
                  />
                )}
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="layout" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-5">
              <div className="space-y-3">
                <PresetRow<SpacingKey>
                  label="Preset"
                  value={spacingKeyFromValue(style.padding)}
                  options={[
                    { value: "tight", text: "Tight" },
                    { value: "cozy", text: "Cozy" },
                    { value: "roomy", text: "Roomy" },
                  ]}
                  onChange={(key) => onChange({ padding: SPACING_MAP[key] })}
                />

                <div className="grid grid-cols-2 gap-2">
                  <NumberField label="Padding" value={style.padding ?? 0} min={0} max={120} unit="px" onChange={(padding) => onChange({ padding })} />
                  <NumberField label="Margin" value={style.margin ?? 0} min={-60} max={120} unit="px" onChange={(margin) => onChange({ margin })} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Dimensions</div>
                <div className="grid grid-cols-2 gap-2">
                  <DimensionField
                    label="Width"
                    value={style.width}
                    defaultValue={edit.computedWidth}
                    onChange={(width) => onChange({ width })}
                  />
                  <DimensionField
                    label="Height"
                    value={style.height}
                    defaultValue={edit.computedHeight}
                    onChange={(height) => onChange({ height })}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">Behavior</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className={labelClass}>Cursor</Label>
                    <Select value={style.cursor || "default"} onValueChange={(v) => onChange({ cursor: v === "default" ? "" : v })}>
                      <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default" className="cursor-pointer text-[11px]">Default</SelectItem>
                        <SelectItem value="pointer" className="cursor-pointer text-[11px]">Pointer</SelectItem>
                        <SelectItem value="text" className="cursor-pointer text-[11px]">Text</SelectItem>
                        <SelectItem value="grab" className="cursor-pointer text-[11px]">Grab</SelectItem>
                        <SelectItem value="not-allowed" className="cursor-pointer text-[11px]">Not Allowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className={labelClass}>Overflow</Label>
                    <Select value={style.overflow || "visible"} onValueChange={(v) => onChange({ overflow: v as PreviewElementStyle["overflow"] })}>
                      <SelectTrigger className={fieldClass}><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="visible" className="cursor-pointer text-[11px]">Visible</SelectItem>
                        <SelectItem value="hidden" className="cursor-pointer text-[11px]">Hidden</SelectItem>
                        <SelectItem value="auto" className="cursor-pointer text-[11px]">Auto</SelectItem>
                        <SelectItem value="scroll" className="cursor-pointer text-[11px]">Scroll</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Tab 6: Link */}
          <TabsContent value="link" className="mt-0">
            <motion.div {...fadeIn()} className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className={labelClass}>Link URL</Label>
                  {style.linkHref ? (
                    <button
                      type="button"
                      onClick={handleClearLink}
                      className="text-[10px] text-zinc-500 hover:text-rose-400 cursor-pointer"
                    >
                      Clear
                    </button>
                  ) : null}
                </div>

                <div className="relative">
                  <Input
                    value={linkInput}
                    onChange={(e) => {
                      setLinkInput(e.target.value);
                      setLinkError(null);
                    }}
                    onBlur={() => handleApplyLink()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleApplyLink();
                      }
                    }}
                    placeholder="#section or https://..."
                    className="h-8 pr-7 !rounded-none bg-zinc-950 border-white/15 text-xs text-white placeholder:text-zinc-500 focus-visible:border-white/30 focus-visible:ring-white/10"
                  />
                  {linkInput && (
                    <button
                      type="button"
                      onClick={handleClearLink}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                      title="Clear"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {linkError ? (
                  <p className="text-[10px] text-amber-400">{linkError}</p>
                ) : (
                  <p className="text-[10px] text-zinc-500">
                    Use #section to jump within this page, or a full link to send people elsewhere.
                  </p>
                )}
              </div>

              {availableSectionLinks && availableSectionLinks.length > 0 && (
                <div className="space-y-1.5">
                  <Label className={labelClass}>Sections</Label>
                  <div className="flex flex-wrap gap-2">
                    {availableSectionLinks.map((sec) => {
                      const isSelected = style.linkHref === sec;
                      return (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => handleSelectSection(sec)}
                          className={`rounded-md px-2.5 py-1 text-[10px] font-mono cursor-pointer ${isSelected
                            ? "bg-white/10 text-white border border-white/20"
                            : "bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800"
                            }`}
                        >
                          {sec}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <p className="text-[10px] text-zinc-500">
                Routes like /about for other pages are coming soon.
              </p>
            </motion.div>
          </TabsContent>
        </div>
      </Tabs>

      {/* Footer Actions */}
      <div className="flex shrink-0 items-center justify-between gap-2 border-t border-white/10 bg-black/80 p-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onChange({ hidden: !isHidden, visibility: !isHidden ? "hidden" : "visible" })}
          className="h-8 flex-1 cursor-pointer gap-1.5 rounded-md border-white/15 bg-zinc-900/60 text-xs font-medium text-white hover:bg-zinc-900 hover:text-white"
        >
          {isHidden ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
          {isHidden ? "Show Element" : "Hide Element"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onRemove}
          className="h-8 flex-1 cursor-pointer gap-1.5 rounded-md border-rose-500/30 bg-rose-500/10 text-xs font-medium text-rose-400 hover:bg-rose-500/20 hover:text-rose-300"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Remove
        </Button>
      </div>
    </aside>
  );
}


