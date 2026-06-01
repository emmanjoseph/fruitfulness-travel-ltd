import React from 'react'
import DestinationsHero from "@/components/sections/destinations-hero";
import Footer from "@/components/sections/Footer";
import BookTripClient from "@/components/book-trip-client";

const tripname = "kenya safari"


interface PageProps {
    params: Promise<{ id: string }>;
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
