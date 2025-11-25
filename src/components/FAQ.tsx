"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "How do you vet remote viewers?",
        answer: "We have a rigorous 3-step process: 1) Blind target testing where candidates must describe hidden targets with >70% accuracy. 2) Professionalism interview. 3) Mock client session. Only top 5% of applicants make it.",
    },
    {
        question: "Is my information private and secure?",
        answer: "Absolutely. We use double-blind protocols whenever possible. Viewers often don't need to know the specific question to get the answer, just a 'target reference number'. Your personal details are never shared with the viewer without your consent.",
    },
    {
        question: "What if I'm not satisfied with the session?",
        answer: "We offer a satisfaction guarantee. If the viewer was unprofessional or the session didn't follow protocols, we will review the case and offer a refund or a credit for a new session with a different expert.",
    },
    {
        question: "Can remote viewing predict the future?",
        answer: "Remote viewing is best for describing people, places, events, or situations (past, present, or future potentials). It is not 'fortune telling' but rather data collection about probabilities. It helps you make better decisions by revealing hidden information.",
    },
    {
        question: "How do I prepare for a session?",
        answer: "The best preparation is to have a clear, specific question or goal. Our free checklist (available above) guides you through formulating your intent to get the clearest results.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-20 bg-white" id="faq">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-slate-600">
                        Common questions about hiring a remote viewer.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-slate-200 rounded-lg overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-4 sm:p-6 bg-white hover:bg-slate-50 transition-colors text-left focus:outline-none"
                            >
                                <span className="font-semibold text-slate-900 text-lg pr-8">{faq.question}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="h-5 w-5 text-slate-500 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-slate-500 flex-shrink-0" />
                                )}
                            </button>

                            <div
                                className={cn(
                                    "bg-slate-50 text-slate-600 overflow-hidden transition-all duration-300 ease-in-out",
                                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                                )}
                            >
                                <div className="p-4 sm:p-6 pt-0 border-t border-slate-100">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-600 mb-4">Still unsure?</p>
                    <a href="#checklist" className="text-indigo-600 font-semibold hover:text-indigo-800 underline">
                        Get MY free checklist
                    </a>
                </div>
            </div>
        </section>
    );
}
