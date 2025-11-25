import Link from "next/link";
import { Star, Shield } from "lucide-react";
import { DUMMY_VIEWERS } from "@/lib/db/profiles";

export function FeaturedViewers() {
    // Take top 3 viewers
    const featured = DUMMY_VIEWERS.slice(0, 3);

    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Viewers</h2>
                        <p className="text-slate-600">Top-rated experts for your first session.</p>
                    </div>
                    <Link href="#viewers" className="text-indigo-600 font-bold hover:text-indigo-700 hidden sm:block">
                        View All &rarr;
                    </Link>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {featured.map((viewer) => (
                        <Link href={`/viewers/${viewer.uid}`} key={viewer.uid} className="group block">
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all duration-300">
                                <div className="p-6 flex items-center gap-4 border-b border-slate-100">
                                    <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                                        <img src={viewer.photoURL} alt={viewer.displayName} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">
                                            {viewer.displayName}
                                        </h3>
                                        <div className="flex items-center text-sm text-slate-500">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                            <span className="font-bold text-slate-900">{viewer.rating}</span>
                                            <span className="mx-1">•</span>
                                            <span>{viewer.reviewCount} reviews</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {viewer.methods?.slice(0, 2).map((m) => (
                                            <span key={m} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded uppercase tracking-wider">
                                                {m}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">
                                        {viewer.bio}
                                    </p>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-bold text-slate-900">From ${viewer.pricing?.hourlyRate}</span>
                                        <span className="text-slate-500">{viewer.deliverySpeed} delivery</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-xs text-slate-400 italic">
                        *Views expressed by remote viewers are their own interpretation and for entertainment purposes only.
                    </p>
                </div>
            </div>
        </section>
    );
}
