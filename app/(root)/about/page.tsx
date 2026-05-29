"use client"

import React, { useLayoutEffect, useRef } from 'react'
import DestinationsHero from "@/components/sections/destinations-hero";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContactCTA from "@/components/sections/ContactCTA";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageSectionRef = useRef<HTMLDivElement>(null);
    const mainImageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Text fade-in and slide-up
            if (textRef.current) {
                gsap.from(textRef.current.children, {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                    }
                });
            }

            // Apple-style image zoom animation
            if (mainImageRef.current) {
                gsap.fromTo(mainImageRef.current, 
                    { scale: 1.2, filter: "brightness(0.7)" },
                    {
                        scale: 1,
                        filter: "brightness(1)",
                        ease: "none",
                        scrollTrigger: {
                            trigger: imageSectionRef.current,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );
            }

            // Secondary images staggered entrance
            const sideImages = gsap.utils.toArray<HTMLElement>('.side-image');
            sideImages.forEach((img, i) => {
                gsap.from(img, {
                    x: i % 2 === 0 ? -50 : 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: img,
                        start: "top 90%",
                    }
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-white">
            <DestinationsHero
                title="About Us"
                subtitle={'The name Fruitfulness Travel reflects our philosophy. We believe that every journey should bear fruit;—whether its the fruit of knowledge, new friendships, personal growth, or a deeper understanding of the world.'}
            />

            {/* Content Section */}
            <div ref={textRef} className="max-w-4xl mx-auto px-4 py-24 space-y-12">
                <p className="text-2xl md:text-3xl font-pangaia text-gray-800 leading-relaxed italic border-l-4 border-emerald-600 pl-8">
                    &quot;We believe that the best journeys aren&apos;t measured in miles, but in moments.&quot;
                </p>

                <div className="space-y-8 text-lg text-gray-600 leading-relaxed">
                    <p>
                        Fruitfulness Travel was founded on a simple, yet powerful idea: that travel
                        should be a deeply rewarding and enriching experience. The name itself is our
                        promise to you. We&lsquo;re dedicated to cultivating journeys that bear fruit—the
                        fruit of newfound knowledge, lasting memories, and meaningful connections.
                    </p>

                    <p>
                        In a world of generic tours, we stand for something different. Our mission is to
                        go beyond the usual tourist trail to curate authentic, immersive, and
                        transformative experiences. We don&lsquo;t just show you a place; we help you
                        connect with its culture, its people, and its spirit.
                    </p>

                    <p>
                        Our team of expert travelers and guides are passionate about sharing the world
                        in a way that truly enriches your life. Whether you&apos;re seeking a serene escape,
                        an adventurous expedition, or a cultural deep dive, we&apos;ll design a journey that
                        is truly fruitful. We also collaborate closely with other partners to ensure every 
                        aspect of your travel experience is meaningful and impactful including <Link
                            className='font-semibold text-emerald-700 hover:underline transition-all'
                            href={'https://www.safaribookings.com/p7831'}>SafariBookings.com</Link>
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-10 space-y-3">
                <div className="grid md:grid-cols-2 gap-2">
                    <Image src={'https://images.unsplash.com/photo-1623745493572-ef78d94249f3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGtlbnlhfGVufDB8fDB8fHww'} alt={'img1'} width={500} height={500} className={'w-full h-full object-cover rounded-4xl'} />
                    <Image src={'https://images.unsplash.com/photo-1535683658347-f1a78e164b40?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGtlbnlhfGVufDB8fDB8fHww'} alt={'img1'} width={500} height={500} className={'w-full h-full object-cover rounded-4xl'} />
                </div>

                <div className="">
                    <video src="/hero-bg.mp4" autoPlay loop muted className="w-full h-full object-cover rounded-4xl" />
                </div>
            </div>

            <ContactCTA/>



        </div>
    )
}

export default AboutPage
