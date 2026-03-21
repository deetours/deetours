"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col md:flex-row w-full selection:bg-foreground selection:text-background">
            {/* Split Panel: Image */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full md:w-1/2 h-[40vh] md:h-screen relative overflow-hidden bg-surface-1"
            >
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="noise mix-blend-overlay opacity-30 z-20 absolute inset-0 pointer-events-none" />
                <Image
                    src="https://images.unsplash.com/photo-1518557984649-7b161c230cfa?q=80&w=2670&auto=format&fit=crop"
                    alt="Cinematic location"
                    fill
                    priority
                    className="object-cover contrast-[1.1] grayscale-[20%]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                <div className="absolute top-8 left-8 z-30">
                    <Link href="/" className="font-hero text-2xl text-[#FAFAFA] tracking-tighter hover:opacity-70 transition-opacity">
                        DeeTours
                    </Link>
                </div>
                
                <div className="absolute bottom-8 left-8 right-8 z-30">
                    <p className="font-hero text-2xl md:text-4xl text-[#FAFAFA] tracking-tighter leading-tight max-w-sm">
                        Request <br/>
                        <span className="italic font-light opacity-80">Access.</span>
                    </p>
                </div>
            </motion.div>

            {/* Split Panel: Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 relative overflow-y-auto max-h-screen pb-24 md:pb-12">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md flex flex-col items-center"
                >
                    <SignUp 
                        appearance={{
                            elements: {
                                card: "bg-surface-1 border border-border-subtle shadow-none rounded-2xl",
                                headerTitle: "font-hero text-2xl text-foreground",
                                headerSubtitle: "text-muted font-light",
                                formButtonPrimary: "bg-foreground text-background hover:bg-foreground/90 transition-colors uppercase tracking-widest text-[0.65rem] py-4 rounded-full",
                                formFieldLabel: "text-foreground font-medium uppercase tracking-widest text-[0.6rem]",
                                formFieldInput: "bg-background border-border-subtle text-foreground rounded-lg focus:ring-1 focus:ring-foreground",
                                footerActionText: "text-muted",
                                footerActionLink: "text-foreground font-medium hover:italic transition-all",
                                socialButtonsBlockButton: "border-border-subtle text-foreground hover:bg-surface-1",
                                dividerText: "text-muted text-[0.6rem] uppercase tracking-widest"
                            }
                        }}
                    />
                </motion.div>
            </div>
        </main>
    );
}
