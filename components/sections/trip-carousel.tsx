"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconStarFilled } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Destination } from "./destinations";

interface TripCarouselProps {
  trips: Destination[];
}

export const TripCarousel = ({ trips }: TripCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for subpixel rounding issues
    }
  };

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [trips]);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth [scrollbar-width:none] py-5"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className="flex flex-row justify-start gap-2 px-3 md:px-0 container mx-auto">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Previous trip"
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Next trip"
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TripCard = ({ trip }: { trip: Destination }) => {
  return (
    <Link 
      href={trip.href || `/destinations/${trip.id}`}
      className="group relative flex h-[25rem] w-80 flex-col overflow-hidden rounded-[40px] bg-gray-100 md:h-[30rem] md:w-96 shrink-0 shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      <Image
        src={trip.imgUrl}
        alt={trip.name}
        fill
        className="absolute inset-0 z-0 object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 384px"
      />

      <div className="relative z-20 flex h-full flex-col justify-end p-6 text-white">
        <div className="flex items-center justify-between mb-2">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                {trip.country}
            </span>
            <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                <IconStarFilled className="h-3 w-3 text-yellow-400" />
                <span className="text-xs font-bold">{trip.rating}</span>
            </div>
        </div>

        <h3 className="text-2xl font-bold md:text-3xl mb-2 font-pangaia group-hover:translate-x-1 transition-transform">
          {trip.name}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-gray-200 mb-3">
            <span>{trip.location}</span>
            <span>•</span>
            <span>{trip.numberOfDays} Days</span>
        </div>

        <p className="line-clamp-2 text-sm text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {trip.description}
        </p>

        <div className="flex flex-wrap gap-2">
            {trip.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[10px] bg-white/10 px-2 py-0.5 rounded-md">
                    #{tag}
                </span>
            ))}
        </div>
      </div>
    </Link>
  );
};
