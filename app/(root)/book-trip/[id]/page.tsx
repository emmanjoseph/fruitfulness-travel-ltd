import type { Metadata } from "next";
import DestinationsHero from "@/components/sections/destinations-hero";
import Footer from "@/components/sections/Footer";
import BookTripClient from "@/components/book-trip-client";
import { fetchJourneyById } from "@/lib/api";
import type { Destination } from "@/components/sections/destinations";

const tripname = "kenya safari"


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
                title: "Book Your Safari",
                description:
                    "Submit a booking request for your selected East African safari journey.",
            };
        }

        return {
            title: `Book ${trip.name}`,
            description: `Submit a booking request for ${trip.name} with Fruitfulness Travel Limited.`,
        };
    } catch {
        return {
            title: "Book Your Safari",
            description:
                "Submit a booking request for your selected East African safari journey.",
        };
    }
}

const Page = async ({ params }: PageProps) => {
    const { id } = await params;
    console.log(id);
    return (
        <section className={''}>
            <DestinationsHero
             title={'Apply your booking request for'}
             subtitle={`${tripname}`}
            />

            <BookTripClient tripId={id}/>
            <Footer/>
        </section>
    )
}
export default Page
