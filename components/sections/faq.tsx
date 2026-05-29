"use client"
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {faqs} from "@/lib";

const Faq = () => {
    return (
        <div className={'px-4 py-16 container mx-auto space-y-12'}>
            <div className="flex items-center justify-between">
                <h1 className={'text-3xl md:text-5xl font-pangaia font-extrabold'}>Got Questions? <br/>
                We have answers
                </h1>
            </div>

            <Accordion type="single" className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-xl md:text-2xl font-medium py-6 cursor-pointer">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-lg md:text-xl leading-relaxed pb-8">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}
export default Faq
