import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const tiers = [
    {
        name: "Premium Concierge",
        price: "$499",
        description: "For critical, high-stakes business decisions requiring maximum depth.",
        features: [
            "Senior-level Remote Viewer",
            "Comprehensive 10-page report",
            "Follow-up consultation call",
            "Priority 24h turnaround",
            "Blind targeting protocol",
        ],
        cta: "Book MY Premium session",
        highlight: false,
    },
    {
        name: "Standard Session",
        price: "$199",
        description: "Perfect for most personal and professional inquiries.",
        features: [
            "Vetted Professional Viewer",
            "Detailed written summary",
            "Standard 48h turnaround",
            "Email support",
            "Secure digital delivery",
        ],
        cta: "Book MY Standard session",
        highlight: true,
        badge: "Most Popular",
    },
    {
        name: "Starter Insight",
        price: "$99",
        description: "A quick look at a specific question or simple situation.",
        features: [
            "Certified Viewer",
            "Brief summary report",
            "72h turnaround",
            "Standard protocols",
        ],
        cta: "Start MY first session",
        highlight: false,
    },
];

export function Pricing() {
    return (
        <section className="py-20 bg-slate-50" id="pricing">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">
                        Simple, transparent pricing
                    </h2>
                    <p className="text-lg text-slate-600">
                        Choose the level of depth you need. No hidden fees.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className={cn(
                                "rounded-2xl p-8 border bg-white relative flex flex-col",
                                tier.highlight
                                    ? "border-indigo-600 shadow-xl scale-105 z-10"
                                    : "border-slate-200 shadow-sm"
                            )}
                        >
                            {tier.badge && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                                    {tier.badge}
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                                <p className="text-slate-500 text-sm mt-2 min-h-[40px]">{tier.description}</p>
                            </div>

                            <div className="mb-6">
                                <span className="text-4xl font-extrabold text-slate-900">{tier.price}</span>
                                <span className="text-slate-500">/session</span>
                            </div>

                            <ul className="space-y-4 mb-8 flex-1">
                                {tier.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                                        <span className="text-slate-700 text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={cn(
                                    "w-full py-3 px-4 rounded-lg font-semibold transition-colors",
                                    tier.highlight
                                        ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md"
                                        : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                                )}
                            >
                                {tier.cta}
                            </button>

                            {tier.highlight && (
                                <p className="text-xs text-center text-red-500 mt-3 font-medium">
                                    Limited weekly slots available
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
