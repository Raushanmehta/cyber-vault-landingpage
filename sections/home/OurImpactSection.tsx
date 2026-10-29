'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, ShieldCheck, Database, Headphones, Activity } from 'lucide-react';
import { siteMap, type CyberVaultOurImpactData } from '@/data';

const impactIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Users,
    ShieldCheck,
    Database,
    Headphones,
    Activity,
};

function AnimatedCounter({ value, suffix = '', prefix = '', isCustom, customText }: { value: number; suffix?: string; prefix?: string; isCustom?: boolean; customText?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView && !isCustom) {
            let start = 0;
            const end = value;
            const duration = 2000;
            const incrementTime = 30;
            const totalSteps = duration / incrementTime;
            const stepValue = end / totalSteps;

            const timer = setInterval(() => {
                start += stepValue;
                if (start >= end) {
                    setCount(end);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, incrementTime);

            return () => clearInterval(timer);
        }
    }, [isInView, value, isCustom]);

    if (isCustom && customText) {
        return <span ref={ref}>{customText}</span>;
    }

    return (
        <span ref={ref}>
            {prefix}
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

interface OurImpactSectionProps {
    data?: CyberVaultOurImpactData;
}

export default function OurImpactSection({ data: propData }: OurImpactSectionProps = {}) {
    const data = propData || siteMap.ourImpact;
    const TaglineIcon = impactIconMap[data.tagline.icon] || Activity;

    return (
        <section id="impact" className="relative py-8 lg:py-14 bg-[#020817] text-white overflow-hidden font-sans border-y border-red-900/30">

            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
                style={{
                    backgroundImage: `url('${data.backgroundImage || '/images/our-impact-crimson.jpg'}')`
                }}
            />
            {/* Center gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_75%_at_50%_50%,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.72)_50%,rgba(2,8,23,0.95)_100%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-transparent to-[#020817] pointer-events-none" />

            {/* Left node */}
            <div className="absolute bottom-0 left-0 w-80 h-80 pointer-events-none opacity-40">
                <svg viewBox="0 0 200 200" className="w-full h-full text-rose-500">
                    <path d="M 10 190 Q 50 120 120 150 T 190 100" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
                    <path d="M 0 170 Q 70 140 140 180" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="150" r="3" fill="#ef4444" />
                    <circle cx="120" cy="150" r="4" fill="#f43f5e" className="animate-ping" />
                    <circle cx="120" cy="150" r="2" fill="#ffffff" />
                    <circle cx="190" cy="100" r="3" fill="#ef4444" />
                </svg>
            </div>

            {/* Right node */}
            <div className="absolute bottom-0 right-0 w-80 h-80 pointer-events-none opacity-40 transform scale-x-[-1]">
                <svg viewBox="0 0 200 200" className="w-full h-full text-rose-500">
                    <path d="M 10 190 Q 50 120 120 150 T 190 100" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" />
                    <path d="M 0 170 Q 70 140 140 180" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="50" cy="150" r="3" fill="#ef4444" />
                    <circle cx="120" cy="150" r="4" fill="#f43f5e" />
                    <circle cx="190" cy="100" r="3" fill="#ef4444" />
                </svg>
            </div>

            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 relative z-10">

                <div className="text-center max-w-3xl mx-auto space-y-2">

                    {/* Tagline lines */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center space-x-3"
                    >
                        <div className="w-12 sm:w-12 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-red-600 rounded-full" />
                        <span className="text-xs sm:text-sm uppercase font-extrabold tracking-[0.25em] text-rose-400 flex items-center gap-1.5">
                            <TaglineIcon className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                            {data.tagline.text}
                        </span>
                        <div className="w-12 sm:w-12 h-[2px] bg-gradient-to-r from-red-600 via-rose-500 to-transparent rounded-full" />
                    </motion.div>

                    {/* Main headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.2]"
                    >
                        {data.title.prefix}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 drop-shadow-[0_0_20px_rgba(239,68,68,0.35)]">
                            {data.title.highlight}
                        </span>
                    </motion.h2>

                    {/* Subtitle text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed"
                    >
                        {data.description}
                    </motion.p>

                </div>

                {/* Stats grid */}
                <div className="max-w-4xl lg:max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 justify-center items-center mt-8 sm:mt-10">

                    {data.stats.map((stat, index) => {
                        const IconComponent = impactIconMap[stat.icon] || Users;

                        return (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                whileHover={{ y: -6 }}
                                className={`relative flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl hover:bg-slate-900/60 transition-all duration-300 cursor-pointer group ${
                                    index !== data.stats.length - 1 ? 'lg:border-r lg:border-red-900/40' : ''
                                }`}
                            >
                                {/* Icon frame */}
                                <div className="relative mb-4">
                                    <div className="absolute inset-0 bg-red-500/20 rounded-full blur-md group-hover:bg-red-500/40 transition-all duration-300" />
                                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-slate-950 border-2 border-rose-500/60 flex items-center justify-center text-white shadow-lg shadow-red-600/30 group-hover:scale-110 transition-transform duration-300">
                                        <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-rose-200 stroke-[2.2]" />
                                    </div>
                                </div>

                                {/* Number counter */}
                                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-none mb-1.5 group-hover:text-rose-400 transition-colors">
                                    <AnimatedCounter
                                        value={stat.numberValue}
                                        suffix={stat.suffix || ''}
                                        isCustom={stat.isCustomDisplay}
                                        customText={stat.customText}
                                    />
                                </div>

                                {/* Title label */}
                                <div className="text-xs sm:text-sm font-semibold text-gray-300 tracking-wide">
                                    {stat.label}
                                </div>
                            </motion.div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}