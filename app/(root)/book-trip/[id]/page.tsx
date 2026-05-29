import React from 'react'
import DestinationsHero from "@/components/sections/destinations-hero";
import Footer from "@/components/sections/Footer";
import BookTripClient from "@/components/book-trip-client";

const tripname = "kenya safari"
const Page = () => {
    return (
        <section className={''}>
            <DestinationsHero
             title={'Apply your booking request for'}
             subtitle={`${tripname}`}
            />

            <BookTripClient/>
            <Footer/>
        </section>
    )
}
export default Page
