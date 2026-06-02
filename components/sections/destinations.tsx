import React from 'react'
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import {fetchJourneys} from "@/lib/api";
import {TripCarousel} from "@/components/sections/trip-carousel";

export type Destination = {
    id: string;
    country: string;
    name: string;
    imgUrl: string;
    location: string;
    numberOfDays: string;
    description: string;
    activities: string[];
    tags: string[];
    rating: number;
    href?: string;
};

const Destinations = async () => {
    const trips: Destination[] = await fetchJourneys();
    // console.log(trips);

    return (
        <div className={'px-4 py-16'} id={'destinations'}>
            <div className="container mx-auto flex items-center justify-between">
                <h1 className={'text-2xl md:text-3xl font-pangaia font-extrabold'}>Explore Latest Destinations</h1>

                <Link href={'/destinations'} className={'hover-link-effect'}>
                    <p className="flex items-center space-x-2 text-xl"> View All
                        <ArrowUpRight size={20}/></p>
                </Link>
            </div>
            {
                trips ? (
                    <TripCarousel trips={trips} />
                    
                ):(
                    <div>There are no journeys available</div>
                )
            }
        </div>
    )
}
export default Destinations
