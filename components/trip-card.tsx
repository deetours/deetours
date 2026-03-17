"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trip } from "@/lib/types";

interface TripCardProps {
    trip: Trip;
    index: number;
}

export function TripCard({ trip, index }: TripCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
            }}
            className="group relative flex flex-col cursor-pointer"
        >
            <Link href={`/trips/${trip.id}`} className="absolute inset-0 z-20">
                <span className="sr-only">View {trip.title} details</span>
            </Link>

            {/* Image Block: Edge to edge internally, profound hover scale on image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 mb-6">
                <Image
                    src={trip.imageUrl}
                    alt={trip.title}
                    fill
                    className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Subtle gradient to anchor the top badges if needed, otherwise clean */}
            </div>

            {/* Typographic Block: No borders, relies on hierarchy */}
            <div className="flex flex-col flex-grow relative z-10 transition-transform duration-[1s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2">
                <div className="flex justify-between items-start mb-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
                        {trip.duration} Days
                    </p>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent-luxury">
                        ${trip.price.toLocaleString()}
                    </span>
                </div>

                <h3 className="font-hero text-2xl text-primary-dark leading-tight mb-2 group-hover:text-accent-luxury transition-colors duration-500">
                    {trip.title}
                </h3>
                <p className="text-gray-500 text-sm font-light">
                    {trip.destination}
                </p>
            </div>
        </motion.div>
    );
}
