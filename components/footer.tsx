"use client";

import Link from "next/link";
import { OWNER } from "@/lib/constants";

export function Footer() {
    return (
        <footer className="bg-primary-dark text-white relative overflow-hidden">
            <div className="noise" />
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-12 relative z-10 flex flex-col">

                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
                    {/* Brand + Newsletter */}
                    <div className="md:col-span-5">
                        <p className="font-hero text-2xl mb-2">DeeTours</p>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-accent-luxury mb-8">by {OWNER.name}</p>
                        <p className="text-gray-400 font-light text-lg leading-relaxed max-w-sm mb-8">
                            Orchestrating transformative journeys so you can simply arrive.
                        </p>
                        <form className="flex border-b border-gray-700 pb-2 max-w-sm group focus-within:border-white transition-colors">
                            <input
                                type="email"
                                placeholder="Enter email for private dispatches"
                                className="bg-transparent border-none text-white text-sm focus:ring-0 outline-none w-full placeholder:text-gray-600"
                            />
                            <button className="text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors whitespace-nowrap">
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Explore Links */}
                    <div className="md:col-span-2 md:col-start-7">
                        <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-6">Explore</h4>
                        <ul className="space-y-4">
                            <li><Link href="/trips" className="text-gray-300 hover:text-white transition-colors text-sm">All Journeys</Link></li>
                            <li><Link href="/destinations" className="text-gray-300 hover:text-white transition-colors text-sm">Destinations</Link></li>
                            <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">The Studio</Link></li>
                            <li><Link href="/blog" className="text-gray-300 hover:text-white transition-colors text-sm">Journal</Link></li>
                        </ul>
                    </div>

                    {/* Connect Links */}
                    <div className="md:col-span-3">
                        <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-600 mb-6">Connect</h4>
                        <ul className="space-y-4">
                            <li>
                                <a href={`tel:${OWNER.phone}`} className="text-gray-300 hover:text-white transition-colors text-sm">
                                    {OWNER.phone}
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${OWNER.email}`} className="text-gray-300 hover:text-white transition-colors text-sm">
                                    {OWNER.email}
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com/deetours.in" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    {OWNER.instagram}
                                </a>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    Request a Consultation
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Big Typographic Watermark */}
                <div className="w-full flex justify-center mt-auto overflow-hidden">
                    <h1 className="font-hero text-[15vw] leading-[0.8] tracking-tighter text-white/5 select-none text-center">
                        DeeTours
                    </h1>
                </div>

                {/* Legal Bar */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray-600 mt-12 border-t border-gray-900">
                    <p>© {new Date().getFullYear()} DeeTours Studio. Founded by {OWNER.name}.</p>
                    <div className="flex gap-8">
                        <span>Bengaluru, India</span>
                        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
