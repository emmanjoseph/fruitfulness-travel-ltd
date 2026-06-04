import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const grotesque = Bricolage_Grotesque({
  variable: "--font-grotesque",
  subsets: ["latin"],
});

const pangaia = localFont({
  src: [
    {
      path: "./fonts/PPPangaia-Ultralight-BF654c530cd00f1.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "./fonts/PPPangaia-UltralightItalic-BF654c530ca889f.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "./fonts/PPPangaia-Medium-BF654c530cc86d5.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/PPPangaia-MediumItalic-BF654c530bedffb.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./fonts/PPPangaia-Bold-BF654c530cc27f8.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/PPPangaia-BoldItalic-BF654c530c8d2fa.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-pangaia",
});

export const metadata: Metadata = {
  title: {
    default: "Fruitfulness Travel Limited",
    template: "%s | Fruitfulness Travel Limited",
  },
    icons:{
      icon:"/palm.svg",
    },
  description:
    "Tailor-made Kenya and Tanzania safari journeys, cultural escapes, and custom travel planning across East Africa.",
  applicationName: "Fruitfulness Travel Limited",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", grotesque.variable, pangaia.variable, "font-sans", inter.variable)}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
