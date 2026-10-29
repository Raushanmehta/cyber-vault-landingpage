'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Zap,
} from 'lucide-react';
import { FaShieldAlt, FaUserFriends } from 'react-icons/fa';
import { siteMap, type CyberVaultHeroData } from '@/data';
import { useContactModal } from '@/components/modal/GetInTouchModal';

const heroIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Zap,
    ArrowRight,
    FaShieldAlt,
    FaUserFriends,
};

interface HeroSectionProps {
    data?: CyberVaultHeroData;
    onEnquireClick?: () => void;
}

export default function HeroSection({ data: propData, onEnquireClick }: HeroSectionProps = {}) {
    const data = propData || siteMap.hero;
    const { openModal } = useContactModal();
    const BadgeIcon = heroIconMap[data.badge.icon] || Zap;
    const CtaIcon = heroIconMap[data.ctaButton.icon] || ArrowRight;

    const handleCtaClick = () => {
        if (onEnquireClick) {
            onEnquireClick();
        } else {
            openModal();
        }
    };

    return (
        <section id="hero" className="relative min-h-[85vh] lg:min-h-[90vh] bg-[#020817] text-white overflow-hidden flex items-center py-8 lg:py-14 font-sans">

            {/* Hero banner */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <Image
                    src={data.backgroundImage.src}
                    alt={data.backgroundImage.alt}
                    fill
                    priority
                    quality={95}
                    sizes="100vw"
                    className="object-cover object-right md:object-center select-none"
                />

                {/* Dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#020817] via-[#020817]/85 to-transparent sm:w-3/4 lg:w-3/5" />
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(239,68,68,0.18),rgba(255,255,255,0))]" />

            {/* Radial glows */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-red-600/15 rounded-full blur-[130px] pointer-events-none" />
            <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-rose-600/15 rounded-full blur-[150px] pointer-events-none" />

            {/* Grid lines */}
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none"
            />

            {/* Ambient particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-rose-500 rounded-full shadow-[0_0_8px_#f43f5e]"
                        style={{
                            top: `${20 + i * 12}%`,
                            left: `${15 + (i * 15) % 70}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.9, 0.3],
                            scale: [1, 1.4, 1],
                        }}
                        transition={{
                            duration: 3 + i * 0.8,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Main container */}
            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">

                    {/* Left column */}
                    <div className="lg:col-span-6 space-y-6 text-left">

                        {/* Subtitle badge */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-flex items-center space-x-3"
                        >
                            <div className="w-12 h-[2px] bg-gradient-to-r from-red-600 to-rose-500 rounded-full" />
                            <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-rose-400 font-semibold flex items-center gap-1.5">
                                <BadgeIcon className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                                {data.badge.text}
                            </span>
                        </motion.div>

                        {/* Main headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15]"
                        >
                            <span className="text-white block">{data.title.prefix}</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 drop-shadow-[0_0_25px_rgba(239,68,68,0.4)]">
                                {data.title.highlight}
                            </span>
                        </motion.h1>

                        {/* Description paragraph */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-gray-300 text-lg leading-relaxed max-w-xl"
                        >
                            {data.description}
                        </motion.p>

                        {/* CTA button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="pt-2"
                        >
                            <motion.button
                                onClick={handleCtaClick}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)" }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative inline-flex items-center justify-between space-x-4 bg-gradient-to-r from-red-600 via-red-500 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white py-3.5 px-7 rounded-full shadow-lg shadow-red-600/35 transition-all duration-300 cursor-pointer"
                            >
                                <span className="text-base tracking-wide pl-1 font-medium">{data.ctaButton.label}</span>
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-600 group-hover:translate-x-1 transition-transform duration-300 shadow-md">
                                    <CtaIcon className="w-4 h-4 text-red-600 stroke-[2.5]" />
                                </div>
                            </motion.button>
                        </motion.div>

                    </div>

                    {/* Security HUD */}
                    <div className="hidden lg:flex lg:col-span-6 relative flex-col items-center justify-center pt-8 lg:pt-0 min-h-[440px] lg:min-h-[520px]">

                        {/* Hologram glow */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-72 h-72 sm:w-96 sm:h-96 bg-red-600/15 rounded-full blur-[100px]" />
                        </div>

                        {/* Radar reticle */}
                        <div className="relative w-full max-w-md aspect-square flex items-center justify-center pointer-events-none">
                            {/* Coordinate ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 sm:inset-6 rounded-full border border-red-500/25 border-dashed"
                            />

                            {/* Sweep line */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-4 sm:inset-6 rounded-full overflow-hidden"
                            >
                                <div className="w-1/2 h-1/2 ml-auto origin-bottom-left bg-gradient-to-br from-red-500/30 via-rose-500/10 to-transparent" />
                            </motion.div>

                            {/* Pulse ring */}
                            <motion.div
                                animate={{ scale: [0.96, 1.04, 0.96], opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-16 sm:inset-20 rounded-full border border-rose-500/30"
                            />

                            {/* Target crosshairs */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
                                <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-red-500/40 to-transparent" />
                            </div>
                        </div>

                        {/* Status cards */}
                        {data.floatingStats.map((stat, idx) => {
                            const StatIcon = heroIconMap[stat.icon] || FaShieldAlt;
                            const isTop = idx === 0;

                            return (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 + idx * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className={`absolute ${isTop ? 'top-2 sm:top-6' : 'bottom-2 sm:bottom-6'} right-0 z-20 backdrop-blur-xl border border-red-500/40 bg-slate-950/70 p-3 sm:p-3.5 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.7)] flex items-center gap-3 cursor-pointer`}
                                >
                                    <div className="flex items-center justify-center text-red-400 shrink-0">
                                        <StatIcon className="w-4 h-4 lg:w-12 lg:h-12 text-red-500" />
                                    </div>
                                    <div>
                                        <div className="text-sm lg:text-4xl text-white font-bold">
                                            {stat.value}
                                        </div>
                                        <div className="text-sm lg:text-sm text-rose-300">
                                            {stat.label}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}

                    </div>

                </div>
            </div>
        </section>
    );
}