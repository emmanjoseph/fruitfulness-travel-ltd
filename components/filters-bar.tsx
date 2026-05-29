"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const CATEGORIES = [
    { value: "safari", label: "Safari", imgUrl:"https://images.unsplash.com/photo-1524414621493-7dec026782c3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGtlbnlhfGVufDB8fDB8fHww" },
    { value: "adventure", label: "Adventure", imgUrl:"https://images.unsplash.com/photo-1524414621493-7dec026782c3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGtlbnlhfGVufDB8fDB8fHww" },
    { value: "cultural", label: "Cultural", imgUrl:"https://images.unsplash.com/photo-1524414621493-7dec026782c3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGtlbnlhfGVufDB8fDB8fHww" },
    { value: "beach", label: "Beach", imgUrl:"https://images.unsplash.com/photo-1524414621493-7dec026782c3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGtlbnlhfGVufDB8fDB8fHww" },
    { value: "luxury", label: "Luxury", imgUrl:"https://images.unsplash.com/photo-1524414621493-7dec026782c3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGtlbnlhfGVufDB8fDB8fHww" },
    { value: "budget", label: "Budget", imgUrl:"https://images.unsplash.com/photo-1524414621493-7dec026782c3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGtlbnlhfGVufDB8fDB8fHww" },
    { value: "family", label: "Family Friendly" , imgUrl:"https://images.unsplash.com/photo-1524414621493-7dec026782c3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGtlbnlhfGVufDB8fDB8fHww"},
    { value: "honeymoon", label: "Honeymoon", imgUrl:"https://images.unsplash.com/photo-1524414621493-7dec026782c3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGtlbnlhfGVufDB8fDB8fHww" },
];

const COUNTRIES = [
    { value: "kenya", label: "Kenya" },
    { value: "tanzania", label: "Tanzania" },
    { value: "about", label: "Uganda" },
];

type FilterOption = {
    value: string;
    label: string;
    imgUrl?: string;
};

type FiltersBarProps = {
    title?: string;
    description?: string;
    basePath?: string;
    showCountryFilter?: boolean;
    categories?: FilterOption[];
    countries?: FilterOption[];
};

export default function FiltersBar({
                                       title = "Discover handpicked journeys",
                                       description = "Explore destinations across East Africa",
                                       basePath = "/services",
                                       showCountryFilter = true,
                                       categories = CATEGORIES,
                                       countries = COUNTRIES,
                                   }: FiltersBarProps) {
    const router = useRouter();
    const params = useSearchParams();

    const activeCategory = params.get("category") ?? "";
    const activeCountry = params.get("country") ?? "";

    function updateParam(key: string, value: string) {
        const sp = new URLSearchParams(params.toString());

        if (key === "category") {
            if (value === "all" || !value) {
                sp.delete("category");
                sp.delete("tags");
            } else {
                sp.set("category", value);
                sp.set("tags", value);
            }
        } else if (value === "all" || !value) {
            sp.delete(key);
        } else {
            sp.set(key, value);
        }

        sp.set("page", "1");

        const queryString = sp.toString();
        router.push(queryString ? `${basePath}?${queryString}` : basePath);
    }

    return (
        <aside className="space-y-5">
            {/* Header */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-gray-700 font-pangaia">
                        {title}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        {description}
                    </p>
                </div>

                {/* Country Select */}
                {showCountryFilter && (
                    <div className="relative w-full lg:w-[180px]">
                        <MapPin
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10"
                            size={18}
                        />

                        <Select
                            value={activeCountry || "all"}
                            onValueChange={(value) => updateParam("country", value)}
                        >
                            <SelectTrigger className="w-full h-15 pl-10 py-5 rounded-xl border-gray-300 bg-white focus:border-emerald-500 focus:ring-emerald-500">
                                <SelectValue placeholder="Select destination" />
                            </SelectTrigger>

                            <SelectContent className="rounded-2xl">
                                <SelectItem value="all">
                                    All Countries
                                </SelectItem>

                                {countries.map((c) => (
                                    <SelectItem key={c.value} value={c.value}>
                                        {c.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                )}
            </div>

            {/* Horizontal Categories */}
            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex items-center gap-3 min-w-max pb-1">
                    {/* All */}
                    <button
                        onClick={() => updateParam("category", "all")}
                        className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                            !activeCategory
                                ? "bg-emerald-600 text-white shadow-sm"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        All categories
                    </button>

                    {/* Categories */}
                    {categories.map((cat) => {
                        const active = activeCategory === cat.value;

                        return (
                            <button
                                key={cat.value}
                                onClick={() => updateParam("category", cat.value)}
                                className={`whitespace-nowrap cursor-pointer rounded-full pl-1 py-1 pr-3 text-sm font-semibold transition-all flex items-center gap-x-1 ${
                                    active
                                        ? "bg-emerald-600 text-white shadow-sm"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {cat.imgUrl && (
                                    <Image src={cat.imgUrl} alt={cat.label} width={300} height={300} className={'size-8 rounded-full'} />
                                )}
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}
