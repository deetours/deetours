"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { Trip } from "@/lib/types";
import { Button } from "./ui/button";

interface BookingSheetProps {
    isOpen: boolean;
    onClose: () => void;
    trip: Trip;
}

export function BookingSheet({ isOpen, onClose, trip }: BookingSheetProps) {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep((s) => s + 1);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-primary-dark/40 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full max-w-md bg-background shadow-2xl z-[60] flex flex-col overflow-hidden"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-white z-10">
                            <div>
                                <p className="text-[10px] uppercase tracking-widest text-gray-500">Reservation</p>
                                <h3 className="font-hero text-2xl text-primary-dark">{trip.title}</h3>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 relative">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-12"
                                    >
                                        <div>
                                            <h4 className="font-hero text-3xl mb-6">Let's craft your journey.</h4>
                                            <p className="text-gray-600 font-light mb-8 leading-relaxed">
                                                Instead of a generic form, tell us your preferences. We'll handle the rest.
                                            </p>

                                            <div className="space-y-6">
                                                <div className="group">
                                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Primary Traveler Name</label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-transparent border-b border-gray-300 py-3 text-xl focus:border-primary-dark outline-none transition-colors"
                                                        placeholder="Elena Voss"
                                                    />
                                                </div>
                                                <div className="group">
                                                    <label className="text-[10px] uppercase tracking-widest text-gray-400 block mb-2">Preferred Dates</label>
                                                    <input
                                                        type="text"
                                                        className="w-full bg-transparent border-b border-gray-300 py-3 text-xl focus:border-primary-dark outline-none transition-colors"
                                                        placeholder="October 12th - 19th"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <h4 className="font-hero text-3xl mb-6">Secure Your Spot</h4>
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                            <div className="flex justify-between mb-4 text-sm text-gray-600">
                                                <span>{trip.duration} Journey</span>
                                                <span>${trip.price.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between font-medium text-lg border-t border-gray-100 pt-4">
                                                <span>Total</span>
                                                <span>${trip.price.toLocaleString()}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-6 mt-8">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent border-b border-gray-300 py-3 text-lg focus:border-primary-dark outline-none transition-colors"
                                                placeholder="Card Number"
                                            />
                                            <div className="flex gap-4">
                                                <input
                                                    type="text"
                                                    className="w-1/2 bg-transparent border-b border-gray-300 py-3 text-lg focus:border-primary-dark outline-none transition-colors"
                                                    placeholder="MM/YY"
                                                />
                                                <input
                                                    type="text"
                                                    className="w-1/2 bg-transparent border-b border-gray-300 py-3 text-lg focus:border-primary-dark outline-none transition-colors"
                                                    placeholder="CVC"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center h-full text-center space-y-6 pt-12"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                                        >
                                            <CheckCircle2 className="w-24 h-24 text-accent-adventure" />
                                        </motion.div>
                                        <h4 className="font-hero text-4xl text-primary-dark">Reserved</h4>
                                        <p className="text-gray-500 font-light max-w-sm">
                                            Your transformation begins now. A concierge will be in touch securely within 24 hours.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {step < 3 && (
                            <div className="p-6 bg-white border-t border-gray-100 sticky bottom-0">
                                <Button className="w-full" size="lg" onClick={nextStep} magnetic={false}>
                                    {step === 1 ? "Continue" : `Confirm $${trip.price.toLocaleString()}`}
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
