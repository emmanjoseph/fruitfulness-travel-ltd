"use client";

import { useLayoutEffect, useRef } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import Link from "next/link";
import {ArrowRightIcon} from "lucide-react";

export default function Page() {
    const containerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: {
                    ease: "power3.out",
                },
            });

            tl.from(".success-animation", {
                scale: 0.8,
                opacity: 0,
                duration: 0.8,
            })
                .from(
                    ".success-title",
                    {
                        y: 40,
                        opacity: 0,
                        duration: 0.8,
                    },
                    "-=0.3"
                )
                .from(
                    ".success-text",
                    {
                        y: 25,
                        opacity: 0,
                        stagger: 0.15,
                        duration: 0.6,
                    },
                    "-=0.4"
                )
                .from(
                    ".success-actions",
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.5,
                    },
                    "-=0.2"
                );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen overflow-hidden bg-white"
        >
            {/* Lottie Background */}
            <div className="success-animation absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full max-w-3xl">
                    <DotLottieReact
                        src="/success.json"
                        autoplay
                    />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
                <div className="max-w-3xl text-center space-y-6">
                    <h1 className="success-title font-pangaia font-bold text-4xl md:text-6xl text-emerald-700">
                        Your Booking Request
                        <br />
                        Has Been Received
                    </h1>

                    <p className="success-text text-lg md:text-xl text-gray-700 leading-relaxed">

                    </p>

                    <p className="success-text text-gray-600">
                        Thank you for submitting your travel request. Our team is now
                        reviewing the details and preparing a personalized response for
                        you.
                        {'  '}
                        A confirmation email has been sent to your inbox with a summary of
                        your request. Please check your spam or junk folder if you do not
                        see it within a few minutes.
                    </p>

                    <p className="success-text font-medium text-emerald-700">
                        We look forward to helping you plan an unforgettable journey.
                    </p>

                    <div className="success-actions flex flex-col sm:flex-row items-center justify-center gap-7 pt-4">
                        <Link
                            href="/"
                            className="font-semibold  text-emerald-700 hover:text-emerald-900 transition-colors hover-link-effect"
                        >
                           <p className={'flex items-center space-x-2'}>
                              <span>Back to Homepage</span>
                               <ArrowRightIcon className="h-4 w-4" />
                           </p>

                        </Link>

                        <Link
                            href="/destinations"
                            className="text-gray-600 hover:text-gray-800 transition-colors font-medium hover-link-effect"
                        >
                            <p className={'flex items-center space-x-2'}>
                                <span>Discover more destinations</span>
                                <ArrowRightIcon className="h-4 w-4" />
                            </p>

                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}