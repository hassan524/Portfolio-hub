// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaStar, FaQuoteLeft } from "react-icons/fa6";

interface TestimonialsProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency1Testimonials: React.FC<TestimonialsProps> = ({
  theme = {},
  props = {},
  data = {},
  onChange,
  onUpdate,
}) => {
  const p = { ...data, ...props };

  const handleUpdate = (field: string, val: any) => {
    if (onUpdate) onUpdate(field, val);
    if (onChange) onChange({ [field]: val });
  };

  const reviews = [
    {
      id: "rev-1",
      author: "Sophia Chen",
      role: "Traveled to Bali & Nusa Penida",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote:
        "Voyare planned every detail of our honeymoon with pure perfection. From the private lagoon villa to our sunrise boat charter, we didn't have to stress about a single logistical detail.",
      rating: 5,
    },
    {
      id: "rev-2",
      author: "Julian & Clara Rossi",
      role: "Traveled to Amalfi Coast",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote:
        "Hands down the best travel agency experience we've ever had. Our concierge was responsive on WhatsApp in minutes whenever we wanted to change our evening dinner reservations.",
      rating: 5,
    },
    {
      id: "rev-3",
      author: "Marcus Lindqvist",
      role: "Traveled to Swiss Alps Chalet",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      quote:
        "Breathtaking views, luxury accommodations, and ski passes arranged beforehand. Voyare delivers what they promise: truly unforgettable travel moments.",
      rating: 5,
    },
  ];

  return (
    <section id="offers" className="relative w-full py-24 md:py-32 bg-white text-slate-900 font-['Poppins',sans-serif]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600 block">
            <Editable value={p.testSub || "Real Traveler Stories"} onChange={(v) => handleUpdate("testSub", v)} />
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            <Editable value={p.testTitle || "Loved by Thousands of Explorers"} onChange={(v) => handleUpdate("testTitle", v)} />
          </h2>
        </div>

        {/* Reviews 3-Card Row (Clean White Aesthetic) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-8 md:p-10 rounded-3xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400 text-sm">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-base text-slate-700 font-normal leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-slate-200/60 flex items-center gap-4">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{rev.author}</h4>
                  <p className="text-xs text-slate-500">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TravelBrandAgency1Testimonials;
