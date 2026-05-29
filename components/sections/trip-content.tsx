"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Destination } from "@/components/sections/destinations";
import { BadgeCheck, Info } from "lucide-react";
import {IconUmbrella} from "@tabler/icons-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

interface TripContentProps {
    trip: Destination;
}

const itinerary = [
    { day: "Day 1", title: "Arrival and Briefing",    details: "Arrive at the airport where our guide will pick you up. Transfer to your hotel for a briefing on your upcoming safari adventure." },
    { day: "Day 2", title: "Game Drive & Exploration", details: "Head into the heart of the national park for a full day game drive. Witness the Big Five in their natural habitat." },
    { day: "Day 3", title: "Cultural Immersion",       details: "Visit a local village and learn about the traditions and daily life of the community. Enjoy traditional music and dance." },
    { day: "Day 4", title: "Departure",                details: "Final morning game drive followed by brunch. Transfer back to the airport for your flight home." },
];

const TripContent = ({ trip }: TripContentProps) => {
    const containerRef  = useRef<HTMLDivElement>(null);
    const lineRef       = useRef<HTMLDivElement>(null);
    const dotRefs       = useRef<(HTMLDivElement | null)[]>([]);
    const cardRefs      = useRef<(HTMLDivElement | null)[]>([]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            // ── Reveal general items ──────────────────────────────────────
            gsap.from(".reveal-item", {
                y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out",
                scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
            });

            // ── Vertical line grows downward ──────────────────────────────
            gsap.fromTo(lineRef.current,
                { scaleY: 0, transformOrigin: "top center" },
                {
                    scaleY: 1, ease: "none",
                    scrollTrigger: {
                        trigger: lineRef.current,
                        start: "top 70%",
                        end:   "bottom 60%",
                        scrub: 1,
                    },
                }
            );

            // ── Each dot pops in as the line reaches it ───────────────────
            dotRefs.current.forEach((dot) => {
                if (!dot) return;
                gsap.fromTo(dot,
                    { scale: 0, opacity: 0 },
                    {
                        scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)",
                        scrollTrigger: {
                            trigger: dot,
                            start: "top 72%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

            // ── Cards slide in alternating left / right ───────────────────
            cardRefs.current.forEach((card, i) => {
                if (!card) return;
                const fromX = i % 2 === 0 ? -40 : 40;
                gsap.fromTo(card,
                    { x: fromX, opacity: 0 },
                    {
                        x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 80%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="container mx-auto px-4 py-20 grid lg:grid-cols-3 gap-16">

            {/* ── Left Column ─────────────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-16">

                {/* Overview */}
                <section className="reveal-item">
                    <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-3xl font-pangaia font-bold">🏜 {" "} Overview</h2>
                    </div>
                    <p className="text-xl text-gray-700 leading-relaxed">{trip.description}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        {trip.tags.map((tag) => (
                            <span key={tag} className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-bold">
                #{tag}
              </span>
                        ))}
                    </div>
                </section>

                {/* GSAP Timeline Itinerary */}
                <section>
                    <div className="flex items-center gap-2 mb-10 reveal-item">

                        <h2 className="text-3xl font-pangaia font-bold">&#127957;{" "} Daywise Itinerary</h2>
                    </div>

                    <div className="relative">
                        {/* Vertical line */}
                        <div
                            ref={lineRef}
                            className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-emerald-200 origin-top"
                        />

                        <div className="space-y-10">
                            {itinerary.map((item, i) => (
                                <div key={i} className="flex gap-3 items-start">

                                    {/* Dot */}
                                    <div className="relative z-10 flex-shrink-0 mt-1">
                                        <div
                                            ref={(el) => { dotRefs.current[i] = el; }}
                                            className="w-10 h-10 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center shadow-md shadow-emerald-100"
                                        >
                      <span className="text-[10px] font-bold text-emerald-600 leading-none text-center">
                        {i + 1}
                      </span>
                                        </div>
                                    </div>

                                    {/* Card */}
                                    <div
                                        ref={(el) => { cardRefs.current[i] = el; }}
                                        className="flex-1 bg-gray-50 rounded-[24px] px-7 py-6"
                                    >
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                      {item.day}
                    </span>
                                        <h3 className="text-xl font-pangaia font-bold mt-1 mb-3">{item.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{item.details}</p>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex items-center gap-2 mb-10 reveal-item">

                        <h2 className="text-3xl font-pangaia font-bold"> &#127958; Travel highlights</h2>
                    </div>

                    <div className="space-y-5">
                        {trip.activities.map((activity, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="bg-emerald-50 p-2 rounded-lg shadow-sm flex-shrink-0">
                                    <BadgeCheck className="text-emerald-600" size={20} />
                                </div>

                                <p>{activity}</p>
                            </div>
                        ))}

                    </div>
                </section>
            </div>

            {/* ── Right Column ────────────────────────────────────────────── */}
            <div className="reveal-item">
                <div className="sticky top-32 bg-orange-50/30 border border-orange-100 rounded-[40px] p-8 md:p-10">
                    <h3 className="text-2xl font-pangaia font-bold mb-6">Experience Highlights</h3>
                    <ul className="space-y-6">
                        {[
                            { label: "Expert Guides",   desc: "Experienced professionals with deep local knowledge." },
                            { label: "Premium Lodging", desc: "Hand-picked eco-lodges and luxury campsites." },
                            { label: "All-Inclusive",   desc: "Meals, transport, and park fees are all covered." },
                        ].map(({ label, desc }) => (
                            <li key={label} className="flex items-start gap-4">
                                <div className="bg-white p-2 rounded-lg shadow-sm flex-shrink-0">
                                    <BadgeCheck className="text-emerald-600" size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold">{label}</h4>
                                    <p className="text-sm text-gray-600">{desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="pt-10 border-t border-gray-300 mt-10 flex flex-col gap-2">
                        <Link href={`/book-trip/${trip.id}`} className=''>
                            <Button className="w-full bg-neutral-950 rounded-4xl py-7 cursor-pointer">Book Your Trip Now</Button>
                        </Link>

                        <Link href={'/plan-trip'}>
                            <Button className="w-full bg-neutral-100 rounded-4xl py-7 cursor-pointer text-black">Customize this trip</Button>
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default TripContent;