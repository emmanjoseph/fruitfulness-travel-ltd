import type { Metadata } from "next";
import { fetchJourneyById, fetchRelatedJourneys } from "@/lib/api";
import TripHero from "@/components/sections/trip-hero";
import TripContent from "@/components/sections/trip-content";
import { TripCarousel } from "@/components/sections/trip-carousel";
import Footer from "@/components/sections/Footer";
import { notFound } from "next/navigation";
import type { Destination } from "@/components/sections/destinations";

interface PageProps {
    params: Promise<{ id: string }>;
}

const getTripFromResponse = (
    response: Destination | { data?: Destination }
): Destination | undefined => {
    if ("data" in response && response.data) {
        return response.data;
    }

    return "id" in response && "name" in response ? response : undefined;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;

    try {
        const response = await fetchJourneyById(id);
        const trip = getTripFromResponse(response);

        if (!trip) {
            return {
                title: "Journey Not Found",
            };
        }

        return {
            title: trip.name,
            description: trip.description,
            openGraph: {
                title: trip.name,
                description: trip.description,
                images: trip.imgUrl ? [{ url: trip.imgUrl, alt: trip.name }] : undefined,
            },
        };
    } catch {
        return {
            title: "Safari Journey",
            description:
                "Explore a curated East African safari journey with Fruitfulness Travel Limited.",
        };
    }
}

const Page = async ({ params }: PageProps) => {
    const { id } = await params;

    try {
        // console.log(`Fetching journey for ID: ${id}`);
        const response = await fetchJourneyById(id);
        // console.log(`Response for ID ${id}:`, response);
        const trip = getTripFromResponse(response); // Handle both {data: ...} and direct object response

        if (!trip) {
            return notFound();
        }

        const relatedResponse = await fetchRelatedJourneys(id);
        const relatedTrips: Destination[] = relatedResponse.data || [];

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
    } catch (error) {
        console.error("Error loading trip details:", error);
        return notFound();
    }
}

export default Page
