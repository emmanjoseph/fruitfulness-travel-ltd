import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Review Fruitfulness Travel Limited's booking terms, payment rules, cancellation policy, travel document requirements, and liability details.",
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children;
}
