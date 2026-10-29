
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ServiceItem } from '@/sections/home/ServiceSection';

const servicePngIcons: Record<string, string> = {
    'threat-detection': '/icons/services/threat-detections.png',
    'endpoint-security': '/icons/services/endpoint-securitys.png',
    'network-defense': '/icons/services/network-defenses.png',
    'data-encryption': '/icons/services/data-encryptions.png',
    'cloud-security': '/icons/services/cloud-securitys.png',
    'incident-response': '/icons/services/incident-responses.png',
};

interface ServiceCardProps {
    service: ServiceItem;
    index: number;
    handleCardClick: (service: ServiceItem) => void;
}

export default function ServiceCard({ service, index, handleCardClick }: ServiceCardProps) {
    const IconComponent = service.icon;

    return (
        <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}

            onClick={() => handleCardClick(service)}
            className={`group relative rounded-3xl p-7 sm:p-8 cursor-pointer transition-all duration-300 flex flex-col justify-between overflow-hidden ${service.isHighlighted
                ? 'bg-gradient-to-br from-red-700 via-red-600 to-rose-950 text-white border border-red-500/40 hover:shadow-red-500/20'
                : 'bg-white text-slate-900 border border-slate-200/80 hover:border-red-500/80 hover:shadow-2xl hover:shadow-red-500/20'
                }`}
        >
            {/* Gradient overlay */}
            <div
                className={`absolute inset-0 bg-gradient-to-br from-red-700 via-red-600 to-rose-950 transition-opacity duration-300 pointer-events-none rounded-3xl ${service.isHighlighted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
            />

            {/* Border accent */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-red-500/0 via-rose-400/40 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Dot pattern */}
            <div
                className={`absolute inset-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px] transition-opacity duration-300 pointer-events-none rounded-3xl ${service.isHighlighted ? 'opacity-20' : 'opacity-0 group-hover:opacity-20'
                    }`}
            />

            {/* Content row */}
            <div className="relative z-10 flex items-start gap-4">

                {/* Icon container */}
                <div className={`relative flex items-center justify-center w-12 h-12 lg:w-20 lg:h-20 rounded-2xl shrink-0 shadow-sm transition-all duration-300 group-hover:scale-105 ${service.isHighlighted
                    ? 'bg-white text-red-600 border-transparent shadow-md'
                    : 'bg-red-50 text-red-600 border border-red-100 group-hover:bg-white group-hover:text-red-600 group-hover:border-transparent group-hover:shadow-md'
                    }`}>
                    {servicePngIcons[service.id] ? (
                        <div className="relative w-8 h-8 lg:w-16 lg:h-16 flex items-center justify-center">
                            <Image
                                src={servicePngIcons[service.id]}
                                alt={service.title}
                                width={64}
                                height={64}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ) : (
                        <IconComponent className="w-8 h-8 lg:w-10 lg:h-10 stroke-[2.2]" />
                    )}
                </div>

                {/* Card details */}
                <div className="flex-1 min-w-0">
                    {/* Title row */}
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                        <h3 className={`text-base sm:text-lg font-medium leading-snug tracking-tight transition-colors duration-300 ${service.isHighlighted
                            ? 'text-white'
                            : 'text-slate-900 group-hover:text-white'
                            }`}>
                            {service.title}
                        </h3>

                        {/* Action button */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCardClick(service);
                            }}
                            aria-label={`Inquire about ${service.title}`}
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110 cursor-pointer ${service.isHighlighted
                                ? 'bg-white text-red-600 shadow-md group-hover:bg-rose-100'
                                : 'bg-red-600 text-white shadow-md shadow-red-600/30 group-hover:bg-white group-hover:text-red-600'
                                }`}
                        >
                            <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>

                    {/* Description text */}
                    <p className={`text-xs sm:text-sm leading-relaxed transition-colors duration-300 ${service.isHighlighted
                        ? 'text-rose-100/90'
                        : 'text-slate-600 group-hover:text-rose-100/90'
                        }`}>
                        {service.description}
                    </p>
                </div>

            </div>

        </motion.div>
    );
}
