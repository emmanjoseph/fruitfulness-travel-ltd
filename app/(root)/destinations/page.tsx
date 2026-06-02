import type { Metadata } from "next";
import FiltersBar from "@/components/filters-bar";
import {getAllTrips} from "@/lib/api";
import TripsGrid from "@/components/trips-grid";
import Footer from "@/components/sections/Footer";
import ContactCTA from "@/components/sections/ContactCTA";
import Pagination from "@/components/pagination";
import DestinationsHero from "@/components/sections/destinations-hero";
import Faq from "@/components/sections/faq";

export const metadata: Metadata = {
    title: "Safari Destinations",
    description:
        "Browse curated safari journeys across Kenya and Tanzania, with filters for country and experience style.",
};

export type Props = {
    searchParams: Promise<{
        page?: string;
        tags?: string;
        category?: string;
        country?: string;
        q?: string;

    }>;
};

const Page = async ({ searchParams }: Props) => {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const trips = await getAllTrips({
        page,
        limit: 12,
        tags: params.category || params.tags,
        country: params.country,
    });

    const tripsMetadata = await getAllTrips({
        page,
        limit: 8,
        tags: params.category || params.tags,
        country: params.country,
        search: params.q,
    });

    return (
        <section>
            <DestinationsHero
                title="All Destinations"
            />


            <div id="journeys" className="py-16 px-4 container mx-auto space-y-8">
                <FiltersBar
                    title="Our Journeys"
                    description="Filter by country or category to find your perfect adventure."
                    basePath="/destinations"
                    showCountryFilter={true}
                />

                <TripsGrid trips={trips.data} />
                <Pagination
                    currentPage={page}
                    totalPages={tripsMetadata.meta.totalPages}
                    basePath="/destinations"
                />
            </div>
            <Faq/>
            <ContactCTA/>

            <Footer />
        </section>
    )
}
export default Page
