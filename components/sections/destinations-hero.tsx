"use client"

import React, { useLayoutEffect, useRef } from 'react'
import {ArrowDown} from "lucide-react";
import Link from "next/link";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface DestinationsHeroProps {
    title?: string;
    subtitle?: string;
}

const DestinationsHero = ({ 
    title = "Experience Safaris like never before", 
    subtitle = "We create immersive traveling experiences. Dive into cultures, uncover local secrets and build journeys to match your style, pace and passion for exploration." 
}: DestinationsHeroProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);

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

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={'text-gray-800 overflow-hidden'}>
            <div className="container mx-auto px-4 pt-36 pb-20 space-y-5">
                <h1 ref={headingRef} className="text-5xl lg:text-8xl font-bold capitalize font-pangaia">
                    {title.split(' ').map((word, i) => (
                        <React.Fragment key={i}>
                            {word}{' '}
                            {i === 1 && <br/>}
                        </React.Fragment>
                    ))}
                </h1>

                <div ref={lineRef} className="border border-gray-600"/>
                <div className="flex items-center justify-between">
                    <p ref={paragraphRef} className={'text-gray-600 text-xl max-w-2xl'}>
                        {subtitle}
                    </p>

                    <Link href={'#journeys'}>
                        <ArrowDown size={40} className={'text-gray-800 animate-bounce'}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DestinationsHero
