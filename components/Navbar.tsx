"use client"
import React, { useState } from 'react'
import Link from "next/link";
import { useNavbar } from "@/hooks/use-navbar";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";

const navLinks = [
    { name: "Destinations", url: "/destinations" },
    { name: "Kenya",        url: "/kenya"         },
    { name: "Tanzania",     url: "/tanzania"      },
    { name: "About",        url: "/about"         },
    { name: "FAQ",          url: "/faq"           },
    { name: "Plan trip",    url: "/plan-trip"     },
];

const Navbar = () => {
    const { isDark } = useNavbar();
    const [open, setOpen] = useState(false); // 👈 array destructuring, not object

    return (
        <header className="absolute top-0 left-0 w-full z-50 transition-colors duration-300">
            <div className="container mx-auto py-6 px-4 flex items-center justify-between">
                <Link href="/">
                    <h1 className={cn(
                        "font-extrabold font-pangaia text-xl transition-colors duration-300",
                        isDark ? "text-white" : "text-gray-900"
                    )}>
                        FruitfulnessTravel
                    </h1>
                </Link>

                {/* Desktop nav */}
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

                {/* Hamburger — mobile only */}
                <button
                    onClick={() => setOpen(true)} // 👈 arrow function
                    className={cn("md:hidden", isDark ? "text-white" : "text-gray-900")}
                >
                    <IconMenu2 size={24} />
                </button>

                {/* Mobile drawer */}
                <div className={cn(
                    "fixed md:hidden inset-0 bg-white z-50 transition-opacity duration-300",
                    open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}>
                    <div className="flex flex-col items-center justify-center h-full space-y-8">
                        <button
                            onClick={() => setOpen(false)} // 👈 arrow function
                            className="absolute top-6 right-6 text-gray-600"
                        >
                            <IconX size={24} />
                        </button>

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.url}
                                onClick={() => setOpen(false)}
                                className="text-xl font-semibold text-gray-800 hover:text-emerald-600 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;