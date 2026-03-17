"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { OWNER } from "@/lib/constants";
import { Phone, Mail, Instagram, MapPin, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", intent: "", message: "" });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-background selection:bg-accent-luxury selection:text-white">
            <Navigation />

            {/* Hero Header */}
            <section className="pt-48 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto border-b border-gray-100">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-8"
                >
                    Begin the Conversation
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="font-hero text-[clamp(3.5rem,8vw,7rem)] leading-[0.9] tracking-tighter text-primary-dark max-w-4xl text-balance"
                >
                    Let's design your <span className="italic text-gray-400 font-light">next chapter.</span>
                </motion.h1>
            </section>

            {/* Main Grid */}
            <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-12 gap-24">

                {/* Left: Contact Details */}
                <div className="lg:col-span-4 space-y-16">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-8">The Curator</h3>
                        <p className="font-hero text-3xl text-primary-dark mb-2">{OWNER.name}</p>
                        <p className="text-sm text-accent-luxury tracking-widest uppercase">{OWNER.tagline}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-6"
                    >
                        <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">Direct Line</h3>

                        <a href={`tel:${OWNER.phone}`} className="flex items-center gap-4 group">
                            <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center group-hover:border-primary-dark transition-colors duration-300">
                                <Phone className="w-4 h-4 text-gray-500 group-hover:text-primary-dark transition-colors duration-300" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">WhatsApp / Call</p>
                                <p className="text-lg font-medium text-primary-dark group-hover:text-accent-luxury transition-colors duration-300">{OWNER.phone}</p>
                            </div>
                        </a>

                        <a href={`mailto:${OWNER.email}`} className="flex items-center gap-4 group">
                            <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center group-hover:border-primary-dark transition-colors duration-300">
                                <Mail className="w-4 h-4 text-gray-500 group-hover:text-primary-dark transition-colors duration-300" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Email</p>
                                <p className="text-lg font-medium text-primary-dark group-hover:text-accent-luxury transition-colors duration-300">{OWNER.email}</p>
                            </div>
                        </a>

                        <a href="https://instagram.com/deetours.in" target="_blank" rel="noreferrer" className="flex items-center gap-4 group">
                            <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center group-hover:border-primary-dark transition-colors duration-300">
                                <Instagram className="w-4 h-4 text-gray-500 group-hover:text-primary-dark transition-colors duration-300" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Instagram</p>
                                <p className="text-lg font-medium text-primary-dark group-hover:text-accent-luxury transition-colors duration-300">{OWNER.instagram}</p>
                            </div>
                        </a>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center">
                                <MapPin className="w-4 h-4 text-gray-400" />
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Based in</p>
                                <p className="text-lg font-medium text-primary-dark">Bengaluru, India</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-primary-dark text-white p-8 relative overflow-hidden"
                    >
                        <div className="noise" />
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4 relative z-10">Response Time</p>
                        <p className="font-hero text-2xl mb-4 relative z-10">We respond within 24 hours.</p>
                        <p className="text-gray-400 font-light text-sm relative z-10">Every inquiry is reviewed personally by {OWNER.name}. Weekend responses may take up to 48 hours.</p>
                    </motion.div>
                </div>

                {/* Right: The Inquiry Form */}
                <div className="lg:col-span-8">
                    {submitted ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center text-center h-full py-24 space-y-8"
                        >
                            <CheckCircle2 className="w-20 h-20 text-accent-luxury" />
                            <h3 className="font-hero text-5xl text-primary-dark">Received.</h3>
                            <p className="text-gray-500 font-light text-xl max-w-md">
                                Thank you, {form.name}. {OWNER.name} will be in touch within 24 hours to begin designing your journey.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form
                            onSubmit={handleSubmit}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="space-y-12"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-3">Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-transparent border-b border-gray-300 py-4 text-xl text-primary-dark focus:border-primary-dark outline-none transition-colors placeholder:text-gray-300"
                                        placeholder="Priya Sharma"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-3">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
                                        className="w-full bg-transparent border-b border-gray-300 py-4 text-xl text-primary-dark focus:border-primary-dark outline-none transition-colors placeholder:text-gray-300"
                                        placeholder="priya@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-6">What kind of journey are you seeking?</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {["Adventure", "Spiritual", "Luxury", "Leisure"].map(type => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setForm({ ...form, intent: type })}
                                            className={`py-4 border text-sm uppercase tracking-widest transition-all duration-300 ${form.intent === type
                                                    ? "border-primary-dark bg-primary-dark text-white"
                                                    : "border-gray-200 hover:border-primary-dark text-gray-500"
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-3">Tell us your dream</label>
                                <textarea
                                    rows={5}
                                    value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                    className="w-full bg-transparent border-b border-gray-300 py-4 text-xl text-primary-dark focus:border-primary-dark outline-none transition-colors resize-none placeholder:text-gray-300"
                                    placeholder="I've always wanted to wake up in the mountains and feel completely disconnected from everything..."
                                />
                            </div>

                            <Button type="submit" size="lg" magnetic={false} className="w-full md:w-auto">
                                Send My Inquiry
                            </Button>
                        </motion.form>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
