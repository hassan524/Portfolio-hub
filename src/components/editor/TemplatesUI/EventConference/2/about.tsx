// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';

const galleryPhotos = [
    {
        id: 'g1',
        title: 'TORONTO STAGE',
        caption: 'Main Arena Crowd (20,000+)',
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'g2',
        title: 'LIVE KEYNOTE',
        caption: 'Spotlight on Stage',
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'g3',
        title: 'STAGE 03',
        caption: 'Interactive Kinetic Screen',
        image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80'
    },
    {
        id: 'g4',
        title: 'BACKSTAGE & TECH',
        caption: 'Visual Telemetry Swarm',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80'
    }
];

export function EventConference2About({ props = {}, theme, onChange }: any) {
    const bg = theme?.['bg-second'] || '#000000';
    const ink = theme?.ink || '#FFFFFF';
    const accent = theme?.accent || '#FFD600';

    return (
        <section
            id="about"
            className="w-full py-20 sm:py-28 px-4 sm:px-8 transition-colors select-none"
            style={{
                backgroundColor: bg,
                color: ink
            }}
        >
            <div className="mx-auto max-w-7xl space-y-16">
                
                {/* 1. Live Stage Photo Strip / Mosaic */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                    {galleryPhotos.map((photo) => (
                        <div
                            key={photo.id}
                            className="relative group rounded-2xl overflow-hidden border-2 border-neutral-800 aspect-[4/5] bg-neutral-900 shadow-xl"
                        >
                            <img
                                src={photo.image}
                                alt={photo.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4">
                                <h4 className="text-sm sm:text-base font-black uppercase tracking-tight text-white leading-tight">
                                    {photo.title}
                                </h4>
                                <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                                    {photo.caption}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 2. Bold Statement: 25 YEARS IN CREATIVE MEDIA */}
                <div className="text-center max-w-4xl mx-auto space-y-6 pt-6">
                    <p className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: accent }}>
                        ESTABLISHED 2001 · TORONTO
                    </p>

                    <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight leading-[1.02] font-sans">
                        <Editable value={props?.yearsHeadline || '25 YEARS IN CREATIVE MEDIA & LIVE PRODUCTION'} onChange={v => onChange?.({ yearsHeadline: v })} />
                    </h2>

                    <p className="text-sm sm:text-lg text-neutral-400 max-w-2xl mx-auto leading-relaxed font-sans font-normal">
                        <Editable
                            value={props?.yearsDesc || "PixelStage represents the pinnacle of experiential conferences. Bringing together 20,000+ global creatives, sound architects, and digital pioneers across 3 non-stop stages in Toronto."}
                            onChange={v => onChange?.({ yearsDesc: v })}
                        />
                    </p>
                </div>

            </div>
        </section>
    );
}

export const AboutSimple = EventConference2About;
export default EventConference2About;
