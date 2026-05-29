import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL! || 'http://localhost:8000';


export async function POST(req: Request) {
    try {
        const payload = await req.json();

        const res = await fetch(`${API_URL}/api/custom-bookings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
            return NextResponse.json(
                { message: data.message || "Booking failed" },
                { status: res.status }
            );
        }

        return NextResponse.json(data, { status: 201 });
    } catch {
        return NextResponse.json(
            { message: "Booking service unavailable" },
            { status: 500 }
        );
    }
}