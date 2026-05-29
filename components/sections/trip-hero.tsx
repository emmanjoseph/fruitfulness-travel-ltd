"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavbar } from "@/hooks/use-navbar";
import { StarIcon, MapPinIcon, ClockIcon, GlobeIcon } from "lucide-react";
import { Destination } from "@/components/sections/destinations";

gsap.registerPlugin(ScrollTrigger);

interface TripHeroProps {
  trip: Destination;
}

const TripHero = ({ trip }: TripHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const { setIsDark } = useNavbar();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        imageRef.current,
        { scale: 1.2, filter: "brightness(0.3)" },
        { scale: 1, filter: "brightness(0.6)", duration: 2 }
      )
        .fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 },
          "-=1"
        )
        .fromTo(
          statsRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.1 },
          "-=0.5"
        );

      // Parallax Effect
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Navbar Color Toggle
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom 80px",
        onEnter: () => setIsDark(true),
        onEnterBack: () => setIsDark(true),
        onLeave: () => setIsDark(false),
        onLeaveBack: () => setIsDark(false),
      });
    });

    return () => {
      ctx.revert();
      setIsDark(false);
    };
  }, [setIsDark]);

  return (
    <section
      ref={containerRef}
      className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center text-white"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          src={trip.imgUrl}
          alt={trip.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1 rounded-full mb-6 border border-white/20">
          <GlobeIcon size={14} className="text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-widest">{trip.country}</span>
        </div>

        <h1
          ref={titleRef}
          className="text-5xl md:text-6xl font-pangaia font-extrabold mb-8 tracking-tight"
        >
          {trip.name}
        </h1>

        <div
          ref={statsRef}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-12"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 mb-1">
              <span className="text-2xl font-bold font-pangaia">{trip.rating}</span>
              <StarIcon className="fill-yellow-400 text-yellow-400" size={20} />
            </div>
            <span className="text-xs uppercase tracking-widest text-white/60 font-bold">Rating</span>
          </div>

          <div className="h-10 w-[1px] bg-white/20 hidden md:block" />

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <ClockIcon size={20} className="text-emerald-400" />
              <span className="text-2xl font-bold font-pangaia">{trip.numberOfDays}</span>
            </div>
            <span className="text-xs uppercase tracking-widest text-white/60 font-bold">Days</span>
          </div>

          <div className="h-10 w-[1px] bg-white/20 hidden md:block" />

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-1">
              <MapPinIcon size={20} className="text-emerald-400" />
              <span className="text-2xl font-bold font-pangaia">Explore</span>
            </div>
            <span className="text-xs uppercase tracking-widest text-white/60 font-bold">{trip.location}</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white to-transparent mx-auto" />
      </div>
    </section>
  );
};

export default TripHero;
