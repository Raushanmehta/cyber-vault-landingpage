"use client";

import React, { useState, useEffect, useMemo } from "react";
import Autoplay from "embla-carousel-autoplay";
import TestimonialCard from "@/components/cards/TestimonialCard";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
    type CarouselApi,
} from "@/components/ui/carousel";
import { siteMap, type CyberVaultTestimonialData } from "@/data";

interface TestimonialSectionProps {
    data?: CyberVaultTestimonialData;
}

export default function TestimonialSection({ data: propData }: TestimonialSectionProps = {}) {
    const data = propData || siteMap.testimonial;
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const autoplayPlugin = useMemo(
        () => Autoplay({ delay: 3500, stopOnInteraction: false }),
        []
    );

    useEffect(() => {
        if (!api) return;

        const updateSnap = () => {
            setCount(api.scrollSnapList().length);
            setCurrent(api.selectedScrollSnap());
        };

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };

        api.on("select", onSelect);
        api.on("reInit", updateSnap);
        queueMicrotask(updateSnap);

        return () => {
            api.off("select", onSelect);
            api.off("reInit", updateSnap);
        };
    }, [api]);

    return (
        <section id="testimonials" className="relative w-full bg-[#fdf8f8] py-8 lg:py-14 overflow-hidden font-sans">
            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4">
                <div className="flex items-center justify-center space-x-3 mb-3">
                    <span className="w-12 h-[2px] bg-gradient-to-r from-transparent to-red-600 rounded-full" />
                    <span className="text-xs sm:text-sm font-bold tracking-wider text-red-900 uppercase">
                        {data.tagline}
                    </span>
                    <span className="w-12 h-[2px] bg-gradient-to-l from-transparent to-red-600 rounded-full" />
                </div>

                <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl text-[#091122] tracking-tight mb-2">
                    {data.title.prefix}{" "}
                    <span className="bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent font-semibold">
                        {data.title.highlight}
                    </span>
                </h2>

                <p className="text-center text-slate-500 max-w-3xl mx-auto text-sm lg:text-base mb-4">
                    {data.description}
                </p>

                <div className="relative lg:mt-2">
                    <Carousel
                        setApi={setApi}
                        plugins={[autoplayPlugin]}
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full max-w-[1350px] mx-auto"
                    >
                        <CarouselContent className="-ml-4 sm:-ml-6 py-4">
                            {data.testimonials.map((testimonial) => (
                                <CarouselItem
                                    key={testimonial.id}
                                    className="pl-4 sm:pl-6 basis-full lg:basis-1/2"
                                >
                                    <TestimonialCard
                                        item={testimonial}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        {/* Navigation buttons */}
                        <div className="hidden sm:block">
                            <CarouselPrevious className="-left-4 lg:-left-6 w-11 h-11 bg-white text-red-600 shadow-lg border-slate-100 hover:bg-red-600 hover:text-white transition-all duration-300" />
                            <CarouselNext className="-right-4 lg:-right-6 w-11 h-11 bg-white text-red-600 shadow-lg border-slate-100 hover:bg-red-600 hover:text-white transition-all duration-300" />
                        </div>
                    </Carousel>
                </div>

                {/* Pagination dots */}
                {count > 1 && (
                    <div className="flex items-center justify-center space-x-2.5 mt-2 lg:mt-4">
                        {Array.from({ length: count }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => api?.scrollTo(idx)}
                                aria-label={`Go to slide ${idx + 1}`}
                                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${current === idx
                                    ? "w-7 bg-red-600"
                                    : "w-2.5 bg-red-200 hover:bg-red-300"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}