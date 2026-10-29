'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    ShieldCheck,
    Settings,
} from 'lucide-react';
import ProcessCard from '@/components/cards/ProcessCard';
import { siteMap, type CyberVaultProcessData } from '@/data';
import { useContactModal } from '@/components/modal/GetInTouchModal';

const processIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Search,
    ShieldCheck,
    Settings,
};

interface ProcessSectionProps {
    data?: CyberVaultProcessData;
}

export default function ProcessSection({ data: propData }: ProcessSectionProps = {}) {
    const data = propData || siteMap.process;
    const { openModal } = useContactModal();

    return (
        <section id="process" className="relative py-8 lg:py-14 bg-[#020817] text-white overflow-hidden font-sans border-b border-red-900/30">

            {/* Lighting effects */}
            <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-rose-500/15 rounded-full blur-[130px] pointer-events-none" />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">

                    {/* Left column */}
                    <div className="lg:col-span-7 space-y-4">

                        {/* Badge pill */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center space-x-2 bg-red-950/80 border border-red-800/60 rounded-full px-4 py-1.5 shadow-md"
                        >
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-sm tracking-wide text-rose-200">
                                {data.tagBadge}
                            </span>
                        </motion.div>

                        {/* Main headline */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-[1.2]"
                        >
                            {data.title.prefix}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 font-extrabold drop-shadow-[0_0_25px_rgba(239,68,68,0.35)]">
                                {data.title.highlight}
                            </span>
                        </motion.h2>

                    </div>

                    {/* Right column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center pt-2 lg:pt-14"
                    >
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-md lg:text-left">
                            {data.description}
                        </p>
                    </motion.div>

                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3  lg:gap-0 relative">

                    {data.steps.map((step, index) => {
                        const IconComponent = processIconMap[step.icon] || Search;

                        return (
                            <div key={step.stepNumber} className="relative flex flex-col justify-between">

                                {/* Separator lines */}
                                {index !== data.steps.length - 1 && (
                                    <div className="hidden lg:block absolute top-4 bottom-4 right-0 w-[1px] bg-gradient-to-b from-red-900/10 via-red-700/50 to-red-900/10 z-10">
                                        <div className="absolute top-1/2 -translate-y-1/2 -left-[4px] w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e]" />
                                    </div>
                                )}

                                <ProcessCard
                                    step={{
                                        ...step,
                                        icon: IconComponent
                                    }}
                                    index={index}
                                    totalSteps={data.steps.length}
                                    onClick={() => openModal(`Process Step ${step.stepNumber}: ${step.title}`)}
                                />

                            </div>
                        );
                    })}

                </div>

            </div>
        </section>
    );
}