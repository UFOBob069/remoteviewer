import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

export function PASSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">
                        When the stakes are high, guesswork is expensive.
                    </h2>
                    <p className="text-lg text-slate-600">
                        You have a big decision to make. But the path forward isn't clear.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Problem & Agitate */}
                    <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
                        <div className="flex items-center gap-3 mb-6">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                            <h3 className="text-xl font-semibold text-red-900">The Cost of Uncertainty</h3>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-red-800">
                                    <span className="font-semibold">Decision Paralysis:</span> You're stuck analyzing the same data without getting anywhere.
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-red-800">
                                    <span className="font-semibold">Hidden Risks:</span> Missing a critical detail could cost you money or relationships.
                                </p>
                            </li>
                            <li className="flex items-start gap-3">
                                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-red-800">
                                    <span className="font-semibold">Anxiety:</span> The stress of "not knowing" keeps you up at night.
                                </p>
                            </li>
                        </ul>
                    </div>

                    {/* Solve */}
                    <div className="bg-green-50 rounded-2xl p-8 border border-green-100 shadow-lg relative">
                        <div className="absolute -top-4 -right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                            The Solution
                        </div>
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                            <h3 className="text-xl font-semibold text-green-900">Clarity on Demand</h3>
                        </div>
                        <p className="text-green-800 mb-6">
                            Hire Remote Views gives you a direct line to vetted intuitive experts. No woo-woo, just structured data to help you decide.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-green-900 font-medium">Vetted professionals</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-green-900 font-medium">Structured, written reports</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                <span className="text-green-900 font-medium">Unbiased insights</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
