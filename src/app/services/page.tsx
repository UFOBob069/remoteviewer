import Link from "next/link";
import { Eye, Brain, Search, HelpCircle, ArrowRight } from "lucide-react";

export default function ServicesPage() {
    const services = [
        {
            icon: <Eye className="w-12 h-12 text-indigo-600" />,
            title: "Coordinate Remote Viewing (CRV)",
            description: "Structured, protocol-based sessions ideal for describing locations, objects, or events with high detail.",
            features: ["Strict Protocol", "Blind Targets", "Detailed Sketches"],
            link: "/viewers?method=CRV"
        },
        {
            icon: <Brain className="w-12 h-12 text-purple-600" />,
            title: "Associative Remote Viewing (ARV)",
            description: "Binary choice methodology often used for predicting outcomes or making decisions.",
            features: ["Outcome Prediction", "Binary Choices", "Data-Driven"],
            link: "/viewers?method=ARV"
        },
        {
            icon: <Search className="w-12 h-12 text-blue-600" />,
            title: "Lost Item Location",
            description: "Specialized intuitive sessions focused on locating lost objects, pets, or understanding missing contexts.",
            features: ["Map Dowsing", "Location Descriptors", "Sensory Data"],
            link: "/viewers?method=Intuitive"
        },
        {
            icon: <HelpCircle className="w-12 h-12 text-teal-600" />,
            title: "General Intuitive Guidance",
            description: "Free-form intuitive sessions for personal insight, exploration, and creative problem solving.",
            features: ["Personal Insight", "Creative Blocks", "Life Path"],
            link: "/viewers?method=Intuitive"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="bg-slate-900 py-20 text-center px-4">
                <h1 className="text-4xl font-bold text-white mb-4">Explore Our Services</h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Connect with trained remote viewers and intuitive experts for a variety of session types.
                    Whether you need structured data or creative insight, we have a specialist for you.
                </p>
            </div>

            {/* Services Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                            <div className="mb-6 bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                {service.description}
                            </p>
                            <ul className="space-y-2 mb-8">
                                {service.features.map((feature, i) => (
                                    <li key={i} className="flex items-center text-sm text-slate-500 font-medium">
                                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={service.link}
                                className="inline-flex items-center font-bold text-indigo-600 hover:text-indigo-700"
                            >
                                Find Experts <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="bg-indigo-900 py-16 text-center px-4">
                <h2 className="text-3xl font-bold text-white mb-6">Not sure what you need?</h2>
                <Link
                    href="/viewers"
                    className="inline-block bg-white text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors"
                >
                    Browse All Viewers
                </Link>
            </div>
        </div>
    );
}
