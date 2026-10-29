import { Variants, Transition, TargetAndTransition } from "framer-motion";

// Transition configs
export const transitions: Record<string, Transition> = {
    fast: { duration: 0.2, ease: "easeOut" },
    normal: { duration: 0.5, ease: "easeOut" },
    slow: { duration: 0.8, ease: "easeOut" },
    smooth: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    spring: { type: "spring", stiffness: 300, damping: 25 },
    bouncy: { type: "spring", stiffness: 400, damping: 15 },
    gentle: { type: "spring", stiffness: 120, damping: 14 },
};

// Fade variants
export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: transitions.normal,
    },
};

export const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: transitions.normal,
    },
};

export const fadeInDown: Variants = {
    hidden: { opacity: 0, y: -24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: transitions.normal,
    },
};

export const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -25 },
    visible: {
        opacity: 1,
        x: 0,
        transition: transitions.normal,
    },
};

export const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 25 },
    visible: {
        opacity: 1,
        x: 0,
        transition: transitions.normal,
    },
};

// Directional fade
export const fadeDirection = (
    direction: "up" | "down" | "left" | "right",
    distance = 30,
    duration = 0.6,
    delay = 0
): Variants => {
    const x = direction === "left" ? -distance : direction === "right" ? distance : 0;
    const y = direction === "up" ? distance : direction === "down" ? -distance : 0;

    return {
        hidden: { opacity: 0, x, y },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration, delay, ease: "easeOut" },
        },
    };
};

// Scale variants
export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: transitions.normal,
    },
};

export const scaleUp: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: transitions.spring,
    },
};

export const zoomIn: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: transitions.smooth,
    },
};

// Stagger variants
export const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

export const columnVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" },
    },
};

export const linkContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

export const linkItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: "easeOut" },
    },
};

export const staggerContainer = (
    staggerChildren = 0.1,
    delayChildren = 0
): Variants => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren,
            delayChildren,
        },
    },
});

export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: transitions.normal,
    },
};

export const staggerItemScale: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: transitions.spring,
    },
};

// Micro interactions
export const buttonHoverTap = {
    whileHover: { scale: 1.03 } as TargetAndTransition,
    whileTap: { scale: 0.97 } as TargetAndTransition,
    transition: { type: "spring" as const, stiffness: 400, damping: 20 },
};

export const iconHoverTap = {
    whileHover: { scale: 1.15, y: -2 } as TargetAndTransition,
    whileTap: { scale: 0.92 } as TargetAndTransition,
    transition: { type: "spring" as const, stiffness: 400, damping: 15 },
};

export const cardHover: { whileHover: TargetAndTransition } = {
    whileHover: { y: -6, transition: { duration: 0.25, ease: "easeOut" } },
};

export const cardHoverScale: { whileHover: TargetAndTransition } = {
    whileHover: { y: -6, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } },
};

// Menu variants
export const dropdownVariants: Variants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
        opacity: 0,
        y: 6,
        scale: 0.98,
        transition: { duration: 0.15, ease: "easeIn" },
    },
};

export const accordionVariants: Variants = {
    hidden: { opacity: 0, height: 0, overflow: "hidden" },
    visible: {
        opacity: 1,
        height: "auto",
        transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: {
        opacity: 0,
        height: 0,
        overflow: "hidden",
        transition: { duration: 0.2, ease: "easeInOut" },
    },
};

// Loop animations
export const floatingBadge = {
    animate: {
        y: [0, -8, 0],
    },
    transition: {
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut",
    } as Transition,
};

export const pulseDot = {
    animate: {
        scale: [1, 1.25, 1],
        opacity: [1, 0.7, 1],
    },
    transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
    } as Transition,
};

export const ambientGlowPulse = {
    animate: {
        opacity: [0.35, 0.7, 0.35],
        scale: [0.95, 1.08, 0.95],
    },
    transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
    } as Transition,
};

// Page animations
export const pageTopContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

export const pageTopItemVariants: Variants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    },
};

// Viewport config
export const defaultViewport = {
    once: true,
    margin: "-60px",
};
