'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Bug,
    Laptop,
    Flame,
    Database,
    Cloud,
    Settings,
} from 'lucide-react';
import ServiceCard from '@/components/cards/ServiceCard';
import { siteMap, type CyberVaultServicesData } from '@/data';
import { useContactModal } from '@/components/modal/GetInTouchModal';

const serviceIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Bug,
    Laptop,
    Flame,
    Database,
    Cloud,
    Settings,
};

export interface ServiceItem {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    isHighlighted?: boolean;
}

interface ServiceSectionProps {
    data?: CyberVaultServicesData;
    onEnquireClick?: (serviceTitle?: string) => void;
}

export default function ServicesSection({ data: propData, onEnquireClick }: ServiceSectionProps = {}) {
    const data = propData || siteMap.services;
    const router = useRouter();
    const { openModal } = useContactModal();

    const handleCardClick = (service: ServiceItem) => {
        if (onEnquireClick) {
            onEnquireClick(service.title);
        } else {
            openModal(service.title);
        }
    };

    return (
        <section id="services" className="relative py-8 lg:py-14 bg-white overflow-hidden font-sans">

            {/* Ambient background */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-red-100/40 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 -right-20 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 relative z-10">

                <div className="text-center max-w-4xl mx-auto mb-8 space-y-3">

                    {/* Tagline lines */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center justify-center space-x-3"
                    >
                        <div className="w-12 sm:w-12 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-red-600 rounded-full" />
                        <span className="text-xs sm:text-sm uppercase font-bold tracking-[0.25em] text-red-600">
                            {data.tagline}
                        </span>
                        <div className="w-8 sm:w-12 h-[2px] bg-gradient-to-r from-red-600 via-rose-500 to-transparent rounded-full" />
                    </motion.div>

                    {/* Section headline */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight leading-[1.2]"
                    >
                        {data.title.prefix}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-500 font-semibold">
                            {data.title.highlight}
                        </span>{' '}
                        {data.title.suffix}
                    </motion.h2>

                    {/* Subtitle text */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-slate-600 text-base sm:text-lg leading-relaxed"
                    >
                        {data.description}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.servicesList.map((service, index) => {
                        const IconComponent = serviceIconMap[service.icon] || Settings;
                        const serviceWithComponent: ServiceItem = {
                            ...service,
                            icon: IconComponent
                        };

                        return (
                            <ServiceCard
                                key={service.id}
                                service={serviceWithComponent}
                                index={index}
                                handleCardClick={handleCardClick}
                            />
                        );
                    })}
                </div>

            </div>

        </section>
    );
}