"use client"
import React, { useLayoutEffect, useRef } from 'react'
import { useNavbar } from "@/hooks/use-navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface VideoHeroProps {
    imageUrl:string,
    title:string,
    subtitle:string,
}

const VideoHero = ({video}:{video:VideoHeroProps}) => {
    const { setIsDark } = useNavbar();
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 80px",
                end: "bottom 80px",
                onEnter: () => setIsDark(true),
                onLeave: () => setIsDark(false),
                onEnterBack: () => setIsDark(true),
                onLeaveBack: () => setIsDark(false),
            });

            // Cool scrub animation for image
            gsap.fromTo(imageRef.current,
                { scale: 1.2, yPercent: -10 },
                {
                    scale: 1,
                    yPercent: 10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                }
            );
        });
        return () => ctx.revert();
    }, [setIsDark]);

    return (
        <div ref={containerRef} className={'h-[60vh] w-full relative overflow-hidden'}>
            <div ref={imageRef} className="absolute inset-0 w-full h-full">
                <Image 
                    src={video.imageUrl} 
                    alt={video.title}
                    fill
                    className={'object-cover'}
                    priority
                    sizes="100vw"
                />
            </div>
            <div className={'absolute inset-0 flex flex-col items-start justify-end bg-linear-to-t from-white via-transparent to-black/60 py-8 text-white'}>
                <div className="container mx-auto px-4 text-neutral-800">
                    <h1 className={'text-4xl md:text-5xl font-extrabold font-pangaia '}>
                        {video.title}
                    </h1>
                    <p className={'text-xl md:text-2xl font-medium'}>
                        {video.subtitle}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default VideoHero
