import React from 'react'

import VideoHero from "@/components/video-hero";
import PexelsGallery from "@/components/sections/pexels-gallery";
import FiltersBar from "@/components/filters-bar";
import {getAllTrips} from "@/lib/api";
import TripsGrid from "@/components/trips-grid";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {kenyanfaq, tanzaniafaq} from "@/lib";
import Footer from "@/components/sections/Footer";
import CustomizeCta from "@/components/sections/customize-cta";

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
        country: "tanzania",
    });
    return (
        <section>
            <VideoHero
                video={{
                    imageUrl:"https://images.unsplash.com/photo-1580145575237-75fec2a0320b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGFuemFuaWElMjBzYWZhcml8ZW58MHx8MHx8fDA%3D",
                    title:"Tanzania ",
                    subtitle:"Discover the beauty of Tanzania"
                }}
            />

            <PexelsGallery/>


            <div className="py-10 px-4 max-w-4xl mx-auto space-y-8">
                <p className={'text-base md:text-xl text-gray-600'}>Tanzania is a breathtaking destination of wild beauty and timeless adventure, home to the Serengeti, Mount Kilimanjaro, Zanzibar’s turquoise shores, and some of Africa’s most iconic wildlife experiences. Its landscapes, cultures, and warm hospitality make every journey feel rich, natural, and unforgettable. </p>

                <h1 className={'text-5xl font-pangaia font-extrabold text-center'}>Why visit Tanzania?</h1>

                <p className={'text-base md:text-xl text-gray-600'}>Visit Tanzania for its unmatched mix of iconic wildlife, epic landscapes, and island beauty. From the endless Serengeti plains and the Great Migration to Mount Kilimanjaro, the Ngorongoro Crater, and Zanzibar’s turquoise beaches, Tanzania offers adventure, culture, relaxation, and once-in-a-lifetime safari experiences in one unforgettable destination. </p>

            </div>

            <div className="py-10 px-4 container mx-auto space-y-8">
                <FiltersBar
                    title="Popular Tanzania Safaris"
                    description="Handpicked journeys that bring you closer to Tanzania's wild places."
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
                        {tanzaniafaq.map((faq, index) => (
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
