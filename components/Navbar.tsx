"use client"
import React from 'react'
import Link from "next/link";
import { useNavbar } from "@/hooks/use-navbar";
import { cn } from "@/lib/utils";

const navLinks = [
    {
        name:"Destinations",
        url: "/destinations",
    },
    {
        name:"Kenya",
        url: "/kenya",
    },
    {
        name:"Tanzania",
        url: "/tanzania",
    },
    {
        name:"About",
        url: "/about",
    },
    {
        name:"FAQ",
        url: "/faq",
    },
    {
        name:"Plan trip",
        url: "/plan-trip",
    }


]

const Navbar = () => {
    const { isDark } = useNavbar();

    return (
        <header className={'absolute top-0 left-0 w-full z-50 transition-colors duration-300'}>
            <div className="container mx-auto py-6 px-4 flex items-center justify-between">
                <Link href={'/'}>
                    <h1 className={cn(
                        "font-extrabold font-pangaia text-xl transition-colors duration-300",
                        isDark ? "text-white" : "text-gray-900"
                    )}>
                        FruitfulnessTravel
                    </h1>
                </Link>

                <div className={cn(
                    "hidden md:flex space-x-10 transition-colors duration-300",
                    isDark ? "text-white/90" : "text-gray-600"
                )}>
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            href={link.url} 
                            className="hover-link-effect"
                            data-text={link.name}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    )
}
export default Navbar
