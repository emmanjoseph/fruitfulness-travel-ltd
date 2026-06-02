import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Booking Request Received",
  description:
    "Your Fruitfulness Travel Limited booking request has been received and is being reviewed by our team.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookingSuccessLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
