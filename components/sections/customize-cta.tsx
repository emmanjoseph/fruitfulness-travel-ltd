"use client"

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Settings2, Sparkles, Map, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useNavbar } from "@/hooks/use-navbar"
import {IconArrowUpRight} from "@tabler/icons-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const CustomizeCta = () => {
    const { setIsDark } = useNavbar();
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none none"
                }
            });

            tl.from(headingRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })
            .from(lineRef.current, {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1,
                ease: "power3.inOut"
            }, "-=0.6")
            .from(gridRef.current?.children || [], {
                y: 30,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.4");

            // Navbar color change
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 80px",
                end: "bottom 80px",
                onEnter: () => setIsDark(true),
                onLeave: () => setIsDark(false),
                onEnterBack: () => setIsDark(true),
                onLeaveBack: () => setIsDark(false),
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [setIsDark]);

    const features = [
        {
            icon: <Map className="w-6 h-6" />,
            title: "Choose Destinations",
            description: "Describe any location across Kenya, Tanzania, and Uganda."
        },
        {
            icon: <Calendar className="w-6 h-6" />,
            title: "Set Your Pace",
            description: "From fast-paced adventures to slow-living retreats, you decide the tempo."
        },
        {
            icon: <Settings2 className="w-6 h-6" />,
            title: "Personal Preferences",
            description: "Dietary needs, photography focus, or luxury level—we tailor every detail."
        },
        {
            icon: <Sparkles className="w-6 h-6" />,
            title: "Unique Add-ons",
            description: "Hot air balloon safaris, private dinners, or local village visits."
        }
    ];

    return (
        <section ref={sectionRef} className="bg-neutral-950 py-32 px-6 md:px-14 text-gray-100 overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-emerald-950/20 to-transparent pointer-events-none" />
            
            <div ref={containerRef} className="container mx-auto relative z-10">
                <div className={'grid grid-cols-1 md:grid-cols-2 gap-12 items-center'}>
                    <div className="">
                        <h2 ref={headingRef} className="text-5xl md:text-7xl font-pangaia font-bold mb-8 leading-tight">
                            Your Safari, <br/>
                            <span className="text-emerald-500 font-grotesque italic lowercase font-light ">Your Way</span>
                        </h2>

                        <Link href={'/plan-trip'} className={'hover-link-effect font-grotesque'}>
                            <p className={'font-semibold text-2xl flex flex-row items-center space-x-2'}>Customize your own experiece
                              <IconArrowUpRight className={'w-6 h-6'}/>
                            </p>

                        </Link>

                    </div>


                    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 group-hover:border-emerald-500/50 transition-colors">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2 font-pangaia">{feature.title}</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CustomizeCta
