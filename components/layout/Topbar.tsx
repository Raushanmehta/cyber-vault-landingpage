'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldCheck,
    Mail,
} from 'lucide-react';
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { FaFacebook } from 'react-icons/fa';
import { LiaLinkedin } from 'react-icons/lia';
import { siteMap } from '@/data';
import { useContactModal } from '@/components/modal/GetInTouchModal';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    ShieldCheck,
    Mail,
    BsTwitter,
    FaFacebook,
    LiaLinkedin,
    BsInstagram,
};

interface TopBarProps {
    email?: string;
    contactUrl?: string;
    onContactClick?: () => void;
}

export default function TopBar({
    email,
    contactUrl,
    onContactClick
}: TopBarProps) {
    const data = siteMap.topbar;
    const { openModal } = useContactModal();
    const currentEmail = email || data.contact.email;
    const currentContactUrl = contactUrl || '/contact';

    const NotificationIcon = iconMap[data.notification.icon] || ShieldCheck;
    const EmailIcon = iconMap[data.contact.emailIcon] || Mail;

    const handleLinkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        openModal();
        if (onContactClick) onContactClick();
    };

    return (
        <div className="hidden md:block w-full bg-gradient-to-r from-[#0d0103] via-[#1a0407] to-[#0d0103] text-white text-xs sm:text-sm py-2.5 px-4 sm:px-8 border-b border-red-900/40 shadow-sm relative z-50 font-sans">
            <div className="max-w-[1350px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">

                {/* Notification banner */}
                <div className="flex items-center space-x-2 text-center md:text-left flex-wrap justify-center md:justify-start">
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="text-rose-500 flex items-center"
                    >
                        <NotificationIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                    <span className="text-gray-200 font-normal tracking-wide">
                        {data.notification.text}
                    </span>
                </div>

                {/* Contact info */}
                <div className="flex items-center space-x-4 sm:space-x-6 text-gray-300">

                    {/* Email link */}
                    <motion.a
                        href={`mailto:${currentEmail}`}
                        whileHover={{ scale: 1.03 }}
                        className="flex items-center space-x-2 hover:text-white transition-colors"
                    >
                        <EmailIcon className="w-4 h-4 text-rose-400" />
                        <span className="font-normal tracking-wide">{currentEmail}</span>
                    </motion.a>

                    {/* Separator line */}
                    <div className="h-4 w-[1px] bg-red-800/50 hidden sm:block" />

                    {/* Social links */}
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        {data.socialLinks.map((social) => {
                            const SocialIcon = iconMap[social.icon] || BsTwitter;
                            return (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.2, color: social.color }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-gray-300 transition-colors p-1"
                                    aria-label={social.name}
                                >
                                    <SocialIcon className="w-5 h-5" />
                                </motion.a>
                            );
                        })}
                    </div>

                </div>

            </div>
        </div>
    );
}