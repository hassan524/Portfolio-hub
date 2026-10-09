// @ts-nocheck
import { ArrowDownRight, ArrowRight, MoveUpRight } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const stats = props?.stats || [
        { value: "08", label: "years at the board" },
        { value: "24", label: "products shipped" },
        { value: "06", label: "teams partnered with" },
    ];
    const updateStat = (index: number, key: string, value: string) =>
        onChange?.({ stats: stats.map((item: any, i: number) => i === index ? { ...item, [key]: value } : item) });
    const board = [
        "♜", "·", "·", "·", "♚", "·", "·", "♜",
        "♟", "♟", "·", "♛", "·", "♟", "♟", "♟",
        "·", "·", "♞", "·", "♟", "♞", "·", "·",
        "·", "·", "♟", "·", "♙", "·", "·", "·",
        "·", "·", "·", "♙", "·", "·", "·", "·",
        "·", "·", "♘", "·", "·", "♘", "·", "·",
        "♙", "♙", "·", "·", "·", "♙", "♙", "♙",
        "♖", "·", "·", "♕", "♔", "·", "·", "♖",
    ];
    return (
        <section id="top" className="relative overflow-hidden" style={{ backgroundColor: bg, color: ink }}>
            <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 pb-16 pt-14 md:min-h-[690px] md:grid-cols-[1.1fr_0.9fr] md:px-12 md:py-20">
                <div className="relative z-10">
                    <p className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: accent }}>
                        <span className="block h-px w-8" style={{ backgroundColor: accent }} />
                        <Editable value={props?.eyebrow || "Independent software engineer · Brooklyn, NY"} onChange={(v) => onChange?.({ eyebrow: v })} />
                    </p>
                    <h1 className="max-w-4xl font-['DM_Serif_Display'] text-[clamp(3.6rem,8.6vw,8rem)] leading-[0.87] tracking-[-0.055em]">
                        <span className="block"><Editable value={props?.headline || "Think three"} onChange={(v) => onChange?.({ headline: v })} /></span>
                        <span className="block pl-[0.14em]" style={{ color: accent }}><Editable value={props?.headlineAccent || "moves ahead."} onChange={(v) => onChange?.({ headlineAccent: v })} /></span>
                    </h1>
                    <div className="mt-8 grid max-w-2xl grid-cols-[48px_1fr] gap-4 md:mt-10">
                        <span className="font-mono text-xs leading-6" style={{ color: accent }}>01—03</span>
                        <p className="max-w-xl text-sm leading-7 md:text-base md:leading-8" style={{ color: inkSecond }}>
                            <Editable value={props?.subtitle || "I make complex software feel inevitable: understand the position, choose the useful move, and build it to last."} onChange={(v) => onChange?.({ subtitle: v })} />
                        </p>
                    </div>
                    <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 pl-[64px]">
                        <a href="#projects" className="group inline-flex items-center gap-3 border-b pb-2 text-sm" style={{ borderColor: accent, color: ink }}>
                            <Editable value={props?.primaryLabel || "Review selected work"} onChange={(v) => onChange?.({ primaryLabel: v })} />
                            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" style={{ color: accent }} />
                        </a>
                        <a href="#about" className="inline-flex items-center gap-2 text-xs" style={{ color: inkSecond }}>
                            <Editable value={props?.secondaryLabel || "Read my approach"} onChange={(v) => onChange?.({ secondaryLabel: v })} />
                            <ArrowDownRight size={14} style={{ color: accent }} />
                        </a>
                    </div>
                    <div className="mt-14 grid max-w-[620px] grid-cols-3 border-t pt-5" style={{ borderColor: surface }}>
                        {stats.map((stat: any, index: number) => (
                            <div key={`stat-${index}`} className="border-r px-4 first:pl-0 last:border-0" style={{ borderColor: surface }}>
                                <p className="font-mono text-2xl tracking-tight md:text-3xl"><Editable value={stat.value} onChange={(v) => updateStat(index, "value", v)} /></p>
                                <p className="mt-2 max-w-[120px] text-[10px] leading-4 md:text-xs" style={{ color: inkSecond }}><Editable value={stat.label} onChange={(v) => updateStat(index, "label", v)} /></p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative mx-auto w-full max-w-[510px]">
                    <div className="mb-3 flex items-end justify-between font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: inkSecond }}>
                        <span><Editable value={props?.boardLabel || "Position 01 · White to move"} onChange={(v) => onChange?.({ boardLabel: v })} /></span>
                        <span style={{ color: accent }}><Editable value={props?.boardNotation || "Nf3 · d5"} onChange={(v) => onChange?.({ boardNotation: v })} /></span>
                    </div>
                    <div className="grid grid-cols-8 border" style={{ borderColor: surface }}>
                        {board.map((piece, index) => (
                            <div key={`square-${index}`} className="relative grid aspect-square place-items-center font-serif text-[clamp(1.25rem,4vw,3rem)] leading-none" style={{ backgroundColor: (Math.floor(index / 8) + index % 8) % 2 === 0 ? `${accent}22` : bgSecond, color: piece === "·" ? "transparent" : ["♟", "♜", "♞", "♝", "♛", "♚"].includes(piece) ? accent : ink }}>
                                {piece}
                                {index === 36 && <span className="absolute inset-1 border" style={{ borderColor: accent }} />}
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 flex justify-between font-mono text-[9px] tracking-[0.16em]" style={{ color: inkSecond }}>
                        {"a b c d e f g h".split(" ").map((file) => <span key={file}>{file}</span>)}
                    </div>
                    <div className="mt-7 grid grid-cols-[1fr_auto] items-end gap-4 border-t pt-4" style={{ borderColor: surface }}>
                        <p className="max-w-xs text-xs leading-5" style={{ color: inkSecond }}>
                            <Editable value={props?.boardCaption || "The best solution is rarely the first move. I like to understand what it makes possible next."} onChange={(v) => onChange?.({ boardCaption: v })} />
                        </p>
                        <a href="#experience" className="inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em]" style={{ color: accent }}>
                            <Editable value={props?.boardLinkLabel || "My track record"} onChange={(v) => onChange?.({ boardLinkLabel: v })} />
                            <MoveUpRight size={13} />
                        </a>
                    </div>
                    <span className="absolute -right-4 -top-7 hidden font-mono text-[9px] tracking-[0.18em] md:block" style={{ color: inkSecond }}>FIG. 01 / OPENING PRINCIPLE</span>
                </div>
            </div>
            <div className="border-t" style={{ borderColor: surface }}>
                <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-3 font-mono text-[9px] uppercase tracking-[0.17em] md:px-12" style={{ color: inkSecond }}>
                    <span><Editable value={props?.tickerLeft || "A portfolio in considered moves"} onChange={(v) => onChange?.({ tickerLeft: v })} /></span>
                    <span className="hidden sm:inline"><Editable value={props?.tickerRight || "Product engineering · 2016—2025"} onChange={(v) => onChange?.({ tickerRight: v })} /></span>
                </div>
            </div>
        </section>
    );
}
