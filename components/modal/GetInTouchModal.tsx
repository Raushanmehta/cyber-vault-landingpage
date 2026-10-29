'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
    CheckCircle2,
    ArrowRight,
    Loader2,
    Building2,
    Mail,
    User,
    Phone,
    MessageSquare,
    Sparkles,
} from 'lucide-react';
import { siteMap } from '@/data';

// Modal context
interface ContactModalContextType {
    isOpen: boolean;
    selectedService: string;
    openModal: (service?: string) => void;
    closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<string>('');

    const openModal = useCallback((service?: string) => {
        if (service) {
            setSelectedService(service);
        } else {
            setSelectedService('');
        }
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <ContactModalContext.Provider value={{ isOpen, selectedService, openModal, closeModal }}>
            {children}
            {/* Dialog component */}
            <GetInTouchModalDialog />
        </ContactModalContext.Provider>
    );
}

export function useContactModal() {
    const context = useContext(ContactModalContext);
    if (!context) {
        throw new Error('useContactModal must be used within a ContactModalProvider');
    }
    return context;
}

// Modal dialog
const serviceOptions = [
    'Threat Detection & AI SOC',
    'Endpoint Security & EDR',
    'Network Defense & Firewall',
    'Data Encryption & Privacy',
    'Cloud Security Posture (CSPM)',
    'Incident Response & Forensics',
    'General Security Consultation',
];

function GetInTouchModalDialog() {
    const { isOpen, closeModal, selectedService } = useContactModal();
    const modalData = siteMap.contactModal;

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');
    const [service, setService] = useState(serviceOptions[0]);
    const [prevSelected, setPrevSelected] = useState(selectedService);
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [ticketId, setTicketId] = useState('');

    // Preselect service when selectedService prop/context changes
    if (selectedService !== prevSelected) {
        setPrevSelected(selectedService);
        if (selectedService) {
            const matched = serviceOptions.find(
                (s) => s.toLowerCase().includes(selectedService.toLowerCase()) ||
                    selectedService.toLowerCase().includes(s.toLowerCase())
            );
            setService(matched || selectedService);
        } else {
            setService(serviceOptions[0]);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Submit form
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const generatedId = `CV-${Math.floor(100000 + Math.random() * 900000)}`;
        setTicketId(generatedId);
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const handleReset = () => {
        setFullName('');
        setEmail('');
        setPhone('');
        setCompany('');
        setMessage('');
        setIsSuccess(false);
        closeModal();
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            if (!open) {
                if (isSuccess) {
                    handleReset();
                } else {
                    closeModal();
                }
            }
        }}>
            <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 bg-white border border-slate-200 shadow-2xl rounded-3xl font-sans">
                {isSuccess ? (
                    /* Success screen */
                    <div className="py-6 sm:py-8 text-center flex flex-col items-center">
                        <div className="w-16 h-16 rounded-full bg-red-50 border-2 border-red-500/30 flex items-center justify-center text-red-600 mb-5 shadow-lg shadow-red-500/20 animate-bounce">
                            <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100/70 text-red-800 text-xs font-semibold mb-3">
                            <Sparkles className="w-3.5 h-3.5 text-red-600" />
                            <span>TRANSMISSION SECURED • TICKET {ticketId}</span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-2">
                            Inquiry Received Successfully!
                        </h3>

                        <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-6">
                            Thank you, <span className="font-semibold text-slate-900">{fullName || 'Valued Client'}</span>. A Tier-3 Cyber Architect has been assigned to your request for <span className="font-semibold text-red-600">{service}</span>.
                        </p>

                        <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-2 mb-6">
                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>Direct Contact Email:</span>
                                <span className="font-medium text-slate-800">{email || 'On file'}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>Estimated SLA Response:</span>
                                <span className="font-semibold text-emerald-600">⚡ Under 15 Minutes</span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-slate-500">
                                <span>Security Protocol:</span>
                                <span className="text-slate-700">AES-256 Encrypted / NDA Protected</span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            onClick={handleReset}
                            className="w-full h-11 bg-gradient-to-r from-red-700 via-red-600 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-medium rounded-xl shadow-lg shadow-red-600/25 transition-all cursor-pointer"
                        >
                            Return to Website
                        </Button>
                    </div>
                ) : (
                    /* Form dialog */
                    <>
                        <DialogHeader className="text-left space-y-2 item-center">
                            <DialogTitle className="text-2xl items-center text-center sm:text-3xl font-bold text-slate-900 tracking-tight">
                                {modalData.title}
                            </DialogTitle>

                            <DialogDescription className="text-center">
                                {modalData.description}
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-4 pt-3">
                            {/* Name email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div className="space-y-1.5 text-left">
                                    <Label htmlFor="fullName" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-red-600" />
                                        Full Name *
                                    </Label>
                                    <Input
                                        id="fullName"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Enter Your Full Name"
                                        className="h-10 text-sm border-slate-200 focus-visible:ring-red-500"
                                    />
                                </div>

                                <div className="space-y-1.5 text-left">
                                    <Label htmlFor="email" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                                        <Mail className="w-3.5 h-3.5 text-red-600" />
                                        Work Email *
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter Your Email"
                                        className="h-10 text-sm border-slate-200 focus-visible:ring-red-500"
                                    />
                                </div>
                            </div>

                            {/* Phone company */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                <div className="space-y-1.5 text-left">
                                    <Label htmlFor="phone" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                                        <Phone className="w-3.5 h-3.5 text-red-600" />
                                        Phone Number *
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter Your Phone Number"
                                        className="h-10 text-sm border-slate-200 focus-visible:ring-red-500"
                                    />
                                </div>

                                <div className="space-y-1.5 text-left">
                                    <Label htmlFor="company" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                                        <Building2 className="w-3.5 h-3.5 text-red-600" />
                                        Company / Organization
                                    </Label>
                                    <Input
                                        id="company"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        placeholder="Enter Your Company Name"
                                        className="h-10 text-sm border-slate-200 focus-visible:ring-red-500"
                                    />
                                </div>
                            </div>

                            {/* Message input */}
                            <div className="space-y-1.5 text-left">
                                <Label htmlFor="message" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                                    <MessageSquare className="w-3.5 h-3.5 text-red-600" />
                                    Security Requirements / Infrastructure Notes (Optional)
                                </Label>
                                <Textarea
                                    id="message"
                                    rows={3}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Your Message..."
                                    className="text-sm border-slate-200 resize-none focus-visible:ring-red-500"
                                />
                            </div>

                            {/* Action buttons */}
                            <div className="pt-2 flex items-center gap-3">

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 h-11 bg-gradient-to-r from-red-700 via-red-600 to-rose-600 hover:from-red-600 hover:to-rose-500 text-white font-medium rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                                            <span> Requesting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Submit</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default GetInTouchModalDialog;
