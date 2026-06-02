import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import Discover from "@/components/sections/discover";
import Destinations from "@/components/sections/destinations";
import Reasons from "@/components/sections/reasons";
import Faq from "@/components/sections/faq";
import Testimonials from "@/components/sections/testimonials";
import ContactCta from "@/components/sections/ContactCTA";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
    title: "Kenya and Tanzania Safari Tours",
    description:
        "Explore fruitful East African journeys with custom Kenya and Tanzania safaris, wildlife tours, cultural experiences, and beach escapes.",
};

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
