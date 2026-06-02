import type { Metadata } from "next";
import VideoHero from "@/components/video-hero";
import PexelsGallery from "@/components/sections/pexels-gallery";
import FiltersBar from "@/components/filters-bar";
import {getAllTrips} from "@/lib/api";
import TripsGrid from "@/components/trips-grid";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import { kenyanfaq} from "@/lib";
import Footer from "@/components/sections/Footer";
import CustomizeCta from "@/components/sections/customize-cta";

export const metadata: Metadata = {
    title: "Kenya Safari Tours",
    description:
        "Plan a Kenya safari through the Maasai Mara, Amboseli, Tsavo, Samburu, Nairobi, and the Indian Ocean coast.",
};

export type Props = {
    searchParams: Promise<{
        page?: string;
        tags?: string;
        category?: string;
    }>;
};


const Page = async ({ searchParams }: Props) => {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    const trips = await getAllTrips({
        page,
        limit: 8,
        tags: params.category || params.tags,
        country: "kenya",
    });
    return (
        <section>
            <VideoHero
              video={{
                   imageUrl:"https://plus.unsplash.com/premium_photo-1661929528595-7010c17acddd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGtlbnlhfGVufDB8fDB8fHww",
                   title:"Magical Kenya ",
                   subtitle:"Discover the beauty of Kenya"
               }}
            />

            <PexelsGallery/>


            <div className="py-10 px-4 max-w-4xl mx-auto space-y-8">
                <p className={'text-base md:text-xl text-gray-600'}>Kenya is where the African safari was born. From the vast golden savannas of the Masai Mara to dramatic Rift Valley escarpments and wildlife-rich wetlands — unmatched encounters with nature, culture, and adventure await. </p>

                <h1 className={'text-5xl font-pangaia font-extrabold text-center'}>Why visit Kenya?</h1>

                <p className={'text-base md:text-xl text-gray-600'}>Visit Kenya for the kind of journey that gives you everything in one place: world-famous safaris, the Great Migration, dramatic landscapes, rich culture, warm hospitality, and beautiful Indian Ocean beaches. From the Maasai Mara and Mount Kenya to Nairobi’s energy and Diani’s white sands, Kenya blends adventure, wildlife, relaxation, and authentic local experiences in a way few destinations can. </p>

            </div>

            <div className="py-10 px-4 container mx-auto space-y-8">
                <FiltersBar
                    title="Popular Kenya Safaris"
                    description="Handpicked journeys that bring you closer to Kenya's wild places."
                    basePath="/kenya"
                    showCountryFilter={false}
                />

                <TripsGrid trips={trips.data} />

                <div className={'px-4 py-16 container mx-auto space-y-12'}>
                    <div className="flex items-center justify-between">
                        <h1 className={'text-3xl md:text-5xl font-pangaia font-extrabold'}>Got Questions? <br/>
                            We have answers
                        </h1>
                    </div>

                    <Accordion type="single" className="w-full">
                        {kenyanfaq.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-xl md:text-2xl font-medium py-6 cursor-pointer">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-lg md:text-xl leading-relaxed pb-8">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>

            </div>
            <CustomizeCta/>
            <Footer/>
        </section>
    )
}
export default Page
