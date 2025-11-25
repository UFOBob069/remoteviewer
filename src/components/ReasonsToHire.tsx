import React from 'react';
import { CheckCircle2, MapPin, Shield, Camera, DollarSign, Heart, Briefcase, Scale, Home, UserCheck } from 'lucide-react';

const reasons = [
    {
        icon: MapPin,
        title: "Eyes on Location",
        description: "Verify conditions instantly. No travel needed.",
    },
    {
        icon: UserCheck,
        title: "Skip the Trip",
        description: "Save hours of driving. We go so you don't have to.",
    },
    {
        icon: Shield,
        title: "Neutral Verification",
        description: "Unbiased facts for disputes, claims, and peace of mind.",
    },
    {
        icon: Camera,
        title: "Visual Proof",
        description: "HD photos and videos delivered to your inbox.",
    },
    {
        icon: DollarSign,
        title: "Buy with Confidence",
        description: "Verify items exist before you pay. Avoid scams.",
    },
    {
        icon: Heart,
        title: "Check on Loved Ones",
        description: "Ensure family and pets are safe when you're away.",
    },
    {
        icon: Briefcase,
        title: "Business Compliance",
        description: "Inventory checks, mystery shopping, and site audits.",
    },
    {
        icon: Scale,
        title: "Document Everything",
        description: "Timestamped evidence for legal and safety needs.",
    },
    {
        icon: Home,
        title: "Property Checks",
        description: "Inspect vacation rentals, roofs, and repairs remotely.",
    },
    {
        icon: UserCheck,
        title: "Total Control",
        description: "Be everywhere at once. Manage assets from anywhere.",
    },
];

export function ReasonsToHire() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        10 Reasons to Hire a Remote Viewer
                    </h2>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        From business inspections to personal peace of mind, remote viewers provide the eyes you need, where you need them.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((reason, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                                <reason.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-3">
                                {index + 1}. {reason.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
