// @ts-nocheck
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiMapPin, FiClock, FiArrowUpRight } from 'react-icons/fi';
import { Editable } from '@/components/editor/ui/Editable';

const C = {
    frame: '#E8ECE3',
    card: '#F7F8F3',
    white: '#FFFFFF',
    ink: '#16261B',
    inkSecond: '#5F7265',
    sage: '#5C7B5D',
    mint: '#CFE5CF',
    tint: '#E3EADF'
};

export function Contact({ props = {}, onChange }: any) {
    const channels = [
        {
            icon: FaInstagram,
            title: 'Instagram DM',
            detail: '@beautyplus.official',
            href: 'https://instagram.com',
            external: true
        },
        {
            icon: FaWhatsapp,
            title: 'WhatsApp',
            detail: '+1 (718) 555-0144',
            href: 'https://wa.me/17185550144',
            external: true
        },
        {
            icon: FiMail,
            title: 'Email',
            detail: 'hello@beautyplus.co',
            href: 'mailto:hello@beautyplus.co',
            external: false
        }
    ];

    return (
        <section
            id="contact"
            className="w-full px-4 py-8 sm:px-6"
            style={{ backgroundColor: C.frame, color: C.ink, fontFamily: 'Poppins, system-ui, sans-serif' }}
        >
            <div className="mx-auto grid max-w-7xl gap-12 rounded-[2.5rem] p-6 sm:p-12 lg:grid-cols-2 lg:items-center" style={{ backgroundColor: C.card }}>
                <div>
                    <span className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold" style={{ backgroundColor: C.mint, color: C.ink }}>
                        <Editable value="Contact" style={{ color: 'inherit' }} />
                    </span>
                    <Editable
                        as="h2"
                        value={props?.title || 'Questions about your skin? Talk to us.'}
                        onChange={(v) => onChange?.({ title: v })}
                        className="mt-5 text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl"
                        style={{ color: C.ink }}
                    />
                    <Editable
                        as="p"
                        value="Message us to place an order or get product advice. We reply on WhatsApp and Instagram within the hour during opening hours."
                        className="mt-5 max-w-md text-sm leading-relaxed"
                        style={{ color: C.inkSecond }}
                    />

                    <div className="mt-8 flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium" style={{ backgroundColor: C.white }}>
                            <FiMapPin size={14} style={{ color: C.sage }} />
                            <Editable value="Mayfair, London" style={{ color: C.ink }} />
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-medium" style={{ backgroundColor: C.white }}>
                            <FiClock size={14} style={{ color: C.sage }} />
                            <Editable value="Mon to Sat, 9am to 6pm" style={{ color: C.ink }} />
                        </span>
                    </div>
                </div>

                <div className="space-y-4 rounded-[2rem] p-4 sm:p-6" style={{ backgroundColor: C.tint }}>
                    {channels.map(({ icon: Icon, title, detail, href, external }, i) => (
                        <a
                            key={title}
                            href={href}
                            target={external ? '_blank' : undefined}
                            rel={external ? 'noreferrer' : undefined}
                            className="flex items-center justify-between gap-4 rounded-full py-3 pl-3 pr-4 transition hover:-translate-y-0.5 hover:shadow-lg"
                            style={i === 1 ? { backgroundColor: C.sage, color: C.white } : { backgroundColor: C.white, color: C.ink }}
                        >
                            <span className="flex items-center gap-4">
                                <span
                                    className="grid h-12 w-12 place-items-center rounded-full"
                                    style={i === 1 ? { backgroundColor: C.white, color: C.sage } : { backgroundColor: C.tint, color: C.sage }}
                                >
                                    <Icon size={20} />
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold">{title}</span>
                                    <span className="block text-xs opacity-75">{detail}</span>
                                </span>
                            </span>
                            <span
                                className="grid h-10 w-10 place-items-center rounded-full"
                                style={i === 1 ? { backgroundColor: C.white, color: C.ink } : { backgroundColor: C.ink, color: C.white }}
                            >
                                <FiArrowUpRight size={16} />
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}