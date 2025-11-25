import { Star } from "lucide-react";

export function SocialProof() {
    return (
        <section className="bg-slate-50 border-y border-slate-200 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                    {/* Summary Stat */}
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-300 overflow-hidden">
                                    <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-400"></div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            </div>
                            <p className="text-sm font-medium text-slate-700">
                                <span className="font-bold">4.9</span> average rating from 200+ sessions
                            </p>
                        </div>
                    </div>

                    {/* Divider (hidden on mobile) */}
                    <div className="hidden md:block h-8 w-px bg-slate-300"></div>

                    {/* Mini Testimonials */}
                    <div className="flex gap-6 overflow-x-auto pb-2 md:pb-0 max-w-full">
                        <div className="flex items-center gap-3 min-w-[200px]">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">Sarah J.</p>
                                <p className="text-xs text-slate-500">"Found clarity instantly."</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 min-w-[200px]">
                            <div className="h-10 w-10 rounded-full bg-purple-100 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-semibold text-slate-900">Michael R.</p>
                                <p className="text-xs text-slate-500">"Saved me months of worry."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
