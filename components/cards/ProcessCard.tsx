import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export interface ProcessStep {
    stepNumber: string;
    title: string;
    description: string;
    icon?: React.ComponentType<{ className?: string }>;
    checkpoints: string[];
}

export interface ProcessCardProps {
    step?: ProcessStep;
    stepNumber?: string;
    title?: string;
    description?: string;
    icon?: React.ComponentType<{ className?: string }>;
    checkpoints?: string[];
    isHighlighted?: boolean;
    detailedFeatures?: string[];
    benefits?: string[];
    index?: number;
    totalSteps?: number;
    onClick?: () => void;
}

export default function ProcessCard({
    step,
    stepNumber: propStepNumber,
    title: propTitle,
    description: propDescription,
    checkpoints: propCheckpoints,
    index = 0,
    totalSteps = 3,
    onClick
}: ProcessCardProps) {
    const stepNumber = step?.stepNumber || propStepNumber || "01";
    const title = step?.title || propTitle || "";
    const description = step?.description || propDescription || "";
    const checkpoints = step?.checkpoints || propCheckpoints || [];

    const isFirst = index === 0;
    const isLast = index === totalSteps - 1;

    return (
        <motion.div
            onClick={onClick}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`transition-all duration-300 group flex flex-col justify-between h-full cursor-pointer py-4 p-6 sm:p-8 ${
                isFirst
                    ? 'lg:pl-0 lg:pr-8 xl:lg:pr-12'
                    : isLast
                    ? 'lg:pl-8 xl:lg:pl-12 lg:pr-0'
                    : 'lg:px-8 xl:lg:px-12'
            }`}
        >
            <div>
                {/* Number header */}
                <div className="flex items-center justify-between mb-4">

                    {/* Step number */}
                    <span className="text-6xl lg:text-8xl text-transparent select-none leading-none tracking-tight font-sans [-webkit-text-stroke:2px_#ef4444] drop-shadow-[0_0_12px_rgba(239,68,68,0.4)]">
                        {stepNumber}
                    </span>

                    {/* Orbit badge */}
                    <div className="relative w-20 h-20 sm:w-22 sm:h-22 lg:w-24 lg:h-24 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">

                        {/* Track circle */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            viewBox="0 0 100 100"
                            fill="none"
                        >
                            <circle
                                cx="50"
                                cy="50"
                                r="46"
                                stroke="#991b1b"
                                strokeWidth="1.2"
                                strokeOpacity="0.3"
                            />
                        </svg>

                        {/* Orbit arcs */}
                        <motion.div
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            animate={{ rotate: 360 }}
                            transition={{
                                repeat: Infinity,
                                duration: 8,
                                ease: "linear",
                            }}
                        >
                            <svg
                                className="w-full h-full"
                                viewBox="0 0 100 100"
                                fill="none"
                            >
                                {/* Top arc */}
                                <path
                                    d="M 65.7 6.8 A 46 46 0 0 1 93.2 65.7"
                                    stroke="#ef4444"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_0_8px_#ef4444]"
                                />
                                <circle cx="65.7" cy="6.8" r="3" fill="#f43f5e" className="drop-shadow-[0_0_8px_#f43f5e]" />
                                <circle cx="93.2" cy="65.7" r="3" fill="#f43f5e" className="drop-shadow-[0_0_8px_#f43f5e]" />

                                {/* Bottom arc */}
                                <path
                                    d="M 34.3 93.2 A 46 46 0 0 1 6.8 34.3"
                                    stroke="#ef4444"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_0_8px_#ef4444]"
                                />
                                <circle cx="34.3" cy="93.2" r="3" fill="#f43f5e" className="drop-shadow-[0_0_8px_#f43f5e]" />
                                <circle cx="6.8" cy="34.3" r="3" fill="#f43f5e" className="drop-shadow-[0_0_8px_#f43f5e]" />
                            </svg>
                        </motion.div>

                        {/* Center disc */}
                        <div className="relative w-15 h-15 sm:w-17 sm:h-17 lg:w-18 lg:h-18 rounded-full bg-gradient-to-b from-[#3b070d] via-[#1f0408] to-[#0a0103] border border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.35),inset_0_-4px_10px_rgba(244,63,94,0.5),inset_0_2px_4px_rgba(255,255,255,0.18)] flex items-center justify-center">

                            {stepNumber === '01' ? (
                                /* Step one */
                                <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                                    <path d="M17 31L7 41" stroke="white" strokeWidth="4" strokeLinecap="round" />
                                    <circle cx="28" cy="20" r="13" stroke="white" strokeWidth="3.5" fill="none" />
                                    <rect x="21" y="21" width="3" height="6" rx="0.8" fill="white" />
                                    <rect x="26.5" y="17" width="3" height="10" rx="0.8" fill="white" />
                                    <rect x="32" y="14" width="3" height="13" rx="0.8" fill="white" />
                                </svg>
                            ) : stepNumber === '02' ? (
                                /* Step two */
                                <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                                    <path
                                        d="M24 5C32.5 9.5 40 9.5 40 9.5V22C40 32.5 32.5 40 24 43C15.5 40 8 32.5 8 22V9.5C8 9.5 15.5 9.5 24 5Z"
                                        fill="#dc2626"
                                        stroke="white"
                                        strokeWidth="3"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M20 22V18C20 15.8 21.8 14 24 14C26.2 14 28 15.8 28 18V22"
                                        stroke="white"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                    />
                                    <rect x="18" y="21" width="12" height="10" rx="2" fill="white" />
                                    <circle cx="24" cy="25" r="1.5" fill="#dc2626" />
                                    <path d="M24 26.5V28.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            ) : (
                                /* Step three */
                                <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
                                    <path
                                        d="M21.5 4H26.5L27.5 8.2C28.7 8.7 29.8 9.3 30.8 10.1L34.9 8.3L38.4 11.8L36.6 15.9C37.4 16.9 38 18 38.5 19.2L42.7 20.2V25.2L38.5 26.2C38 27.4 37.4 28.5 36.6 29.5L38.4 33.6L34.9 37.1L30.8 35.3C29.8 36.1 28.7 36.7 27.5 37.2L26.5 41.4H21.5L20.5 37.2C19.3 36.7 18.2 36.1 17.2 35.3L13.1 37.1L9.6 33.6L11.4 29.5C10.6 28.5 10 27.4 9.5 26.2L5.3 25.2V20.2L9.5 19.2C10 18 10.6 16.9 11.4 15.9L9.6 11.8L13.1 8.3L17.2 10.1C18.2 9.3 19.3 8.7 20.5 8.2L21.5 4Z"
                                        fill="white"
                                    />
                                    <circle cx="24" cy="22.7" r="9.5" fill="#1a0306" />
                                    <rect x="18.5" y="23.5" width="2.5" height="4.5" rx="0.8" fill="white" />
                                    <rect x="22.8" y="20.5" width="2.5" height="7.5" rx="0.8" fill="white" />
                                    <rect x="27" y="18" width="2.5" height="10" rx="0.8" fill="white" />
                                </svg>
                            )}

                        </div>

                    </div>

                </div>

                {/* Step title */}
                <h3 className="text-2xl text-white mb-2 tracking-tight group-hover:text-rose-400 transition-colors">
                    {title}
                </h3>

                {/* Step description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {description}
                </p>
            </div>

            <div>
                {/* Divider line */}
                <div className="w-full h-[1px] bg-red-950/60 mb-4" />

                {/* Checkpoints list */}
                <div className="space-y-3">
                    {checkpoints.map((checkpoint, idx) => (
                        <div key={idx} className="flex items-center space-x-3 text-xs sm:text-sm text-gray-200">
                            <div className="rounded-full bg-red-600 flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-red-600/40">
                                <CheckCircle2 className="w-7 h-7 text-white stroke-[2]" />
                            </div>
                            <span>{checkpoint}</span>
                        </div>
                    ))}
                </div>
            </div>

        </motion.div>
    );
}