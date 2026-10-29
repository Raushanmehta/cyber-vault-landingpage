'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Settings, Users, ArrowRight } from 'lucide-react';
import AnimatedHeading from '@/components/common/AnimatedHeading';
import { siteMap, type CyberVaultAboutData } from '@/data';
import { useContactModal } from '@/components/modal/GetInTouchModal';
import Image from 'next/image';

const aboutIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    ShieldCheck,
    Settings,
    Users,
    ArrowRight
};

interface AboutSectionProps {
    data?: CyberVaultAboutData;
    onLearnMoreClick?: () => void;
    showActionButton?: boolean;
}

export default function AboutSection({
    data: propData,
    onLearnMoreClick,
    showActionButton,
}: AboutSectionProps = {}) {
    const data = propData || siteMap.about;
    const { openModal } = useContactModal();
    const BadgeIcon = aboutIconMap[data.experienceBadge.icon] || ShieldCheck;
    const ActionIcon = aboutIconMap[data.actionButton.icon] || ArrowRight;

    const shouldShowButton = showActionButton !== undefined ? showActionButton : true;

    const handleButtonClick = () => {
        if (onLearnMoreClick) {
            onLearnMoreClick();
        } else {
            openModal("Enterprise Architecture Assessment");
        }
    };

    return (
        <section id="about" className="relative py-8 lg:py-14 bg-white text-slate-800 overflow-hidden font-sans">

            {/* Ambient background */}
            <div className="absolute top-1/3 -right-20 w-96 h-96 bg-red-100/50 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 -left-20 w-80 h-80 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Showcase column */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-6 relative">
                        <div className="relative w-full lg:mb-0">

                            {/* Frame accent */}
                            <div className="absolute -top-3 -left-3 sm:-top-5 sm:-left-5 w-28 sm:w-40 h-28 sm:h-40 bg-red-600 rounded-3xl sm:rounded-4xl -z-10" />
                            <div className="hidden sm:block absolute top-2 left-2 right-2 bottom-12 border-2 border-red-400/30 rounded-3xl -z-10 pointer-events-none" />

                            {/* Primary image */}
                            <div className="relative z-10 w-full rounded-3xl sm:rounded-4xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                                <Image
                                    src={data.images.primary.src}
                                    alt={data.images.primary.alt}
                                    width={700}
                                    height={500}
                                    className="w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[440px] object-cover transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Secondary image */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 0.3 }}
                                className="w-full lg:w-[65%] relative lg:absolute lg:-bottom-26 lg:right-10 mt-4 sm:mt-6 lg:mt-0 z-20 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group"
                            >
                                <Image
                                    src={data.images.secondary.src}
                                    alt={data.images.secondary.alt}
                                    width={500}
                                    height={350}
                                    className="w-full h-[190px] sm:h-[230px] lg:h-[230px] object-cover transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-red-950/60 via-transparent to-transparent pointer-events-none" />
                            </motion.div>

                            {/* Experience badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.85 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                whileHover={{ y: -6, boxShadow: "0 25px 35px -5px rgba(239, 68, 68, 0.4)" }}
                                className="absolute -bottom-7 sm:-bottom-8 left-2 sm:left-4 z-30 bg-[#180408] text-white p-3 sm:p-4 rounded-2xl shadow-2xl border border-red-700/50 flex items-center space-x-3 sm:space-x-4 max-w-[210px] sm:max-w-[240px] cursor-pointer"
                            >
                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-red-600/40">
                                    <BadgeIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                                </div>
                                <div>
                                    <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-none">
                                        {data.experienceBadge.years}
                                    </div>
                                    <div className="text-[11px] sm:text-xs lg:text-sm text-rose-200 mt-1 leading-snug">
                                        {data.experienceBadge.label}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Dot pattern */}
                            <div className="hidden sm:grid absolute -bottom-14 lg:-bottom-16 left-6 lg:left-8 z-0 grid-cols-4 gap-2.5 pointer-events-none opacity-80">
                                {[...Array(16)].map((_, i) => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-red-400/50" />
                                ))}
                            </div>

                        </div>
                    </motion.div>

                    {/* Content column */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-6 space-y-4 lg:pt-0"
                    >

                        {/* Tagline text */}
                        <div className="inline-flex items-center space-x-3">
                            <div className="w-12 h-[3px] bg-red-600 rounded-full" />
                            <span className="text-xs sm:text-sm uppercase font-bold tracking-[0.25em] text-red-600">
                                {data.tagline}
                            </span>
                        </div>

                        {/* Section headline */}
                        <AnimatedHeading
                            as="h2"
                            className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-[1.2] tracking-tight"
                        >
                            {data.title.prefix}{' '}
                            <span className="text-red-600 inline-block font-semibold">
                                {data.title.highlight}
                            </span>{' '}
                            {data.title.suffix}
                        </AnimatedHeading>

                        {/* Description text */}
                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                            {data.description}
                        </p>

                        {/* Feature grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                            {data.features.map((feature) => {
                                const IconComponent = aboutIconMap[feature.icon] || ShieldCheck;
                                return (
                                    <motion.div
                                        key={feature.title}
                                        whileHover={{ y: -6, boxShadow: "0 20px 35px -5px rgba(239, 68, 68, 0.15)" }}
                                        className="group bg-slate-50/90 border border-slate-200/80 hover:border-red-400 p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                                    >
                                        <div>
                                            <div className="w-14 h-14 rounded-md bg-red-50 text-red-600 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                                <IconComponent className="w-8 h-8 stroke-[1.8]" />
                                            </div>
                                            <h3 className="font-semibold text-slate-900 text-base mb-2 leading-snug group-hover:text-red-600 transition-colors">
                                                {feature.title}
                                            </h3>
                                            <p className="text-sm text-slate-500 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Action button */}
                        {shouldShowButton && (
                            <div className="pt-2">
                                <motion.button
                                    onClick={handleButtonClick}
                                    whileHover={{ scale: 1.04, boxShadow: "0 10px 25px -5px rgba(239, 68, 68, 0.4)" }}
                                    whileTap={{ scale: 0.96 }}
                                    className="group inline-flex items-center space-x-4 bg-gradient-to-r from-red-700 via-red-600 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white py-3.5 px-7 rounded-full shadow-lg shadow-red-600/30 transition-all duration-300 cursor-pointer"
                                >
                                    <span className="text-base tracking-wide pl-1 font-medium">{data.actionButton.label}</span>
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-600 group-hover:translate-x-1 transition-transform duration-300 shadow-md">
                                        <ActionIcon className="w-4 h-4 text-red-600 stroke-[2.5]" />
                                    </div>
                                </motion.button>
                            </div>
                        )}

                    </motion.div>

                </div>
            </div>
        </section>
    );
}