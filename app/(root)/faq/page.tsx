import type { Metadata } from "next";
import DestinationsHero from "@/components/sections/destinations-hero";
import Footer from "@/components/sections/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { faqs, kenyanfaq, tanzaniafaq } from "@/lib";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Find answers about Kenya and Tanzania safaris, booking, park fees, travel insurance, safety, and custom trip planning.",
};

const faqGroups = [
  {
    value: "general",
    label: "General Questions",
    items: faqs,
  },
  {
    value: "kenya",
    label: "Kenya",
    items: kenyanfaq,
  },
  {
    value: "tanzania",
    label: "Tanzania",
    items: tanzaniafaq,
  },
];

const FaqAccordion = ({
  items,
  value,
}: {
  items: typeof faqs;
  value: string;
}) => {
  return (
    <Accordion type="single" className="w-full">
      {items.map((faq, index) => (
        <AccordionItem
          key={`${value}-${faq.question}`}
          value={`${value}-${index}`}
        >
          <AccordionTrigger className="text-lg md:text-xl">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="pb-8 text-lg leading-relaxed text-gray-600 md:text-xl">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const Page = () => {
  return (
    <section>
      <DestinationsHero
        title="Frequently Asked Questions"
        subtitle="We've got answers to all your questions"
      />
      <div className="container mx-auto px-4 py-20">
        <Tabs defaultValue="general" className="w-full gap-10">
          <TabsList
            variant="line"
            className="mb-8 w-full justify-start gap-6 overflow-x-auto border-b border-gray-200 pb-3"
          >
            {faqGroups.map((group) => (
              <TabsTrigger
                key={group.value}
                value={group.value}
                className="px-0 pb-2 text-base data-[state=active]:text-emerald-700 data-[state=active]:after:bg-emerald-700 data-[state=active]:after:opacity-100 md:text-lg"
              >
                {group.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {faqGroups.map((group) => (
            <TabsContent key={group.value} value={group.value}>
              <FaqAccordion items={group.items} value={group.value} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Footer />
    </section>
  );
};

export default Page;
