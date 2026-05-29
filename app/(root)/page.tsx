import React from 'react'
import Hero from "@/components/sections/hero";
import Discover from "@/components/sections/discover";
import Destinations from "@/components/sections/destinations";
import Reasons from "@/components/sections/reasons";
import Faq from "@/components/sections/faq";
import Testimonials from "@/components/sections/testimonials";
import PexelsGallery from "@/components/sections/pexels-gallery";
import ContactCta from "@/components/sections/ContactCTA";
import CustomizeCta from "@/components/sections/customize-cta";
import Footer from "@/components/sections/Footer";

const Page = () => {
    return (
        <main className={'font-grotesque'}>
            <Hero/>
            <Discover/>
            <Destinations/>
            <Reasons/>
            <Faq/>
            <Testimonials/>
            <ContactCta/>
            <Footer/>
        </main>
    )
}
export default Page
