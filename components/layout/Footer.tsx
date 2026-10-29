'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { FaFacebook, FaMapMarkerAlt } from 'react-icons/fa';
import { BiSolidPhoneCall } from 'react-icons/bi';
import { IoMdMail } from 'react-icons/io';
import { BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs';
import { LiaLinkedin } from 'react-icons/lia';
import Image from 'next/image';
import Link from 'next/link';
import { siteMap } from '@/data';

const footerIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    FaFacebook,
    BsTwitter,
    LiaLinkedin,
    BsInstagram,
    BsYoutube,
    FaMapMarkerAlt,
    BiSolidPhoneCall,
    IoMdMail,
    ArrowRight,
    ChevronRight,
};

export default function Footer() {
    const data = siteMap.footer;

    // Footer navigation
    const handleFooterLinkClick = (e?: React.MouseEvent<HTMLAnchorElement>, href?: string) => {
        if (typeof window !== 'undefined') {
            const targetHref = href || (e?.currentTarget?.getAttribute('href') || '');
            if (targetHref && targetHref.startsWith('#')) {
                const target = document.querySelector(targetHref) as HTMLElement | null;
                if (target) {
                    if (e) e.preventDefault();
                    const navHeight = 80;
                    const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight);
                    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, options?: { duration?: number }) => void } }).__lenis;
                    if (lenis) {
                        lenis.scrollTo(targetY, { duration: 1.0 });
                    } else {
                        window.scrollTo({ top: targetY, behavior: 'smooth' });
                    }
                    return;
                }
            }
            const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, options?: { immediate?: boolean }) => void } }).__lenis;
            if (lenis) {
                lenis.scrollTo(0, { immediate: true });
            }
            window.scrollTo(0, 0);
        }
    };

    const AddressIcon = footerIconMap[data.getInTouch.address.icon] || FaMapMarkerAlt;
    const PhoneIcon = footerIconMap[data.getInTouch.phone.icon] || BiSolidPhoneCall;
    const EmailIcon = footerIconMap[data.getInTouch.email.icon] || IoMdMail;

    return (
        <footer className="relative bg-[#080203] text-white overflow-hidden font-sans border-t border-red-900/40">
            {/* Glowing mesh */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-600/12 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-rose-600/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Main container */}
            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 pt-16 pb-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* Brand column */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Logo link */}
                        <Link href={data.brand.logo.href} onClick={handleFooterLinkClick} className="inline-block">
                            <Image
                                src={data.brand.logo.src}
                                width={data.brand.logo.width}
                                height={data.brand.logo.height}
                                alt={data.brand.logo.alt}
                                priority
                                className="h-auto w-auto max-h-20"
                            />
                        </Link>

                        {/* Brand description */}
                        <p className="text-gray-300 text-sm lg:text-base leading-relaxed max-w-sm">
                            {data.brand.description}
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center space-x-3 pt-2">
                            {data.brand.socialLinks.map((social) => {
                                const Icon = footerIconMap[social.icon] || FaFacebook;
                                return (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        whileHover={{ scale: 1.15, backgroundColor: '#3b070d', borderColor: '#ef4444' }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-red-950/60 border border-red-900/60 flex items-center justify-center text-rose-200 hover:text-white transition-colors shadow-md"
                                    >
                                        <Icon className="lg:w-6 lg:h-6 w-5 h-5" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="relative pb-2 inline-block">
                            <h3 className="text-white font-medium text-xl">{data.quickLinks.title}</h3>
                            <div className="absolute bottom-0 left-0 w-8 h-[3px] bg-gradient-to-r from-red-600 to-rose-500 rounded-full" />
                        </div>
                        <ul className="space-y-3 mt-1 lg:mt-4">
                            {data.quickLinks.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        onClick={handleFooterLinkClick}
                                        className="group flex items-center text-gray-300 hover:text-rose-400 text-sm transition-colors duration-200"
                                    >
                                        <ChevronRight className="w-5 h-5 text-rose-500/70 mr-1.5 opacity-80 group-hover:translate-x-1 group-hover:text-rose-400 transition-transform" />
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services links */}
                    <div className="lg:col-span-3 space-y-4">
                        <div className="relative pb-2 inline-block">
                            <h3 className="text-white font-medium text-xl">{data.servicesLinks.title}</h3>
                            <div className="absolute bottom-0 left-0 w-8 h-[3px] bg-gradient-to-r from-red-600 to-rose-500 rounded-full" />
                        </div>
                        <ul className="space-y-3 mt-1 lg:mt-4">
                            {data.servicesLinks.links.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        onClick={handleFooterLinkClick}
                                        className="group flex items-center text-gray-300 hover:text-rose-400 text-sm transition-colors duration-200"
                                    >
                                        <ChevronRight className="w-5 h-5 text-rose-500/70 mr-1.5 opacity-80 group-hover:translate-x-1 group-hover:text-rose-400 transition-transform" />
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact info */}
                    <div className="lg:col-span-3 space-y-5">
                        <div className="relative pb-2 inline-block">
                            <h3 className="text-white font-medium text-xl">{data.getInTouch.title}</h3>
                            <div className="absolute bottom-0 left-0 w-8 h-[3px] bg-gradient-to-r from-red-600 to-rose-500 rounded-full" />
                        </div>

                        <ul className="space-y-3 mt-1 lg:mt-4">
                            <li className="flex items-start space-x-3">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#180408] border border-red-900/80 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                                    <AddressIcon className="lg:w-6 lg:h-6 w-5 h-5" />
                                </div>
                                <span className="text-gray-300 leading-tight text-sm lg:text-base whitespace-pre-line">
                                    {data.getInTouch.address.text}
                                </span>
                            </li>

                            <li className="flex items-center space-x-3">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#180408] border border-red-900/80 flex items-center justify-center text-rose-400 shrink-0">
                                    <PhoneIcon className="lg:w-6 lg:h-6 w-5 h-5" />
                                </div>
                                <a href={data.getInTouch.phone.href} className="text-gray-300 hover:text-white transition-colors text-sm lg:text-base">
                                    {data.getInTouch.phone.text}
                                </a>
                            </li>

                            <li className="flex items-center space-x-3">
                                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-[#180408] border border-red-900/80 flex items-center justify-center text-rose-400 shrink-0">
                                    <EmailIcon className="lg:w-6 lg:h-6 w-5 h-5" />
                                </div>
                                <a href={data.getInTouch.email.href} className="text-gray-300 hover:text-white transition-colors truncate text-sm lg:text-base">
                                    {data.getInTouch.email.text}
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {/* Copyright bar */}
            {data.bottomBar && (
                <div className="border-t border-red-950/80 py-8 relative z-10">
                    <div className="max-w-[1350px] w-full mx-auto px-4 flex items-center justify-center text-center text-sm text-gray-400">
                        <div>
                            {data.bottomBar.copyright}
                        </div>
                    </div>
                </div>
            )}
        </footer>
    );
}