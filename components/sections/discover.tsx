"use client"
import React from 'react'
import Image from 'next/image'
import {Card, Carousel} from "@/components/ui/apple-cards-carousel";

const Discover = () => {
    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className={'px-4 py-16'}>
            <div className="max-w-3xl mx-auto grid gap-5">
                <h1
                    className=" text-4xl md:text-6xl font-extrabold font-pangaia text-center uppercase">
                    Explore Africa ,<br/> Your Way.
                </h1>

                <p  className={' text-xl text-gray-600'}>Africa is vast,
                    vibrant, and full of contrast. From golden savannas and ancient deserts to lively cities, rainforest trails,
                    and turquoise coastlines, every journey reveals something different. It is a place of deep culture, warm
                    hospitality, unforgettable wildlife, and stories that stay with you long after you leave.</p>

            </div>

            <Carousel items={cards}/>
        </div>
    )
}
export default Discover

const WildlifeContent = () => (
    <>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto  p-8 md:p-14">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Witness the Big Five in their natural habitat.
        </span>{" "}
                Our wildlife safaris take you deep into Kenya's most iconic national parks — the Maasai Mara, Amboseli, and Tsavo — where lions, elephants, leopards, buffalos, and rhinos roam freely across vast savannahs.
            </p>
            <Image
                src="https://images.unsplash.com/photo-1556960146-ba4d5f5fa2f9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YWZyaWNhJTIwc2FmYXJpfGVufDB8fDB8fHww"
                alt="Lion on the savannah"
                height={500}
                width={500}
                className="h-[300px] md:h-[500px] w-full mx-auto object-cover mt-6 rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 1024px"
            />
        </div>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800  rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto p-8 md:p-14">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          The Great Migration — nature's greatest spectacle.
        </span>{" "}
                Every year, over 1.5 million wildebeest thunder across the Mara River in a dramatic crossing that has to be seen to be believed. Our guides know exactly where and when to position you for the perfect view.
            </p>
            <Image
                src="https://plus.unsplash.com/premium_photo-1664302652203-238526cd24fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWlncmF0aW9uJTIwbWFhc2FpJTIwbWFyYXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Wildebeest migration"
                height={500}
                width={500}
                className="h-[300px] md:h-[500px] w-full mx-auto object-cover mt-6 rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 1024px"
            />
        </div>
    </>
);

const BeachContent = () => (
    <>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans p-8 md:p-14">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          The Swahili Coast — where the Indian Ocean meets ancient culture.
        </span>{" "}
                From the white sands of Diani Beach to the coral reefs of Watamu, Kenya's coastline is a paradise for sun-seekers, divers, and culture lovers alike. Unwind in luxury beachfront cottages after a day of snorkeling pristine reefs.
            </p>
            <Image
                src="https://images.unsplash.com/photo-1708119011395-eadb221b3e15?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGRpYW5pJTIwYmVhY2h8ZW58MHx8MHx8fDA%3D"
                alt="Tropical beach"
                height={1000}
                width={1000}
                className="h-[300px] md:h-[500px] w-full mx-auto object-cover mt-6 rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 1024px"
            />
        </div>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Mombasa Old Town — history woven into every street.
        </span>{" "}
                Pair your beach stay with a walk through Mombasa's ancient streets, where Portuguese forts, Swahili architecture, and spice markets tell the story of centuries of ocean trade. A complete sensory experience.
            </p>
            <Image
                src="https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=2835&auto=format&fit=crop"
                alt="Ocean waves on beach"
                height={500}
                width={500}
                className="h-[300px] md:h-[500px] w-full mx-auto object-cover mt-6 rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 1024px"
            />
        </div>
    </>
);

const MountainContent = () => (
    <>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800  rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans p-8 md:p-14">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Mount Kenya — Africa's second highest peak.
        </span>{" "}
                Trek through bamboo forests, alpine meadows, and glacial valleys on your way to Point Lenana at 4,985m. Our experienced mountain guides ensure a safe, rewarding ascent with stunning views of the Great Rift Valley below.
            </p>
            <Image
                src="https://images.unsplash.com/photo-1618856445394-259e67220916?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnQlMjBrZW55YXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Mountain landscape"
                height={500}
                width={500}
                className="h-[300px] md:h-[500px] w-full mx-auto object-cover mt-6 rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 1024px"
            />
        </div>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Kilimanjaro — the roof of Africa.
        </span>{" "}
                Cross the border into Tanzania for the ultimate bucket-list challenge. Standing at 5,895m, Kilimanjaro is the world's tallest free-standing mountain. We offer guided climbs on the Lemosho, Machame, and Rongai routes for all experience levels.
            </p>
            <Image
                src="https://images.unsplash.com/photo-1518729571365-9a891a9df2bd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnQlMjBraWxpbWFuamFyb3xlbnwwfHwwfHx8MA%3D%3D"
                alt="Kilimanjaro summit"
                height={500}
                width={500}
                className="h-[300px] md:h-[500px] w-full mx-auto object-cover mt-6 rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 1024px"
            />
        </div>
    </>
);

const CulturalContent = () => (
    <>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800  rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans p-8 md:p-14">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Live alongside the Maasai — Africa's most iconic people.
        </span>{" "}
                Step inside a traditional Maasai boma, learn the art of fire-making, join a village dance, and hear stories passed down through generations. This isn't a performance — it's an authentic cultural exchange.
            </p>
            <Image
                src="https://images.unsplash.com/photo-1515657241610-a6b33f0f6c5a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1hYXNhaXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Maasai warriors"
                height={500}
                width={500}
                className="h-[300px] md:h-[500px] w-full mx-auto object-cover mt-6 rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 1024px"
            />
        </div>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Lamu Island — a UNESCO World Heritage town frozen in time.
        </span>{" "}
                No cars, no rush. Lamu moves at the pace of the dhow sailboats that have traded along this coast for over 700 years. Wander narrow alleyways, visit intricately carved Swahili doors, and watch the sun sink into the Indian Ocean.
            </p>
            <Image
                src="https://images.unsplash.com/photo-1711802536786-149a0d0c5879?q=80&w=2409&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Traditional dhow sailboat"
                height={500}
                width={500}
                className="h-[300px] md:h-[500px] w-full mx-auto object-cover mt-6 rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 1024px"
            />
        </div>
    </>
);

const PhotographyContent = () => (
    <>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans p-8 md:p-14 ">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Golden hour on the Mara — every frame a masterpiece.
        </span>{" "}
                Our photography safaris are designed around the light. Early morning game drives catch predators at their most active, while the long shadows of dusk turn the savannah into a painting. Your guide doubles as a spotter so you never miss the shot.
            </p>
            <Image
                src="https://images.unsplash.com/photo-1711802536772-0ef59886bc1b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGFtdXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Safari photography"
                height={500}
                width={500}
                className="h-[300px] md:h-[500px] w-full mx-auto object-cover mt-6 rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 1024px"
            />
        </div>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Hot air balloon over the Mara — the ultimate aerial shot.
        </span>{" "}
                Float silently above the plains as thousands of animals move below you. The perspective from 300 metres up is like nothing else — a photographer's dream and a memory that lasts a lifetime.
            </p>
            <Image
                src="https://images.unsplash.com/photo-1519659528534-7fd733a832a0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNhZmFyaXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Hot air balloon safari"
                height={500}
                width={500}
                className="h-[300px] md:h-[500px] w-full mx-auto object-cover mt-6 rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 1024px"
            />
        </div>
    </>
);

const LuxuryContent = () => (
    <>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Luxury tented camps — five-star comfort under the African sky.
        </span>{" "}
                Fall asleep to the sound of lions and wake up to elephants at your doorstep. Our luxury camps blend seamlessly into the wilderness while delivering world-class cuisine, private plunge pools, and personalised butler service.
            </p>
            <Image
                src="https://images.unsplash.com/photo-1561501878-aabd62634533?q=80&w=2970&auto=format&fit=crop"
                alt="Luxury safari tent"
                height={500}
                width={500}
                className="h-[300px] md:h-[500px] w-full mx-auto object-cover mt-6 rounded-2xl"
            />
        </div>
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-neutral-700 dark:text-neutral-200">
          Private charter flights — skip the road, own the sky.
        </span>{" "}
                Hop between parks in minutes aboard a private charter. No shared transfers, no wasted time. Land on bush airstrips and step straight into a waiting Land Cruiser — the definition of effortless travel.
            </p>
            <Image
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2970&auto=format&fit=crop"
                alt="Private charter plane"
                height={500}
                width={500}
                className="h-[300px] md:h-[500px] w-full mx-auto object-cover mt-6 rounded-2xl"
            />
        </div>
    </>
);

const data = [
    {
        category: "Wildlife Safari",
        title: "Track the Big Five across Kenya's finest parks.",
        src: "https://images.unsplash.com/photo-1507461476191-0ed4f9f18533?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGVsZXBoYW50fGVufDB8fDB8fHww",
        content: <WildlifeContent />,
    },
    {
        category: "Beach & Coast",
        title: "Sun, sea, and Swahili culture on Kenya's coast.",
        src: "https://images.unsplash.com/photo-1714167092004-b530b6cc3066?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRpYW5pfGVufDB8fDB8fHww",
        content: <BeachContent />,
    },
    {
        category: "Mountain Trekking",
        title: "Conquer Mount Kenya and Kilimanjaro.",
        src: "https://images.unsplash.com/photo-1631646109248-a7264aae1790?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2lsaW1hbmphcm98ZW58MHx8MHx8fDA%3D",
        content: <MountainContent />,
    },
    {
        category: "Cultural Immersion",
        title: "Live the stories of Africa's oldest peoples.",
        src: "https://images.unsplash.com/photo-1580394640019-00d34094ae13?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hYXNhaSUyMG1hcmF8ZW58MHx8MHx8fDA%3D",
        content: <CulturalContent />,
    },
    {
        category: "Photography Safari",
        title: "Capture Africa through a professional lens.",
        src: "https://images.unsplash.com/photo-1549366021-9f761d450615?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVsZXBoYW50fGVufDB8fDB8fHww",
        content: <PhotographyContent />,
    },
    {
        category: "Luxury Escapes",
        title: "Five-star wilderness — no compromises.",
        src: "https://plus.unsplash.com/premium_photo-1661894639801-a671abf61b43?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGFmcmljYSUyMHNhZmFyaXxlbnwwfHwwfHx8MA%3D%3D",
        content: <LuxuryContent />,
    },
];