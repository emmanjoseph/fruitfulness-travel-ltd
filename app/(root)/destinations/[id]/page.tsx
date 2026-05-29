import React from 'react'
import { fetchJourneyById, fetchRelatedJourneys } from "@/lib/api";
import TripHero from "@/components/sections/trip-hero";
import TripContent from "@/components/sections/trip-content";
import BookingForm from "@/components/sections/booking-form";
import { TripCarousel } from "@/components/sections/trip-carousel";
import Footer from "@/components/sections/Footer";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

const Page = async ({ params }: PageProps) => {
    const { id } = await params;

    let trip;
    let relatedTrips = [];

    try {
        // console.log(`Fetching journey for ID: ${id}`);
        const response = await fetchJourneyById(id);
        // console.log(`Response for ID ${id}:`, response);
        trip = response.data || response; // Handle both {data: ...} and direct object response

        if (!trip) {
            return notFound();
        }

        const relatedResponse = await fetchRelatedJourneys(id);
        relatedTrips = relatedResponse.data || [];
    } catch (error) {
        console.error("Error loading trip details:", error);
        return notFound();
    }

    return (
        <section className="bg-white">
            <TripHero trip={trip} />

            <TripContent trip={trip} />

            {relatedTrips.length > 0 && (
                <div className="py-20 bg-gray-50/50">
                    <div className="container mx-auto px-4 mb-12">
                        <h2 className="text-3xl md:text-5xl font-pangaia font-extrabold">Related Journeys</h2>
                        <p className="text-gray-600 mt-4 text-lg">Explore more experiences similar to {trip.name}</p>
                    </div>
                    <TripCarousel trips={relatedTrips} />
                </div>
            )}

            <Footer />
        </section>
    )
}

export default Page
