"use client";

import { useState } from "react";

import { faqs } from "@/content/faqs";



export function FaqList() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {faqs.map(([question, answer], index) => {
        const open = openIndex === index;
        const buttonId = `faq-button-${index}`;
        const panelId = `faq-panel-${index}`;
        return (
          <div className={`faq-item ${open ? "is-open" : ""}`} key={question}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : index)}
              id={buttonId}
              aria-expanded={open}
              aria-controls={panelId}
            >
              <span className="faq-number">0{index + 1}</span>
              <span className="faq-question">{question}</span>
              <span className="faq-plus" aria-hidden="true">{open ? "−" : "+"}</span>
            </button>
            <div
              id={panelId}
              className="faq-answer"
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!open}
            >
              <div><p>{answer}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
