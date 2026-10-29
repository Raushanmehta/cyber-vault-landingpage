'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight,
    Menu,
    X,
    Home,
    Info,
    Wrench,
    Briefcase,
    BookOpen,
    Mail,
    HelpCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { siteMap } from '@/data';
import { useContactModal } from '@/components/modal/GetInTouchModal';

// Icon map
const navIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Home,
    Info,
    Wrench,
    Briefcase,
    BookOpen,
    Mail,
    HelpCircle,
    ArrowRight,
};

interface NavbarProps {
    onNavClick?: (href: string) => void;
    onEnquireClick?: () => void;
}

export default function Navbar({
    onNavClick,
    onEnquireClick
}: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('/');
    const data = siteMap.navbar;
    const { openModal } = useContactModal();

    // Scroll spy
    useEffect(() => {
        const sections = [
            { id: 'hero', href: '/' },
            { id: 'about', href: '#about' },
            { id: 'services', href: '#services' },
            { id: 'process', href: '#process' },
            { id: 'testimonials', href: '#testimonials' },
            { id: 'faqs', href: '#faqs' },
        ];

        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY < 60) {
                setActiveSection('/');
                return;
            }

            if ((window.innerHeight + scrollY) >= document.documentElement.scrollHeight - 50) {
                setActiveSection('#faqs');
                return;
            }

            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i].id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 120) {
                        setActiveSection(sections[i].href);
                        return;
                    }
                }
            }
        };

        const lenis = (window as unknown as { __lenis?: { on?: (event: string, cb: () => void) => void; off?: (event: string, cb: () => void) => void } }).__lenis;
        if (lenis?.on) {
            lenis.on('scroll', handleScroll);
        }
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        // Hash scroll
        if (typeof window !== 'undefined' && window.location.hash) {
            const hash = window.location.hash;
            const target = document.querySelector(hash) as HTMLElement | null;
            if (target) {
                setTimeout(() => {
                    const navHeight = 80;
                    const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight);
                    const l = (window as unknown as { __lenis?: { scrollTo: (t: number, opts?: { duration?: number }) => void } }).__lenis;
                    if (l) {
                        l.scrollTo(targetY, { duration: 0.8 });
                    } else {
                        window.scrollTo({ top: targetY, behavior: 'smooth' });
                    }
                    setActiveSection(hash);
                }, 200);
            }
        }

        return () => {
            if (lenis?.off) {
                lenis.off('scroll', handleScroll);
            }
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Click handler
    const handleItemClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        setActiveSection(href);

        if (typeof window !== 'undefined') {
            if (href === '/' || href === '#hero') {
                const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, options?: { duration?: number }) => void } }).__lenis;
                if (lenis) {
                    lenis.scrollTo(0, { duration: 1.0 });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                window.history.pushState(null, '', '/');
                if (onNavClick) onNavClick(href);
                return;
            }

            const target = document.querySelector(href) as HTMLElement | null;
            if (target) {
                const navHeight = 80;
                const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight);
                const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, options?: { duration?: number }) => void } }).__lenis;
                if (lenis) {
                    lenis.scrollTo(targetY, { duration: 1.0 });
                } else {
                    window.scrollTo({ top: targetY, behavior: 'smooth' });
                }
                window.history.pushState(null, '', href);
                if (onNavClick) onNavClick(href);
            }
        }
    };

    const ActionIcon = navIconMap[data.actionButton.icon] || ArrowRight;

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 font-sans shadow-xs">
            <div className="max-w-[1380px] lg:w-[97%] xl:w-[95%] w-full mx-auto px-4 h-20 flex items-center justify-between">

                {/* Logo section */}
                <Link
                    href={data.logo.href}
                    onClick={(e) => handleItemClick(e, '/')}
                    className="flex items-center"
                >
                    <Image
                        src={data.logo.src}
                        width={data.logo.width}
                        height={data.logo.height}
                        alt={data.logo.alt}
                        priority
                        className="h-auto w-auto max-h-20"
                    />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                    {data.navItems.map((item) => {
                        const isActive = activeSection === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={(e) => handleItemClick(e, item.href)}
                                className={`relative px-4 py-2 rounded-xl text-sm lg:text-base transition-colors flex items-center justify-center ${isActive
                                    ? 'text-red-600 font-medium'
                                    : 'text-slate-700 hover:text-red-600'
                                    }`}
                            >
                                <span>{item.label}</span>
                                {isActive && (
                                    <motion.span
                                        layoutId="navbarActiveIndicator"
                                        className="absolute -bottom-1 left-0 right-0 mx-auto w-8 h-[3px] bg-gradient-to-r from-red-600 to-rose-500 rounded-full shadow-[0_2px_8px_rgba(239,68,68,0.4)] pointer-events-none"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Action button */}
                <div className="hidden sm:flex items-center">
                    <button
                        type="button"
                        onClick={() => {
                            openModal();
                            if (onEnquireClick) onEnquireClick();
                        }}
                        className="flex items-center space-x-2 bg-gradient-to-r from-red-700 via-red-600 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-medium text-sm px-6 py-3 rounded-full shadow-lg shadow-red-600/30 transition-all duration-300 group cursor-pointer"
                    >
                        <span>{data.actionButton.label}</span>
                        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                            <ActionIcon className="w-3.5 h-3.5 text-white" />
                        </div>
                    </button>
                </div>

                {/* Mobile toggle */}
                <div className="flex lg:hidden items-center">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle Menu"
                        className="text-gray-800 focus:outline-none transition-colors"
                    >
                        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                    </motion.button>
                </div>

            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 top-20 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
                        />

                        {/* Menu content */}
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="lg:hidden absolute top-full left-0 right-0 w-full bg-white border-b border-gray-200 px-4 pt-2 pb-6 shadow-2xl overflow-hidden z-50"
                        >
                            <div className="flex flex-col space-y-1.5">
                                {data.navItems.map((item) => {
                                    const IconComponent = navIconMap[item.icon] || Home;
                                    const isActive = activeSection === item.href;
                                    return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            onClick={(e) => handleItemClick(e, item.href)}
                                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base transition-colors ${isActive
                                                ? 'bg-red-50 text-red-600 font-semibold border-l-4 border-red-600 shadow-xs'
                                                : 'text-slate-700 hover:bg-slate-50 hover:text-red-600 font-medium'
                                                }`}
                                        >
                                            <IconComponent className={`w-5 h-5 ${isActive ? 'text-red-600' : 'text-slate-400'}`} />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}

                                <div className="pt-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsOpen(false);
                                            openModal();
                                            if (onEnquireClick) onEnquireClick();
                                        }}
                                        className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-red-700 via-red-600 to-rose-600 text-white font-medium text-base py-3.5 rounded-xl shadow-lg shadow-red-600/30 cursor-pointer"
                                    >
                                        <span>{data.actionButton.label}</span>
                                        <ActionIcon className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}