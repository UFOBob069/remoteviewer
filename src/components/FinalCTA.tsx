import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-indigo-600 rounded-3xl p-8 sm:p-16 text-center shadow-2xl relative overflow-hidden">
                    {/* Decorative circles */}
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/2 translate-y-1/2"></div>

                    <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl mb-6 relative z-10">
                        Ready to get clarity on your next big decision?
                    </h2>
                    <p className="text-indigo-100 text-lg max-w-2xl mx-auto mb-10 relative z-10">
                        Don't leave your future to chance. Get the data you need from a professional remote viewer today.
                    </p>

                    <div className="relative z-10">
                        <Link
                            href="#match"
                            className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-lg font-bold rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 transition-colors shadow-lg transform hover:-translate-y-0.5"
                        >
                            Match ME with a remote viewer
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </div>

                    <div className="mt-8 flex justify-center items-center gap-4 relative z-10">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-8 w-8 rounded-full border-2 border-indigo-600 bg-indigo-200"></div>
                            ))}
                        </div>
                        <p className="text-indigo-200 text-sm">Joined by 500+ clients this month</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
