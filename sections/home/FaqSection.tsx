"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteMap, type CyberVaultFaqData } from "@/data";

interface FaqSectionProps {
    data?: CyberVaultFaqData;
}

export default function FaqSection({ data: propData }: FaqSectionProps = {}) {
    const data = propData || siteMap.faq;
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section id="faqs" className="relative w-full bg-gradient-to-b from-white via-slate-50/60 to-white py-12 lg:py-20 font-sans overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 relative z-10">
                {/* Tagline text */}
                {data.tagline && (
                    <div className="flex items-center justify-center space-x-3 mb-3">
                        <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-red-600 rounded-full" />
                        <span className="text-xs sm:text-sm font-bold tracking-widest text-red-900 uppercase">
                            {data.tagline}
                        </span>
                        <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-red-600 rounded-full" />
                    </div>
                )}

                {/* Main heading */}
                {data.title && (
                    <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl text-[#0a1128] font-normal tracking-tight mb-3">
                        {data.title.prefix}{" "}
                        <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-500 bg-clip-text text-transparent font-medium">
                            {data.title.highlight}
                        </span>
                    </h2>
                )}

                {/* Subtitle text */}
                {data.description && (
                    <p className="text-center text-slate-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed mb-10">
                        {data.description}
                    </p>
                )}

                {/* FAQ list */}
                <div className="max-w-[1380px] mx-auto space-y-4">
                    {data.faqs?.map((faq, index) => {
                        const isOpen = openIndex === index;

                        return (
                            <motion.div
                                key={faq.id || index}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: index * 0.05 }}
                                className={`rounded-xl border transition-all duration-300 overflow-hidden ${isOpen
                                    ? "bg-white border-red-500/70 shadow-lg shadow-red-500/5 ring-1 ring-red-500/20"
                                    : "bg-white/80 border-slate-200/90 hover:border-slate-300 hover:shadow-sm"
                                    }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleFaq(index)}
                                    aria-expanded={isOpen}
                                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 transition-colors focus:outline-none"
                                >
                                    <div className="flex items-center gap-3 sm:gap-4 flex-1">
                                        <div
                                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-semibold transition-colors ${isOpen
                                                ? "bg-red-600 text-white"
                                                : "bg-slate-100 text-slate-600 group-hover:bg-red-50"
                                                }`}
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </div>
                                        <div>
                                            <span className="text-base sm:text-lg font-medium text-slate-900 block leading-snug">
                                                {faq.question}
                                            </span>
                                            {faq.category && (
                                                <span className="inline-block mt-1 text-[11px] font-semibold text-red-600 uppercase tracking-wider">
                                                    {faq.category}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen
                                            ? "bg-red-100 text-red-600"
                                            : "bg-slate-100 text-slate-500"
                                            }`}
                                    >
                                        <ChevronDown className="w-4 h-4" />
                                    </motion.div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pl-[3.25rem] sm:pl-[4.25rem]">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
