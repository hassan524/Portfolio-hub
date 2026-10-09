// @ts-nocheck
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Code2, WandSparkles } from "lucide-react";
import { Editable } from "@/components/editor/ui/Editable";

export function Hero({ props = {}, theme, onChange }: any) {
    const bg = theme?.bg || "#0A0A0C";
    const bgSecond = theme?.["bg-second"] || bg;
    const ink = theme?.ink || "#ffffff";
    const inkSecond = theme?.["ink-second"] || ink;
    const surface = theme?.surface || "rgba(255, 255, 255, 0.08)";
    const accent = theme?.accent || "#3B82F6";
    const items = props?.heroBadges || ["Product-minded engineer", "Frontend / creative tech", "Currently: building in public"];
    return (
        <section id="home" className="relative isolate min-h-[94dvh] overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pt-36" style={{ backgroundColor: bg, color: ink }}>
            <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute -right-40 top-12 h-[30rem] w-[30rem] rounded-full opacity-20 blur-3xl" style={{ backgroundColor: accent }} />
                <div className="absolute bottom-0 left-[20%] h-56 w-56 rounded-full bg-[#fa6654]/20 blur-3xl" />
                <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:22px_22px]" />
            </div>
            <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-2">
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} className="relative z-10">
                    <div className="mb-7 inline-flex rotate-[-2deg] items-center gap-2 rounded-lg border-2 border-current px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.19em] shadow-[4px_4px_0_currentColor]">
                        <span className="h-2 w-2 animate-pulse rounded-full" style={{ backgroundColor: accent }} />
                        <Editable value={props?.eyebrow || "Independent developer · chapter 04"} onChange={(v) => onChange?.({ eyebrow: v })} />
                    </div>
                    <h1 className="max-w-3xl text-[clamp(3.6rem,9vw,7.8rem)] font-black leading-[0.83] tracking-[-0.09em]">
                        <span className="block"><Editable value={props?.headlineLineOne || "Code that"} onChange={(v) => onChange?.({ headlineLineOne: v })} /></span>
                        <span className="relative ml-6 mt-2 inline-block -rotate-2 rounded-[0.18em] px-3 pb-3 pt-1" style={{ backgroundColor: accent, color: bg }}>
                            <Editable value={props?.headlineLineTwo || "feels alive."} onChange={(v) => onChange?.({ headlineLineTwo: v })} />
                            <span className="absolute -right-5 -top-5 rotate-12"><WandSparkles size={34} strokeWidth={1.8} /></span>
                        </span>
                    </h1>
                    <p className="mt-9 max-w-xl text-base leading-7 opacity-75 sm:text-lg sm:leading-8">
                        <Editable value={props?.intro || "I’m Mira Chen — a software engineer who turns complicated product ideas into clear, characterful experiences. I care about the last 10%: the rhythm, the edge cases, the tiny detail that makes someone stay."} onChange={(v) => onChange?.({ intro: v })} />
                    </p>
                    <div className="mt-8 flex flex-wrap gap-2">
                        {items.map((badge, index) => (
                            <span key={`${index}-${badge}`} className="rounded-full border border-current/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] opacity-80">
                                <Editable value={badge} onChange={(v) => onChange?.({ heroBadges: items.map((item, i) => i === index ? v : item) })} />
                            </span>
                        ))}
                    </div>
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <a href="#projects" className="group inline-flex items-center gap-3 rounded-full px-6 py-4 text-sm font-extrabold transition-all hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accent, color: bg }}>
                            <Editable value="Read the episodes" />
                            <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                        <a href="#about" className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-all hover:scale-[1.02] active:scale-95">
                            <Code2 size={16} />
                            <Editable value="Meet the engineer" />
                        </a>
                    </div>
                    <div className="mt-12 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.17em] opacity-50">
                        <ArrowDown size={14} />
                        <Editable value="Scroll to begin the story" />
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, delay: 0.12 }} className="relative mx-auto w-full max-w-[610px]">
                    <figure className="relative aspect-[0.98] overflow-hidden rounded-[2.7rem] border border-white/15 shadow-2xl" style={{ backgroundColor: surface }} role="img" aria-label={props?.portraitAlt || "Original illustrated portrait of Mira, a curious software engineer inside a dreamlike digital workshop"}>
                        <svg viewBox="0 0 640 640" className="absolute inset-0 h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <defs>
                                <linearGradient id="sceneBg" x1="75" y1="51" x2="545" y2="594" gradientUnits="userSpaceOnUse"><stop stopColor="#F7C85A" /><stop offset=".52" stopColor="#F47768" /><stop offset="1" stopColor="#A84F8D" /></linearGradient>
                                <linearGradient id="hair" x1="226" y1="160" x2="420" y2="472" gradientUnits="userSpaceOnUse"><stop stopColor="#33324F" /><stop offset="1" stopColor="#121521" /></linearGradient>
                            </defs>
                            <rect width="640" height="640" rx="46" fill="url(#sceneBg)" />
                            <path d="M0 482C100 437 160 469 247 430C355 382 438 434 640 362V640H0V482Z" fill="#F7E6C8" fillOpacity=".3" />
                            <path d="M42 84L51 116L84 122L54 134L44 166L34 135L4 123L34 115L42 84Z" fill="#FFF1C7" />
                            <path d="M544 79L552 103L577 111L553 120L545 146L537 121L513 112L537 103L544 79Z" fill="#FFF1C7" />
                            <circle cx="518" cy="248" r="89" stroke="#FFF1C7" strokeWidth="2" strokeDasharray="4 10" opacity=".8" />
                            <path d="M520 166V330M438 248H603M462 190L577 305M578 190L462 306" stroke="#FFF1C7" strokeWidth="2" opacity=".48" />
                            <rect x="47" y="279" width="108" height="136" rx="13" fill="#FFF0D4" stroke="#242638" strokeWidth="4" transform="rotate(-9 47 279)" />
                            <path d="M66 307L122 298M69 326L125 316M72 345L113 338M76 367L120 358" stroke="#4A4B65" strokeWidth="5" strokeLinecap="round" transform="rotate(-9 47 279)" />
                            <path d="M178 506C198 449 242 418 319 411C401 404 452 445 480 544V640H142L178 506Z" fill="#FE7065" stroke="#242638" strokeWidth="8" />
                            <path d="M228 514C248 476 284 453 321 451C361 449 392 471 410 514" stroke="#F9D8B7" strokeWidth="9" strokeLinecap="round" />
                            <path d="M201 252C201 159 248 106 325 106C412 106 458 171 449 274L429 376C417 428 375 464 321 464C264 464 224 423 212 369L201 252Z" fill="url(#hair)" stroke="#242638" strokeWidth="8" />
                            <path d="M243 248C243 187 278 154 328 154C380 154 408 192 405 254L399 340C395 388 365 421 324 421C282 421 254 389 249 340L243 248Z" fill="#FFD5B8" stroke="#242638" strokeWidth="7" />
                            <path d="M198 254C179 169 212 90 303 83C357 79 399 105 422 141C391 131 371 142 348 163C321 187 284 190 257 177C265 202 253 222 228 238L218 288L198 254Z" fill="url(#hair)" stroke="#242638" strokeWidth="8" strokeLinejoin="round" />
                            <path d="M370 137C428 158 454 214 438 282L423 320L407 266L399 216C383 192 368 171 348 161L370 137Z" fill="url(#hair)" stroke="#242638" strokeWidth="8" strokeLinejoin="round" />
                            <path d="M270 290C280 280 294 280 304 289" stroke="#28283D" strokeWidth="6" strokeLinecap="round" />
                            <path d="M345 289C356 279 370 280 380 289" stroke="#28283D" strokeWidth="6" strokeLinecap="round" />
                            <ellipse cx="289" cy="304" rx="7" ry="10" fill="#32324D" /><ellipse cx="364" cy="304" rx="7" ry="10" fill="#32324D" />
                            <path d="M309 348C319 357 334 359 346 349" stroke="#D45F64" strokeWidth="5" strokeLinecap="round" />
                            <path d="M252 317C233 310 224 323 229 339C233 352 246 354 255 345M398 314C417 305 429 319 424 335C420 349 407 353 397 344" fill="#FFD5B8" stroke="#242638" strokeWidth="6" />
                            <path d="M269 279C279 270 294 269 307 278M341 278C354 269 369 270 381 278" stroke="#242638" strokeWidth="5" strokeLinecap="round" />
                            <path d="M208 251L245 240M402 234L438 251" stroke="#FE7065" strokeWidth="9" strokeLinecap="round" />
                            <circle cx="155" cy="457" r="13" fill="#F4C84A" stroke="#242638" strokeWidth="5" />
                            <path d="M484 401L499 431L531 435L505 452L510 484L484 465L457 483L466 452L441 434L473 430L484 401Z" fill="#F4C84A" stroke="#242638" strokeWidth="4" />
                            <path d="M112 514L127 532L149 535L132 550L136 573L116 561L95 573L101 550L83 536L106 532L112 514Z" fill="#FFF1C7" />
                            <path d="M508 87L518 108L541 111L524 127L528 149L508 138L488 149L492 127L475 111L498 108L508 87Z" fill="#F7C85A" />
                            <path d="M459 534C491 517 526 516 564 535" stroke="#242638" strokeWidth="8" strokeLinecap="round" />
                            <path d="M496 552C521 542 543 544 565 555" stroke="#242638" strokeWidth="6" strokeLinecap="round" />
                        </svg>
                        <div className="absolute left-5 top-5 rotate-[-5deg] rounded-md border-2 border-[#22243a] bg-[#fff2d4] px-3 py-2 font-mono text-[9px] font-black uppercase tracking-[0.15em] text-[#22243a] shadow-[4px_4px_0_#22243a]">
                            <Editable value={props?.artLabel || "Main character energy"} onChange={(v) => onChange?.({ artLabel: v })} />
                        </div>
                        <div className="absolute bottom-5 right-5 rounded-2xl border border-white/35 px-4 py-3 backdrop-blur-md" style={{ backgroundColor: surface, color: ink }}>
                            <div className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-70"><Editable value="Current side quest" /></div>
                            <div className="mt-1 text-sm font-bold"><Editable value={props?.sideQuest || "Making the web feel human"} onChange={(v) => onChange?.({ sideQuest: v })} /></div>
                        </div>
                    </figure>
                    <div className="absolute -bottom-5 -left-3 hidden -rotate-6 items-center gap-2 rounded-full border-2 border-current px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] shadow-[5px_5px_0_currentColor] sm:flex" style={{ backgroundColor: bgSecond }}>
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                        <Editable value="Build · learn · repeat" />
                    </div>
                </motion.div>
            </div>
            <span className="sr-only"><Editable value={props?.portraitAlt || "Original illustrated portrait of Mira, a curious software engineer inside a dreamlike digital workshop"} onChange={(v) => onChange?.({ portraitAlt: v })} /></span>
        </section>
    );
}
