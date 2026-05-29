import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await context.params;
        const res = await fetch(`${API_URL}/api/journeys/${id}/related`, {
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("Related journeys fetch error:", error);

        return NextResponse.json(
            {
                message: "Failed to fetch related journeys",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 },
        );
    }
}
