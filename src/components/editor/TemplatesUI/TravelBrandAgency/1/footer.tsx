// @ts-nocheck
import React from "react";
import Editable from "@/components/editor/ui/Editable";
import { FaPlane, FaArrowRight } from "react-icons/fa6";

interface FooterProps {
  theme?: Record<string, string>;
  props?: Record<string, any>;
  data?: Record<string, any>;
  onChange?: (val: any) => void;
  onUpdate?: (path: string, val: any) => void;
}

export const TravelBrandAgency1Footer: React.FC<FooterProps> = ({
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

  return (
    <footer className="w-full bg-white text-slate-600 font-['Poppins',sans-serif] pt-20 pb-12 border-t border-slate-100">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-base shadow-sm">
                <FaPlane className="text-white transform -rotate-45" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900">
                <Editable value={p.brandName || "Voyare"} onChange={(v) => handleUpdate("brandName", v)} />
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              We curate unhurried, breathtaking travel moments across the world's most spectacular islands, coastlines, and mountain sanctuaries.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3 text-sm">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Destinations</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#packages" className="hover:text-emerald-600 transition-colors">Bali, Indonesia</a></li>
              <li><a href="#packages" className="hover:text-emerald-600 transition-colors">Amalfi Coast, Italy</a></li>
              <li><a href="#packages" className="hover:text-emerald-600 transition-colors">Swiss Alps, Zermatt</a></li>
              <li><a href="#packages" className="hover:text-emerald-600 transition-colors">Kyoto, Japan</a></li>
              <li><a href="#packages" className="hover:text-emerald-600 transition-colors">Santorini, Greece</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 space-y-3 text-sm">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-slate-500">
              <li><a href="#about" className="hover:text-emerald-600 transition-colors">About Us</a></li>
              <li><a href="#packages" className="hover:text-emerald-600 transition-colors">Travel Packages</a></li>
              <li><a href="#offers" className="hover:text-emerald-600 transition-colors">Traveler Reviews</a></li>
              <li><a href="#contact" className="hover:text-emerald-600 transition-colors">Concierge Desk</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Travel Inspiration</h4>
            <p className="text-xs text-slate-500">
              Get secret flight alerts and private villa invites delivered to your inbox once a month.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
              />
              <button
                type="button"
                className="px-5 py-3 rounded-full bg-slate-900 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center transition-colors shadow-sm flex-shrink-0"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal Strip */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Voyare Travel Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer">Booking Conditions</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default TravelBrandAgency1Footer;
