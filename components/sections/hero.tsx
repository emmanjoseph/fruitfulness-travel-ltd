"use client"

import React, { useLayoutEffect, useRef } from 'react'
import {ArrowDown} from "lucide-react";
import Link from "next/link";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavbar } from "@/hooks/use-navbar";
import {AnimatedTooltip} from "@/components/ui/animated-tooltip";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const { setIsDark } = useNavbar();
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const scrollTextRef = useRef<HTMLHeadingElement>(null);

    const people = [
        {
            id: 1,
            name: "John Doe",
            designation: "Software Engineer",
            image:
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        },
        {
            id: 2,
            name: "Robert Johnson",
            designation: "Product Manager",
            image:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 3,
            name: "Jane Smith",
            designation: "Data Scientist",
            image:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 4,
            name: "Emily Davis",
            designation: "UX Designer",
            image:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 5,
            name: "Tyler Durden",
            designation: "Soap Developer",
            image:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
        },
        {
            id: 6,
            name: "Dora",
            designation: "The Explorer",
            image:
                "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
        },
    ];

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance Animation
            const tl = gsap.timeline({
                defaults: { ease: "power3.out", duration: 1.2 }
            });

            tl.from(headingRef.current, {
                y: 50,
                opacity: 0,
                stagger: 0.2
            })
            .from(lineRef.current, {
                scaleX: 0,
                transformOrigin: "left center",
            }, "-=0.8")
            .from(paragraphRef.current, {
                y: 30,
                opacity: 0,
            }, "-=0.6");

            // Parallax Animation for Video
            gsap.to(videoRef.current, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: videoContainerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Horizontal Scroll Text Animation
            gsap.fromTo(scrollTextRef.current,
                { x: "100%" },
                {
                    x: "-100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: videoContainerRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                }
            );

            // Navbar color change trigger for Video section
            ScrollTrigger.create({
                trigger: videoContainerRef.current,
                start: "top 80px",
                end: "bottom 80px",
                onEnter: () => setIsDark(true),
                onLeave: () => setIsDark(false),
                onEnterBack: () => setIsDark(true),
                onLeaveBack: () => setIsDark(false),
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={'text-gray-800 overflow-hidden'}>
            <div className="container mx-auto px-4 py-34 space-y-5">
                <h1 ref={headingRef} className="text-5xl lg:text-8xl font-bold capitalize font-pangaia">
                    Experience Safaris <br/>
                    like never before
                </h1>

                <div ref={lineRef} className="border border-gray-600"/>
                <div className="flex gap-4 flex-col md:flex-row items-center justify-between">
                    <p ref={paragraphRef} className={'text-gray-600 text-xl max-w-2xl'}>
                        We create immersive traveling experiences. Dive into cultures, uncover local secrets and build journeys to match your style, pace and passion for exploration.
                    </p>

                    <div className="flex gap-4 items-center justify-center">
                        <Link href={'#destinations'}>
                            <ArrowDown size={40} className={'text-gray-800 animate-bounce'}/>
                        </Link>
                        <div className="flex flex-row items-center justify-center w-full">
                            <AnimatedTooltip items={people} />
                        </div>

                    </div>



                </div>


            </div>

            <div ref={videoContainerRef} className={'relative h-[60vh] lg:h-[90vh] overflow-hidden'}>
                <div className="absolute top-[-10%] left-0 w-full h-[120%]">
                    <video
                        ref={videoRef}
                        src={'/hero-bg.mp4'}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={'w-full h-full object-cover'}
                    />
                </div>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none w-full h-full bg-linear-to-t from-black/60 to-transparent">
                    <h1
                        ref={scrollTextRef}
                        className="text-white text-7xl lg:text-[12rem] font-bold whitespace-nowrap opacity-90 font-pangaia uppercase"
                    >
                        We dont just craft journeys , we craft the whole experience
                    </h1>
                </div>
            </div>


        </div>
    )
}
export default Hero
