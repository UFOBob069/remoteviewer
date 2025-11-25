import { UserPlus, Send, Sparkles } from "lucide-react";

export function HowItWorks() {
    const steps = [
        {
            icon: UserPlus,
            title: "1. Choose a Viewer",
            description: "Browse profiles, read reviews, and find a remote viewer whose style resonates with you (CRV, Intuitive, etc.).",
        },
        {
            icon: Send,
            title: "2. Submit Your Target",
            description: "Send a blind target ID (e.g., '8392-1042') or a specific question. You decide how much information to share.",
        },
        {
            icon: Sparkles,
            title: "3. Receive Insight",
            description: "Get a detailed session summary, sketches, or impressions delivered directly to your inbox.",
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Simple, secure, and designed for personal exploration.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-indigo-100 -z-10"></div>

                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg">
                                <step.icon className="w-10 h-10 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-600 leading-relaxed max-w-xs">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
