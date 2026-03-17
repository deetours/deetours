"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { OWNER } from "@/lib/constants";
import { AGENT_STEPS } from "@/lib/booking-agent";
import { ArrowLeft, Check, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ─── */
type SessionData = Record<string, string>;

const TOTAL_STEPS = AGENT_STEPS.length; // 6 including contact

/* ─── Sub-components ─── */

function TypingIndicator() {
    return (
        <div className="flex items-center gap-1.5 px-5 py-4">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-accent-luxury"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
                />
            ))}
        </div>
    );
}

function AgentBubble({ text, delay = 0 }: { text: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-4 max-w-[85%]"
        >
            {/* Avatar */}
            <div className="shrink-0 w-9 h-9 rounded-full bg-accent-luxury/20 border border-accent-luxury/30 flex items-center justify-center">
                <span className="text-accent-luxury text-xs font-hero">D</span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-6 py-4 text-white/80 text-base font-light leading-relaxed backdrop-blur-sm">
                {text}
            </div>
        </motion.div>
    );
}

function UserBubble({ text }: { text: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-end"
        >
            <div className="bg-accent-luxury/20 border border-accent-luxury/30 rounded-2xl rounded-tr-none px-6 py-3 text-white text-sm font-medium max-w-[70%] backdrop-blur-sm">
                {text}
            </div>
        </motion.div>
    );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
    return (
        <div className="flex items-center gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
                <motion.div
                    key={i}
                    className={cn(
                        "h-0.5 rounded-full transition-all duration-700",
                        i < current ? "bg-accent-luxury" : "bg-white/15"
                    )}
                    animate={{ width: i < current ? 28 : 16 }}
                    initial={false}
                />
            ))}
        </div>
    );
}

function ConfirmationScene({ data }: { data: SessionData }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center gap-10 text-center py-12"
        >
            {/* Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.3 }}
                className="w-20 h-20 rounded-full bg-accent-luxury/10 border border-accent-luxury/30 flex items-center justify-center"
            >
                <Check className="w-8 h-8 text-accent-luxury" />
            </motion.div>

            <div className="space-y-4">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-[10px] uppercase tracking-[0.5em] text-accent-luxury"
                >
                    Your Journey Has Begun
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="font-hero text-[clamp(3rem,8vw,5.5rem)] leading-[0.9] tracking-tighter text-white text-balance"
                >
                    {data.name ? `Thank you,` : "Thank you."}<br />
                    {data.name && <span className="italic text-accent-luxury font-light">{data.name}.</span>}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-white/50 font-light max-w-sm mx-auto text-lg leading-relaxed"
                >
                    Deepa will personally reach out to{" "}
                    <span className="text-white/80">{data.phone}</span> within 24 hours with a curated proposal designed just for you.
                </motion.p>
            </div>

            {/* Summary card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-6 text-left space-y-4"
            >
                <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 mb-4">Your Preferences</p>
                {[
                    { label: "Interest", value: data.experience },
                    { label: "Travelling", value: data.group },
                    { label: "Timeline", value: data.timeline },
                    { label: "Budget", value: data.budget },
                ]
                    .filter((r) => r.value)
                    .map((r) => (
                        <div key={r.label} className="flex justify-between text-sm">
                            <span className="text-white/30 font-light">{r.label}</span>
                            <span className="text-white/80 capitalize">{r.value?.replace(/_/g, " ")}</span>
                        </div>
                    ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="flex flex-col items-center gap-4"
            >
                <a
                    href={`tel:${OWNER.phone}`}
                    className="flex items-center gap-3 text-accent-luxury hover:opacity-70 transition-opacity"
                >
                    <Phone className="w-4 h-4" />
                    <span className="text-[11px] uppercase tracking-[0.2em]">
                        Can't wait? Call {OWNER.phone}
                    </span>
                </a>
                <Link
                    href="/"
                    className="text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white/60 transition-colors"
                >
                    ← Return Home
                </Link>
            </motion.div>
        </motion.div>
    );
}

/* ─── Main Page ─── */
export default function BookingPage() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [showChoices, setShowChoices] = useState(false);
    const [sessionData, setSessionData] = useState<SessionData>({});
    const [history, setHistory] = useState<{ agent: string; user?: string }[]>([]);
    const [inputValues, setInputValues] = useState<Record<string, string>>({});
    const [isComplete, setIsComplete] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    const currentStep = AGENT_STEPS[currentStepIndex];

    const scrollToBottom = useCallback(() => {
        setTimeout(() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, []);

    // Show typing on each new step
    useEffect(() => {
        setIsTyping(true);
        setShowChoices(false);
        const t = setTimeout(() => {
            setIsTyping(false);
            setHistory((h) => [...h, { agent: currentStep.agentMessage }]);
            setTimeout(() => setShowChoices(true), 400);
        }, 1600);
        return () => clearTimeout(t);
    }, [currentStepIndex, currentStep]);

    useEffect(() => {
        scrollToBottom();
    }, [history, isTyping, showChoices, scrollToBottom]);

    function handleChoice(label: string, value: string) {
        const key = currentStep.dataKey!;
        setSessionData((prev) => ({ ...prev, [key]: value }));
        setHistory((prev) => [...prev.slice(0, -0), { ...prev[prev.length - 1] }, { agent: prev[prev.length - 1]?.agent ?? "", user: label }]);
        setHistory((h) => {
            const last = h[h.length - 1];
            return [...h.slice(0, -1), { ...last, user: label }];
        });
        setShowChoices(false);
        setTimeout(() => {
            if (currentStepIndex < AGENT_STEPS.length - 1) {
                setCurrentStepIndex((i) => i + 1);
            }
        }, 500);
    }

    async function handleContactSubmit(e: React.FormEvent) {
        e.preventDefault();
        const name = inputValues["name"];
        const phone = inputValues["phone"];
        if (!name || !phone) return;

        setIsSubmitting(true);
        setSessionData((prev) => ({ ...prev, ...inputValues }));

        // Simulate handoff — in production, POST to an API route that triggers WhatsApp agent
        await new Promise((r) => setTimeout(r, 1800));
        setIsComplete(true);
        setIsSubmitting(false);
    }

    return (
        <main className="min-h-screen bg-primary-dark relative overflow-x-hidden">
            <Navigation />
            <div className="noise" />

            {/* Ambient background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-luxury/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 min-h-screen flex flex-col pt-28 pb-16 px-4 md:px-8">
                <div className="w-full max-w-2xl mx-auto flex flex-col flex-1">

                    {/* Header */}
                    <AnimatePresence>
                        {!isComplete && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center justify-between mb-10"
                            >
                                <Link href="/" className="flex items-center gap-3 text-white/40 hover:text-white/70 transition-colors">
                                    <ArrowLeft className="w-4 h-4" />
                                    <span className="text-[10px] uppercase tracking-[0.3em]">Back</span>
                                </Link>
                                <div className="flex flex-col items-center gap-3">
                                    <p className="text-[9px] uppercase tracking-[0.5em] text-white/30">
                                        Step {Math.min(currentStepIndex + 1, TOTAL_STEPS)} of {TOTAL_STEPS}
                                    </p>
                                    <ProgressBar current={currentStepIndex + 1} total={TOTAL_STEPS} />
                                </div>
                                <div className="w-24" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col gap-6 min-h-0">

                        {isComplete ? (
                            <ConfirmationScene data={{ ...sessionData, ...inputValues }} />
                        ) : (
                            <>
                                {/* History — past steps */}
                                {history.slice(0, -1).map((item, i) => (
                                    <div key={i} className="flex flex-col gap-4 opacity-40">
                                        <AgentBubble text={item.agent} />
                                        {item.user && <UserBubble text={item.user} />}
                                    </div>
                                ))}

                                {/* Current agent message */}
                                {history.length > 0 && (
                                    <div className="flex flex-col gap-4">
                                        <AgentBubble text={history[history.length - 1].agent} />
                                        {history[history.length - 1].user && (
                                            <UserBubble text={history[history.length - 1].user!} />
                                        )}
                                    </div>
                                )}

                                {/* Typing indicator */}
                                <AnimatePresence>
                                    {isTyping && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-start gap-4"
                                        >
                                            <div className="shrink-0 w-9 h-9 rounded-full bg-accent-luxury/20 border border-accent-luxury/30 flex items-center justify-center">
                                                <span className="text-accent-luxury text-xs font-hero">D</span>
                                            </div>
                                            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none backdrop-blur-sm">
                                                <TypingIndicator />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Choice Pills */}
                                <AnimatePresence>
                                    {showChoices && currentStep.type === "choices" && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                            className="flex flex-wrap gap-3 mt-2"
                                        >
                                            {currentStep.choices?.map((choice, i) => (
                                                <motion.button
                                                    key={choice.value}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                    onClick={() => handleChoice(choice.label, choice.value)}
                                                    className="group flex items-center gap-2 bg-white/5 hover:bg-accent-luxury/20 border border-white/10 hover:border-accent-luxury/50 text-white/70 hover:text-white rounded-full px-5 py-3 text-sm font-light transition-all duration-300 cursor-pointer"
                                                >
                                                    {choice.emoji && (
                                                        <span className="text-accent-luxury text-xs group-hover:scale-125 transition-transform duration-300">
                                                            {choice.emoji}
                                                        </span>
                                                    )}
                                                    {choice.label}
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Contact Multi-Input Form */}
                                <AnimatePresence>
                                    {showChoices && currentStep.type === "multi-input" && (
                                        <motion.form
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                            onSubmit={handleContactSubmit}
                                            className="flex flex-col gap-4 mt-2"
                                        >
                                            {currentStep.inputFields?.map((field, i) => (
                                                <motion.div
                                                    key={field.key}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex flex-col gap-2"
                                                >
                                                    <label className="text-[10px] uppercase tracking-[0.3em] text-white/40">
                                                        {field.label}
                                                        {field.required && <span className="text-accent-luxury ml-1">*</span>}
                                                    </label>
                                                    <input
                                                        type={field.type || "text"}
                                                        placeholder={field.placeholder}
                                                        value={inputValues[field.key] || ""}
                                                        onChange={(e) =>
                                                            setInputValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                                                        }
                                                        required={field.required}
                                                        className="bg-white/5 border border-white/10 focus:border-accent-luxury/60 rounded-xl px-5 py-4 text-white placeholder:text-white/20 text-sm font-light outline-none transition-colors duration-300 backdrop-blur-sm"
                                                    />
                                                </motion.div>
                                            ))}

                                            <motion.button
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                type="submit"
                                                disabled={isSubmitting}
                                                className={cn(
                                                    "mt-2 w-full py-4 rounded-xl text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-500",
                                                    isSubmitting
                                                        ? "bg-accent-luxury/20 text-accent-luxury/60 cursor-wait"
                                                        : "bg-accent-luxury text-primary-dark hover:bg-accent-luxury/80 cursor-pointer"
                                                )}
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center justify-center gap-3">
                                                        <motion.span
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            className="w-4 h-4 border-2 border-accent-luxury/30 border-t-accent-luxury rounded-full inline-block"
                                                        />
                                                        Connecting you to Deepa...
                                                    </span>
                                                ) : (
                                                    "Begin My Journey →"
                                                )}
                                            </motion.button>

                                            <p className="text-[10px] text-white/20 text-center mt-1">
                                                Your details are private. Deepa personally handles every enquiry.
                                            </p>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </>
                        )}

                        <div ref={bottomRef} />
                    </div>
                </div>
            </div>

            {!isComplete && <Footer />}
        </main>
    );
}
