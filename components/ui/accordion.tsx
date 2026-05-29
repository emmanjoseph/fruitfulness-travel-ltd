"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  type?: "single" | "multiple";
  defaultValue?: string | string[];
}

interface AccordionContextValue {
  expanded: Set<string>;
  toggle: (value: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(
  undefined
);

export const Accordion = ({
  children,
  className,
  type = "single",
  defaultValue,
}: AccordionProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = React.useState<Set<string>>(
    new Set(
      Array.isArray(defaultValue)
        ? defaultValue
        : defaultValue
        ? [defaultValue]
        : []
    )
  );

  const toggle = React.useCallback(
    (value: string) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(value)) {
          next.delete(value);
        } else {
          if (type === "single") {
            next.clear();
          }
          next.add(value);
        }
        return next;
      });
    },
    [type]
  );

  React.useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll(".accordion-item");
      const lastLine = containerRef.current?.querySelector(".accordion-line:last-child");

      if (lastLine) {
        gsap.fromTo(
          lastLine,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: lastLine,
              start: "top 95%",
              end: "bottom 95%",
              scrub: 1,
            },
          }
        );
      }
      
      items?.forEach((item) => {
        const line = item.querySelector(".accordion-line");
        const content = item.querySelector(".accordion-content-wrapper");

        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top 95%",
              end: "bottom 95%",
              scrub: 1,
            },
          }
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          content,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <AccordionContext.Provider value={{ expanded, toggle, containerRef }}>
      <div 
        ref={containerRef}
        className={cn("w-full", className)}
      >
        {children}
        <div className="accordion-line w-full h-[1px] bg-gray-600 origin-left" />
      </div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const AccordionItem = ({
  value,
  children,
  className,
}: AccordionItemProps) => {
  return (
    <div className={cn("accordion-item relative overflow-hidden", className)}>
      <div className="accordion-line absolute top-0 left-0 right-0 h-[1px] bg-gray-600/70" />
      <div className="accordion-content-wrapper">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, { value });
          }
          return child;
        })}
      </div>
    </div>
  );
};

interface AccordionTriggerProps {
  value?: string;
  children: React.ReactNode;
  className?: string;
}

export const AccordionTrigger = ({
  value,
  children,
  className,
}: AccordionTriggerProps) => {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used within Accordion");

  const isExpanded = context.expanded.has(value!);

  return (
    <button
      type="button"
      onClick={() => context.toggle(value!)}
      className={cn(
        "flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:bg-primary/50 px-1",
        className
      )}
    >
      {children}
      <IconChevronDown
        className={cn(
          "h-5 w-5 shrink-0 transition-transform duration-200",
          isExpanded && "rotate-180"
        )}
      />
    </button>
  );
};

interface AccordionContentProps {
  value?: string;
  children: React.ReactNode;
  className?: string;
}

export const AccordionContent = ({
  value,
  children,
  className,
}: AccordionContentProps) => {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionContent must be used within Accordion");

  const isExpanded = context.expanded.has(value!);

  return (
    <AnimatePresence initial={false}>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className={cn("pb-4 pt-0 text-gray-600/70", className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
