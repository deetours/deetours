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
        <div className="flex items-center gap-1.5 px-6 py-5">
            {[0, 1, 2].map((i) => (
                <motion.span
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-foreground/50"
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
            transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-4 max-w-[85%]"
        >
            {/* Avatar */}
            <div className="shrink-0 w-10 h-10 rounded-full bg-surface-1 border border-border-subtle flex items-center justify-center">
                <span className="text-foreground text-xs font-hero">D</span>
            </div>
            <div className="bg-surface-1 border border-border-subtle rounded-2xl rounded-tl-none px-6 py-4 text-border-strong text-lg font-light leading-relaxed backdrop-blur-sm">
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
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-end"
        >
            <div className="bg-foreground text-background rounded-2xl rounded-tr-none px-6 py-4 text-sm font-medium max-w-[70%] backdrop-blur-sm">
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
                        i < current ? "bg-foreground" : "bg-border-subtle"
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
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center gap-12 text-center py-16"
        >
            {/* Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.3 }}
                className="w-24 h-24 rounded-full bg-surface-1 border border-border-subtle flex items-center justify-center"
            >
                <Check className="w-10 h-10 text-foreground" />
            </motion.div>

            <div className="space-y-6">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-[0.6rem] uppercase tracking-[0.5em] text-muted"
                >
                    Application Received
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="font-hero text-[clamp(4rem,8vw,6rem)] leading-[0.85] tracking-tighter text-foreground text-balance"
                >
                    {data.name ? `Thank you,` : "Thank you."}<br />
                    {data.name && <span className="italic text-muted font-light">{data.name}.</span>}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="text-border-strong font-light max-w-md mx-auto text-xl leading-relaxed"
                >
                    Deepa will personally reach out to{" "}
                    <span className="text-foreground">{data.phone}</span> within 24 hours.
                </motion.p>
            </div>

            {/* Summary card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                className="w-full max-w-sm bg-surface-1 border border-border-subtle rounded-2xl p-8 text-left space-y-6"
            >
                <p className="text-[0.55rem] uppercase tracking-[0.4em] text-muted mb-6">Application Details</p>
                {[
                    { label: "Interest", value: data.experience },
                    { label: "Travelling", value: data.group },
                    { label: "Timeline", value: data.timeline },
                    { label: "Budget", value: data.budget },
                ]
                    .filter((r) => r.value)
                    .map((r) => (
                        <div key={r.label} className="flex justify-between text-sm items-center border-b border-border-subtle/50 pb-4 last:border-0 last:pb-0">
                            <span className="text-muted text-xs font-light">{r.label}</span>
                            <span className="text-foreground capitalize font-medium">{r.value?.replace(/_/g, " ")}</span>
                        </div>
                    ))}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="flex flex-col items-center gap-8 mt-8"
            >
                <a
                    href={`tel:${OWNER.phone}`}
                    className="flex items-center gap-3 text-border-strong hover:text-foreground transition-colors"
                >
                    <Phone className="w-4 h-4" />
                    <span className="text-[0.6rem] uppercase tracking-[0.3em]">
                        Urgent? Call {OWNER.phone}
                    </span>
                </a>
                <Link
                    href="/"
                    className="text-[0.6rem] uppercase tracking-[0.4em] text-muted hover:text-foreground transition-colors flex items-center gap-3"
                >
                    <ArrowLeft className="w-4 h-4" /> Return to Origin
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
        setHistory((prev) => {
            const last = prev[prev.length - 1];
            return [...prev.slice(0, -1), { ...last, user: label }];
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

        // Simulate handoff
        await new Promise((r) => setTimeout(r, 1800));
        setIsComplete(true);
        setIsSubmitting(false);
    }

    return (
        <main className="min-h-screen bg-background text-foreground relative overflow-x-hidden selection:bg-foreground selection:text-background">
            <Navigation />
            <div className="noise mix-blend-overlay opacity-20 pointer-events-none fixed inset-0 z-0" />

            <div className="relative z-10 min-h-screen flex flex-col pt-32 pb-24 px-4 md:px-8">
                <div className="w-full max-w-3xl mx-auto flex flex-col flex-1">

                    {/* Header */}
                    <AnimatePresence>
                        {!isComplete && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center justify-between mb-16 pb-8 border-b border-border-subtle"
                            >
                                <Link href="/" className="flex items-center gap-3 text-muted hover:text-foreground transition-colors">
                                    <ArrowLeft className="w-4 h-4" />
                                    <span className="text-[0.6rem] uppercase tracking-[0.4em]">Abort</span>
                                </Link>
                                <div className="flex flex-col items-center gap-4">
                                    <p className="text-[0.6rem] uppercase tracking-[0.5em] text-muted">
                                        Phase {Math.min(currentStepIndex + 1, TOTAL_STEPS)} of {TOTAL_STEPS}
                                    </p>
                                    <ProgressBar current={currentStepIndex + 1} total={TOTAL_STEPS} />
                                </div>
                                <div className="w-24" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Chat Area */}
                    <div className="flex-1 flex flex-col gap-8 min-h-0">

                        {isComplete ? (
                            <ConfirmationScene data={{ ...sessionData, ...inputValues }} />
                        ) : (
                            <>
                                {/* History — past steps */}
                                {history.slice(0, -1).map((item, i) => (
                                    <div key={i} className="flex flex-col gap-6 opacity-50">
                                        <AgentBubble text={item.agent} />
                                        {item.user && <UserBubble text={item.user} />}
                                    </div>
                                ))}

                                {/* Current agent message */}
                                {history.length > 0 && (
                                    <div className="flex flex-col gap-6">
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
                                            <div className="shrink-0 w-10 h-10 rounded-full bg-surface-1 border border-border-subtle flex items-center justify-center">
                                                <span className="text-foreground text-xs font-hero">D</span>
                                            </div>
                                            <div className="bg-surface-1 border border-border-subtle rounded-2xl rounded-tl-none backdrop-blur-sm">
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
                                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                            className="flex flex-wrap gap-4 mt-8"
                                        >
                                            {currentStep.choices?.map((choice, i) => (
                                                <motion.button
                                                    key={choice.value}
                                                    initial={{ opacity: 0, y: 8 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                                    onClick={() => handleChoice(choice.label, choice.value)}
                                                    className="group flex items-center gap-3 bg-surface-1 hover:bg-foreground border border-border-subtle hover:border-foreground text-border-strong hover:text-background rounded-full px-6 py-4 text-sm font-light transition-all duration-500 cursor-pointer"
                                                >
                                                    {choice.emoji && (
                                                        <span className="group-hover:scale-125 transition-transform duration-500">
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
                                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                            onSubmit={handleContactSubmit}
                                            className="flex flex-col gap-6 mt-8 max-w-xl"
                                        >
                                            {currentStep.inputFields?.map((field, i) => (
                                                <motion.div
                                                    key={field.key}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex flex-col gap-3"
                                                >
                                                    <label className="text-[0.6rem] uppercase tracking-[0.4em] text-muted">
                                                        {field.label}
                                                        {field.required && <span className="text-foreground ml-2">*</span>}
                                                    </label>
                                                    <input
                                                        type={field.type || "text"}
                                                        placeholder={field.placeholder}
                                                        value={inputValues[field.key] || ""}
                                                        onChange={(e) =>
                                                            setInputValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                                                        }
                                                        required={field.required}
                                                        className="bg-surface-1 border border-border-subtle focus:border-foreground rounded-none px-4 py-5 text-foreground placeholder:text-border-subtle text-lg font-light outline-none transition-colors duration-500 backdrop-blur-sm"
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
                                                    "mt-8 w-full py-6 text-[0.65rem] uppercase tracking-[0.4em] font-medium transition-all duration-700",
                                                    isSubmitting
                                                        ? "bg-surface-1 text-muted cursor-wait"
                                                        : "bg-foreground text-background hover:bg-[#A3A3A3] cursor-pointer"
                                                )}
                                            >
                                                {isSubmitting ? (
                                                    <span className="flex items-center justify-center gap-4">
                                                        <motion.span
                                                            animate={{ rotate: 360 }}
                                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                            className="w-4 h-4 border-2 border-border-subtle border-t-[#737373] rounded-full inline-block"
                                                        />
                                                        Transmitting...
                                                    </span>
                                                ) : (
                                                    "Submit Application →"
                                                )}
                                            </motion.button>

                                            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-border-subtle text-center mt-4">
                                                Highly Confidential.
                                            </p>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </>
                        )}

                        <div ref={bottomRef} className="h-24" />
                    </div>
                </div>
            </div>

            {!isComplete && <Footer />}
        </main>
    );
}

