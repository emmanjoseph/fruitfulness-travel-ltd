"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { InfiniteMovingCards, Testimonial } from "@/components/ui/infinite-moving-cards";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonials: Testimonial[] = [
    {
        quote: "The safari was beyond my wildest dreams. Seeing the Great Migration up close was a life-changing experience. Every detail was perfectly handled.",
        name: "Emmanuel Mulwa",
        title: "Wildlife Photographer",
        rating: 5,
    },
    {
        quote: "Excellence from start to finish. Our guide was incredibly knowledgeable and found animals we would have never spotted on our own.",
        name: "Felix Oginga",
        title: "Travel Blogger",
        rating: 5,
    },
    {
        quote: "A perfect blend of luxury and adventure. The camps were stunning, and the sunset game drives were the highlight of our honeymoon.",
        name: "Emma & David",
        title: "Honeymooners",
        rating: 5,
    },
    {
        quote: "Professional, safe, and utterly breathtaking. I've been on many safaris, but this one stood out for its commitment to conservation.",
        name: "Ferdinand Muthui",
        title: "Conservationist",
        rating: 4,
    },
    {
        quote: "The best family vacation we've ever had. The kids were engaged every second, and they've already asked when we're going back!",
        name: "The Thompson Family",
        title: "Family Travelers",
        rating: 5,
    },
];

const Testimonials = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 80%",
                }
            });

            gsap.from(".testimonial-scroller", {
                opacity: 0,
                y: 30,
                duration: 1,
                delay: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".testimonial-scroller",
                    start: "top 85%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-zinc-50/50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div ref={headerRef} className="max-w-md mx-auto mb-5">
                    <h2 className="font-pangaia text-4xl md:text-5xl text-center font-bold tracking-tight text-zinc-900 mb-6">
                        Voices from the <span className="text-zinc-500 italic">Wild</span>
                    </h2>
                    <p className="text-lg text-zinc-600 text-center">
                        Don't just take our word for it. Hear from those who have journeyed into the heart of the savannah with us.
                    </p>
                </div>

                <div className="testimonial-scroller">
                    <InfiniteMovingCards
                        items={testimonials}
                        direction="left"
                        speed="normal"
                    />
                </div>
                
                <div className="testimonial-scroller">
                    <InfiniteMovingCards
                        items={[...testimonials].reverse()}
                        direction="right"
                        speed="normal"
                    />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
