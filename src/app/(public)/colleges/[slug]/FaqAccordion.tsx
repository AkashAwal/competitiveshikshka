"use client";

import { Accordion } from "@base-ui/react/accordion";
import { Plus } from "lucide-react";

export interface Faq {
  question: string;
  answer: string;
}

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <Accordion.Root className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card">
      {faqs.map(faq => (
        <Accordion.Item key={faq.question} className="px-5">
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-semibold text-foreground cursor-pointer">
              {faq.question}
              <Plus className="h-4 w-4 shrink-0 text-[#1c67f6] transition-transform duration-200 group-data-[panel-open]:rotate-45" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Panel className="overflow-hidden text-sm text-muted-foreground leading-relaxed h-[var(--accordion-panel-height)] transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0">
            <p className="pb-4 whitespace-pre-line">{faq.answer}</p>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
