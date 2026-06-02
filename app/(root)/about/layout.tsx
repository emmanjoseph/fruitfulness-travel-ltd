import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Fruitfulness Travel Limited and our approach to meaningful, authentic, and custom East African journeys.",
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
