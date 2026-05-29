"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  rating?: number;
}

interface InfiniteMovingCardsProps {
  items: Testimonial[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: InfiniteMovingCardsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    // Clone items for infinite effect
    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      if (scrollerRef.current) {
        scrollerRef.current.appendChild(duplicatedItem);
      }
    });

    const scroller = scrollerRef.current;
    const scrollWidth = scroller.offsetWidth;
    const duration = speed === "fast" ? 20 : speed === "normal" ? 40 : 80;

    const animation = gsap.to(scroller, {
      x: direction === "left" ? `-50%` : `0%`,
      ease: "none",
      duration: duration,
      repeat: -1,
      onReverseComplete: () => {
         animation.totalTime(animation.rawTime() + animation.duration() * 100);
      }
    });
    
    if (direction === "right") {
        gsap.set(scroller, { x: "-50%" });
        animation.vars.x = "0%";
        animation.invalidate().restart();
    }

    if (pauseOnHover) {
      containerRef.current.addEventListener("mouseenter", () => animation.pause());
      containerRef.current.addEventListener("mouseleave", () => animation.play());
    }

    return () => {
      animation.kill();
    };
  }, [direction, speed, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4 py-1 w-max flex-nowrap"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative rounded-2xl border border-zinc-100 flex-shrink-0 bg-white px-8 py-6 md:w-[450px]"
            key={item.name + idx}
          >
            <blockquote className="flex flex-col h-full justify-between">
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <div className="relative z-20 flex flex-row items-center mb-4">
                 {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                 ))}
              </div>
              <span className="relative z-20 text-sm leading-[1.6] text-zinc-700 font-normal">
                "{item.quote}"
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className="text-sm leading-[1.6] text-zinc-900 font-bold">
                    {item.name}
                  </span>
                  <span className="text-sm leading-[1.6] text-zinc-500 font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
