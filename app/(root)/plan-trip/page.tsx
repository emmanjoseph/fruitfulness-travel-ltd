import type { Metadata } from "next";
import Footer from "@/components/sections/Footer";
import CustomTripStepper from "@/components/plan-trip";
import VideoHero from "@/components/video-hero";

export const metadata: Metadata = {
    title: "Customize Your Trip",
    description:
        "Build a personalized East African itinerary with Fruitfulness Travel Limited's custom trip planner.",
};

const Page = () => {
    return (
        <section>
            <VideoHero
                video={{
                    imageUrl:"https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8a2F5YWt8ZW58MHx8MHx8fDA%3D",
                    title:" Customize your trip ",
                    subtitle:"Build your dream trip"
                }}
            />
            <CustomTripStepper/>

            <Footer/>
        </section>
    )
}
export default Page
