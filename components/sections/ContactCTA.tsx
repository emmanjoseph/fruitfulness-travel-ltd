"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {ArrowUpRight} from "lucide-react";
import { useNavbar } from "@/hooks/use-navbar";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

const ContactCTA =() => {
    const { setIsDark } = useNavbar();
    const sectionRef = useRef(null)
    const line1Ref = useRef(null)
    const line2Ref = useRef(null)
    const line3Ref = useRef(null)
    const ctaRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                },
            })

            tl.fromTo(line1Ref.current,
                { y: 80, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
            )
                .fromTo(line2Ref.current,
                    { y: 80, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
                    "-=0.65"
                )
                .fromTo(line3Ref.current,
                    { y: 80, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
                    "-=0.65"
                )
                .fromTo(ctaRef.current,
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
                    "-=0.4"
                )

            // Navbar color change trigger
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top 80px",
                end: "bottom 80px",
                onEnter: () => setIsDark(true),
                onLeave: () => setIsDark(false),
                onEnterBack: () => setIsDark(true),
                onLeaveBack: () => setIsDark(false),
            });
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen bg-neutral-950 flex flex-col justify-between px-6 md:px-14 pt-10 pb-8 overflow-hidden"
        >
            {/* Subtle grain texture */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "128px 128px",
                }}
            />


            {/* Headline — staggered layout */}
            <div className="flex-1 flex flex-col justify-center -mt-8 select-none">
                <div className="overflow-hidden">
                    <p
                        ref={line1Ref}
                        className="font-sans font-black uppercase text-[#E8E4D4] leading-[0.88] tracking-[-0.02em]"
                        style={{ fontSize: "clamp(4rem, 14vw, 13rem)", textIndent: "30%" }}
                    >
                        WITNESS
                    </p>
                </div>

                <div className="overflow-hidden">
                    <p
                        ref={line2Ref}
                        className="font-sans font-black uppercase text-[#E8E4D4] leading-[0.88] tracking-[-0.02em]"
                        style={{ fontSize: "clamp(4rem, 14vw, 13rem)" }}
                    >
                        THE WILD
                    </p>
                </div>

                <div className="overflow-hidden">
                    <p
                        ref={line3Ref}
                        className="font-serif italic font-bold uppercase text-right leading-[0.88] tracking-[-0.02em]"
                        style={{
                            fontSize: "clamp(4rem, 14vw, 13rem)",
                            color: "#C8E032",
                        }}
                    >
                        AWAKEN.
                    </p>
                </div>

                {/* CTA */}
                <div ref={ctaRef} className="flex flex-col justify-center mt-14 md:mt-20">
                    <p className={'text-white max-w-lg text-lg py-4'}>
                        Our team of travel experts is here to help you plan your dream trip. Whether you have questions or need assistance with booking, we’re just a message away
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-16 mt-6">
                        <button className="hover-link-effect text-emerald-500 ">
                            <p className="text-[15px] flex items-center gap-2">
                                 <span className="font-semibold text-xl tracking-wide">
                            Customize your experience
                        </span>
                                <span className="size-10 rounded-full">
                                <ArrowUpRight />
                            </span>
                            </p>


                        </button>
                        <button className="hover-link-effect text-white">
                            <p className="text-[15px] flex items-center gap-2">
                                 <span className="font-semibold text-xl tracking-wide">
                            Contact Us
                        </span>
                                <span className="size-10 rounded-full">
                                <ArrowUpRight />
                            </span>
                            </p>
                        </button>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default ContactCTA