"use client";

import React, { useEffect, useState } from "react";
import DestinationsHero from "@/components/sections/destinations-hero";
import Footer from "@/components/sections/Footer";


const sections = [
    { id: "website-terms", title: "Website Terms" },
    { id: "booking", title: "Booking" },
    { id: "payment", title: "Payment" },
    { id: "safari-orientation", title: "Safari Orientation" },
    { id: "itinerary-changes", title: "Itinerary Changes" },
    { id: "cancellation-customer", title: "Customer Cancellation" },
    { id: "cancellation-agency", title: "Agency Cancellation" },
    { id: "travel-documents", title: "Travel Documents" },
    { id: "passports-visas", title: "Passports & Visas" },
    { id: "vaccination", title: "Vaccination" },
    { id: "travel-insurance", title: "Travel Insurance" },
    { id: "liability", title: "Liability" },
    { id: "claims", title: "Claims" },
];

const Page = () => {
    const [activeId, setActiveId] = useState("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: "-30% 0px -60% 0px" }
        );

        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="font-sans">
           <DestinationsHero
             title={'Terms & Conditions'}
             subtitle={'Last updated March 25 2026'}
           />

            <div className="max-w-6xl mx-auto px-4 py-10 lg:grid lg:grid-cols-4 lg:gap-12">

                <aside className="hidden lg:block col-span-1">
                    <div className="sticky top-24 space-y-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                            On this page
                        </p>

                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className={`block text-sm py-1.5 px-3 rounded-xl transition-colors ${
                                    activeId === section.id
                                        ? "bg-black text-white font-medium"
                                        : "text-muted-foreground hover:text-black hover:bg-gray-100"
                                }`}

                            >
                                {section.title}
                            </a>
                        ))}
                    </div>

                </aside>

                <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-6 hide-scrollbar">
                    {sections.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                                activeId === section.id
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-gray-600 border-gray-200"
                            }`}
                        >
                            {section.title}
                        </a>
                    ))}
                </div>


                {/* Content */}
                <div className="lg:col-span-3 space-y-10">
                    <p className="text-gray-600 leading-relaxed">
                        Please be aware that it is important that you have familiarized
                        yourself thoroughly with the terms of agreement of a tour. These
                        terms comprise the following elements: the brochure and/or website
                        information, including price list and itinerary and the invoice and
                        terms and conditions. If the tour is booked on Fruitfulness Travel
                        Limited website you should read all the relevant information
                        contained within the document.
                    </p>

                    <div id="website-terms" className="space-y-2.5 scroll-mt-24">
                        <h2 className="text-xl font-semibold">Website Terms and Conditions</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Although Fruitfulness Travel Limited endeavors to provide
                            accurate, up to date and truthful information on this site,
                            neither Fruitfulness Travel Limited nor any of its employees,
                            agents and associates make any representations or give any
                            warranties, whether expressly, tacitly or implied, as to the
                            operations of the website, the information, content, materials,
                            and products included. Fruitfulness Travel Limited, its employees,
                            agents and associates will not be liable for any damage of
                            whatsoever nature arising or resulting from the use of or
                            inability to use the site. Fruitfulness Travel Limited will treat
                            all personal information you give us as strictly confidential and
                            no personal information will be made available to third parties,
                            unless obligated to do so by law or legal process.
                        </p>
                    </div>

                    <div id="booking" className="space-y-2.5 scroll-mt-24">
                        <h2 className="text-xl font-semibold">Booking</h2>
                        <p className="text-gray-600 leading-relaxed">
                            In order to make your booking, please make sure that you have the
                            correct names, nationality and date of birth of all the travelers
                            as per their passport. If a hotel is fully booked, Fruitfulness
                            Travel Limited will try to offer you an alternative property of
                            similar standard and location. A booking is binding for both the
                            customer and travel agency once the deposit has been paid.
                        </p>
                    </div>

                    <div id="payment" className="space-y-2.5 scroll-mt-24">
                        <h2 className="text-xl font-semibold">Condition of Payment</h2>
                        <p className="text-gray-600 leading-relaxed">
                            The following rules apply unless other conditions are stipulated
                            in the tour itinerary or practical information relating to the
                            specific tour on our website. Peak Season: A 50% mandatory
                            deposit based on total value of the respective bookings will be
                            payable 7 days after receiving the consent to proceed. Balance of
                            payment to be paid strictly 60 days before arrival. All vouchers
                            and confirmations will be sent once fully paid.
                        </p>
                    </div>

                    <div id="safari-orientation" className="space-y-2.5 scroll-mt-24">
                        <h2 className="text-xl font-semibold">Safari Orientation</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Unless the safari is private, clients will share the safari
                            facilities with others. Clients are therefore advised to be
                            good-natured and enjoy being with others. Be prepared to encounter
                            customs and habits which may be different from your own — this
                            forms part of the adventure.
                        </p>
                    </div>

                    <div id="itinerary-changes" className="space-y-2.5 scroll-mt-24">
                        <h2 className="text-xl font-semibold">Changes in Itinerary</h2>
                        <p className="text-gray-600 leading-relaxed">
                            The sequence of itineraries is normally adhered to but the company
                            reserves the right to make alterations occasioned by weather, road
                            works, high season congestion or any other unforeseen
                            circumstances. Any alterations by the client to the agreed
                            itineraries should be done in the office. The company shall not be
                            held liable for any complaint arising out of changes made between
                            the client and the safari guide outside the office.
                        </p>
                    </div>

                    <div id="cancellation-customer" className="space-y-2.5 scroll-mt-24">
                        <h2 className="text-xl font-semibold">Cancellation by the Customer</h2>
                        <p className="text-gray-600 leading-relaxed mb-3">
                            In case a booking is cancelled, the following cancellation fees shall apply:
                        </p>
                        <ul className="space-y-2">
                            {[
                                ["No show", "100%"],
                                ["1–7 days before departure", "75%"],
                                ["7–14 days before departure", "50%"],
                                ["Above 14 days before departure", "25%"],
                            ].map(([label, fee]) => (
                                <li key={label} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-2xl text-sm">
                                    <span className="text-gray-600">{label}</span>
                                    <span className="font-semibold text-red-500">{fee}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-sm text-muted-foreground mt-3">
                            Note: During peak season (July–September), a 100% non-refundable fee applies for accommodation costs.
                        </p>
                    </div>

                    <div id="cancellation-agency" className="space-y-2.5 scroll-mt-24">
                        <h2 className="text-xl font-semibold">Cancellation by Travel Agency</h2>
                        <p className="text-gray-600 leading-relaxed">
                            In the unlikely event that Fruitfulness Travel Limited has to
                            cancel a tour or service for any reason, we will try to offer an
                            alternative arrangement; otherwise you will receive a full refund.
                            We will inform you of any cancellations at the earliest possible
                            convenience and at the latest 14 days before commencement of the
                            tour. The tour may also be cancelled due to force majeure
                            circumstances beyond our control. In such cases customers will be
                            refunded but will not be able to claim any extra expenses.
                        </p>
                    </div>

                    <div id="travel-documents" className="space-y-2.5 scroll-mt-24">
                        <h2 className="text-xl font-semibold">Travel Documents</h2>
                        <p className="text-gray-600 leading-relaxed">
                            If travel documents other than an invoice are required, these will
                            be emailed or posted to the booking party upon receipt of full
                            payment. Additional travel documents could include detailed flight
                            schedules, vouchers and an itinerary that includes pre-booked
                            services for your destination.
                        </p>
                    </div>

                    <div id="passports-visas" className="space-y-2.5 scroll-mt-24">
                        <h2 className="text-xl font-semibold">Passports and Visas</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Unless otherwise specified, obtaining a passport and visa for
                            entry to the country or countries in which the tour takes place is
                            the responsibility of the traveler. The traveler must ensure that
                            he/she has a valid passport and visa and has given the travel
                            agency the correct information regarding name and nationality.
                            Please note that visa processing may take several weeks. Your
                            passport must normally be valid for at least six months after
                            returning from your destination.
                        </p>
                    </div>

                    <div id="vaccination" className="space-y-2.5 scroll-mt-24">
                        <h2 className="text-xl font-semibold">Vaccination Requirements</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Information about which vaccinations are required should be
                            obtained from your GP or physician. Any advice given by
                            Fruitfulness Travel Limited about vaccinations and/or prophylactic
                            measures should be considered as an extra service only — we are
                            not qualified to give medical advice and accept no liability for
                            it.
                        </p>
                    </div>

                    <div id="travel-insurance" className="space-y-2.5 scroll-mt-24">
                        <h2 className="text-xl font-semibold">Travel Insurance</h2>
                        <p className="text-gray-600 leading-relaxed">
                            All travelers should have travel insurance for the trip. This is
                            of paramount importance in case of illness as well as repatriation
                            for other reasons. Participation in our tours presumes responsible
                            and considerate behavior with respect to both yourself and other
                            people. We do not recommend that travelers venture alone into
                            unfamiliar or remote areas, especially after nightfall.
                        </p>
                    </div>

                    <div id="liability" className="space-y-2.5 scroll-mt-24">
                        <h2 className="text-xl font-semibold">Liability Limitations</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Fruitfulness Travel Limited has no direct day-to-day control over
                            its suppliers and accordingly accepts no responsibility for any
                            injury, damage, loss, accident, delay, irregularity or
                            inconvenience which may be occasioned by any defect in anything
                            utilized by any supplier. Fruitfulness Travel Limited shall not be
                            liable for any loss or expense arising from cancellation or
                            curtailment of the tour however caused, save to the extent that
                            such loss was caused directly by the negligence of Fruitfulness
                            Travel Limited. In the case of a claim being made, Fruitfulness
                            Travel Limited must receive said claim in writing no later than 28
                            days from the end of our services under the contract.
                        </p>
                    </div>

                    <div id="claims" className="space-y-2.5 scroll-mt-24">
                        <h2 className="text-xl font-semibold">Claims</h2>
                        <p className="text-gray-600 leading-relaxed">
                            If you have a complaint it must be directed to Fruitfulness Travel
                            Limited or our local representative as soon as the problem comes
                            to light so that we may rectify the situation. Should you remain
                            dissatisfied, please write to us setting out the complaint in
                            detail within 28 days of the end of the tour. Should any legal
                            dispute arise it must be settled in Nairobi, Kenya.
                        </p>
                    </div>
                </div>
            </div>

           <Footer/>
        </section>
    );
};

export default Page;