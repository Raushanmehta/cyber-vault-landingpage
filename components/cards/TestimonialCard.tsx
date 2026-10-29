"use client";

import React from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";

export interface Testimonial {
    id: number;
    rating: number;
    quote: string;
    author: string;
    role: string;
    avatar: string;
}

export default function TestimonialCard({ item }: { item: Testimonial }) {
    return (
        <div
            key={item.id}
            className="group relative bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 hover:border-red-300 transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1 h-full"
        >
            <div>
                <div className="flex items-center justify-between mb-2 lg:mb-6">
                    <div className="flex items-center space-x-1">
                        {[...Array(item.rating)].map((_, i) => (
                            <Star
                                key={i}
                                className="w-5 h-5 fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform duration-300"
                            />
                        ))}
                    </div>

                    <div className="text-red-100 group-hover:text-red-200 transition-colors duration-300">
                        <Quote className="w-12 h-12 transform rotate-180 fill-current opacity-80 group-hover:rotate-[195deg] group-hover:scale-110 transition-transform duration-500" />
                    </div>
                </div>

                <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal italic mb-2">
                    &ldquo;{item.quote}&rdquo;
                </p>
            </div>

            <div className="flex items-center space-x-4 lg:pt-4 mt-auto">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0 bg-red-50">
                    <Image
                        src={item.avatar}
                        alt={item.author}
                        width={64}
                        height={64}
                        unoptimized
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h4 className="text-md lg:text-xl font-bold text-[#091122]">
                        {item.author}
                    </h4>
                    <p className="text-sm text-red-600 font-medium mt-0.5">
                        {item.role}
                    </p>
                    <span className="block w-8 h-[2px] bg-red-500 mt-1.5 rounded-full" />
                </div>
            </div>
        </div>
    );
}