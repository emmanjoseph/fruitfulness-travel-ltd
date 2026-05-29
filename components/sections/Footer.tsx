import React from 'react'
import {IconBrandInstagram, IconBrandOffice, IconBrandWhatsapp, IconMailbox, IconPhoneCall} from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

const destinations = [
    {
        name:"Explore all destinations",
        href:"/services"
    },
    {
        name:"Kenya",
        href:"/kenya-safaris"
    },
    {
        name:"Tanzania",
        href:"/tanzania-safaris"
    },
    {
        name:"Uganda",
        href:"/tanzania-safaris"
    },

]

const topTags = [
    {
        name:"Wildlife",
        href:"/"
    },
    {
        name:"Mountains",
        href:"/"
    },
    {
        name:"Sandy beaches",
        href:"/"
    },
    {
        name:"Adventure",
        href:"/"
    },

]

const contact = [
    {
        icon:<IconPhoneCall/>,
        name:"Call any time",
        description:"254 769 322 991",
        href:""
    },
    {
        icon:<IconBrandOffice/>,
        name:"Visit our office",
        description:"Viewpark Towers 17th floor, 100-102, Nairobi, Kenya",
        href:""
    },
    {
        icon:<IconMailbox/>,
        name:"Send us an email",
        description:"info@fruitfulnesstravel.co.ke",
        href:""
    },
]

const quickLinks = [
    {
        name:"Contact us",
        href:""
    },
    {
        name:"About Us",
        href:"/about"
    },
    {
        name:"Terms and Conditions",
        href:"/terms"
    },
    {
        name:"Privacy Policy",
        href:"/terms"
    }
]

const Footer = () => {
    return (
        <footer className={'px-4 pt-10 text-gray-100 bg-neutral-950'}>
            <div className="container mx-auto py-10 border-b border-neutral-500 border-opacity-20 border-dotted grid lg:grid-cols-4 gap-7">
                <Image src={'/logo.jpg'} alt={'logo'} width={600} height={600} className={'rounded-full size-40'} />

                <div className="lg:col-span-3 grid lg:grid-cols-3 gap-7">
                    {
                        contact.map((item) => (
                            <div key={item.name} className="flex items-center space-x-4">
                                <div className="p-3 bg-neutral-800 rounded-full text-gray-100">
                                    {item.icon}
                                </div>

                                <div>
                                    <h2 className="text-lg font-pangaia font-bold">{item.name}</h2>
                                    <p className="text-sm text-gray-400">{item.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>


            </div>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-10 gap-8 py-24">
                <div className="lg:col-span-4">
                    <h1 className="text-2xl font-pangaia font-extrabold">Fruitfulness <br/> Travel Limited</h1>
                    <p className="text-gray-400 mt-2">
                        Your ultimate destination for adventure and discovery.
                    </p>
                </div>

                <div className="md:col-span-6 grid lg:grid-cols-3 gap-7">

                    <div className="">
                        <h2 className="text-xl font-pangaia font-bold mb-4">Destinations</h2>
                        <ul className="space-y-2 text-sm">
                            {destinations.map((destination) => (
                                <li key={destination.name}>
                                    <Link href={destination.href} className="hover-link-effect">
                                        {destination.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/*quick links*/}
                    <div>
                        <h2 className="text-xl font-pangaia font-bold mb-4">Travel categories</h2>
                        <ul className="space-y-2 text-sm">
                            {topTags.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover-link-effect">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-pangaia font-bold mb-4">Quick Links</h2>
                        <ul className="space-y-2 text-sm">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="hover-link-effect">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

            </div>

            <div className="py-6 border-t border-neutral-500 text-sm flex justify-between items-center">
                <div className={'flex items-center space-x-2'}><IconBrandInstagram/> <IconBrandWhatsapp/> </div>
                <p className="text-neutral-400">
                    &copy; {new Date().getFullYear()} FruitfulnessTravel. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
export default Footer
