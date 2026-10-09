// @ts-nocheck
import { Editable } from '@/components/editor/ui/Editable';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Check } from 'lucide-react';

const MENU_CATEGORIES = ['All', 'Starters', 'Entrees', 'Sides', 'Beverages'];

const DISHES = [
    {
        id: 1,
        name: 'Crispy Mozzarella Bites',
        category: 'Starters',
        desc: 'Hand-breaded artisan mozzarella with roasted sun-dried tomato sauce.',
        price: '$9.50',
        image: 'https://images.unsplash.com/photo-1548340748-6d2b7d7da410?auto=format&fit=crop&w=600&q=80',
        tag: 'Popular',
    },
    {
        id: 2,
        name: 'Crispy Herb Chicken',
        category: 'Entrees',
        desc: 'Tender chicken tossed in wild garden herbs, garlic butter, and sea salt.',
        price: '$16.99',
        image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80',
        tag: 'Chef Choice',
    },
    {
        id: 3,
        name: 'Golden Loaded Potato Wedges',
        category: 'Sides',
        desc: 'Crispy russet potatoes dusted with smoked paprika and house aioli.',
        price: '$8.00',
        image: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=600&q=80',
        tag: 'Organic',
    },
];

export function FoodBrand1Projects({ props = {}, theme, onChange }: any) {
    const [selectedCat, setSelectedCat] = useState('All');
    const bg = theme?.bg || '#1e523c';
    const ink = theme?.ink || '#ffffff';

    const filteredDishes = selectedCat === 'All'
        ? DISHES
        : DISHES.filter(d => d.category === selectedCat);

    return (
        <section
            id="menu"
            className="w-full relative px-6 sm:px-12 py-20 select-none overflow-hidden"
            style={{ backgroundColor: bg, color: ink }}
        >
            <div className="mx-auto max-w-7xl w-full relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12 max-w-2xl mx-auto"
                >
                    <h2
                        className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-3 text-white"
                        style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}
                    >
                        <Editable
                            value={props?.menuTitle || 'Discover Our Menu'}
                            onChange={v => onChange?.({ menuTitle: v })}
                        />
                    </h2>
                    <p className="text-white/80 text-sm sm:text-base font-medium">
                        <Editable
                            value={props?.menuSubtitle || 'Wholesome, flavorful dishes prepared fresh to order using the finest farm ingredients.'}
                            onChange={v => onChange?.({ menuSubtitle: v })}
                        />
                    </p>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                        {MENU_CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCat(cat)}
                                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                                    selectedCat === cat
                                        ? 'bg-[#cbe675] text-[#1e523c] shadow-md scale-105'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* 3 Food Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredDishes.map((dish, i) => (
                        <motion.div
                            key={dish.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.15 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col justify-between text-gray-900 group hover:-translate-y-2 transition-all duration-300"
                        >
                            <div>
                                <div className="aspect-4/3 w-full overflow-hidden relative">
                                    <img
                                        src={dish.image}
                                        alt={dish.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/95 text-[#1e523c] shadow-sm">
                                        {dish.tag}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="text-lg font-black leading-snug text-gray-900">
                                            {dish.name}
                                        </h3>
                                        <span className="text-base font-black text-[#1e523c] shrink-0">
                                            {dish.price}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 leading-relaxed font-medium">
                                        {dish.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="px-6 pb-6 pt-2">
                                <a
                                    href="#contact"
                                    className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-gray-200 hover:bg-[#1e523c] hover:text-white hover:border-[#1e523c] transition-all duration-200"
                                >
                                    Order Now
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export const ProjectsGrid = FoodBrand1Projects;
export default FoodBrand1Projects;
