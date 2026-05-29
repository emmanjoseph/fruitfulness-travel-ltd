"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       basePath,
                                   }: any) {
    const params = useSearchParams();
    const query = new URLSearchParams(params.toString());

    return (
        <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                query.set("page", String(page));

                return (
                    <Link
                        key={page}
                        href={`${basePath}?${query.toString()}`}
                        className={`px-5 py-3 border rounded-[15px] font-semibold border-none shadow-xl ${
                            page === currentPage ? "bg-black text-white" : ""
                        }`}
                    >
                        {page}
                    </Link>
                );
            })}
        </div>
    );
}
