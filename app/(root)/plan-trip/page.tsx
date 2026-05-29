import React from 'react'
import Footer from "@/components/sections/Footer";
import CustomTripStepper from "@/components/plan-trip";
import DestinationsHero from "@/components/sections/destinations-hero";

const Page = () => {
    return (
        <section>
            <DestinationsHero
              title={'Plan your trip with us'}
              subtitle={'Choose your destination, dates, and get personalized recommendations.'}
            />
            <CustomTripStepper/>

            <Footer/>
        </section>
    )
}
export default Page
