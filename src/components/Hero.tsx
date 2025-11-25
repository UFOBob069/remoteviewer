"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, Eye, Compass, Brain, AlertCircle } from "lucide-react";
import Link from "next/link";

export function Hero() {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/?q=${encodeURIComponent(query)}#viewers`);
        }
    };

    const quickFilters = [
        { label: "Lost Item Insight", icon: Compass, query: "Lost Item" },
        { label: "Target Description", icon: Eye, query: "CRV" },
        { label: "Energy Readings", icon: Sparkles, query: "Intuitive" },
        { label: "Past Event Impressions", icon: Brain, query: "ERV" },
    ];

    return (
        <section className="relative overflow-hidden bg-slate-900 pt-16 pb-20 lg:pt-24 lg:pb-28">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-indigo-900/50 to-slate-900 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <div className="inline-flex items-center rounded-full bg-indigo-900/50 border border-indigo-500/30 px-3 py-1 text-sm font-medium text-indigo-300 mb-6 backdrop-blur-sm">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Explore the Unseen
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mb-6 leading-tight">
                        Tap Into the Unknown — Book a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Trained Remote Viewer</span>
                    </h1>

                    <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                        Personal insight, intuitive impressions, and coordinate-style remote viewing sessions.
                        Connect with experts to explore what lies beyond the physical.
                    </p>

                    {/* CTA Button */}
                    <div className="flex justify-center mb-12">
                        <Link
                            href="/viewers"
                            className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transition-all hover:scale-105"
                        >
                            Find a Viewer
                        </Link>
                    </div>

                    {/* Quick Filters */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {quickFilters.map((filter) => (
                            <button
                                key={filter.label}
                                onClick={() => router.push(`/viewers?q=${encodeURIComponent(filter.query)}`)}
                                className="flex flex-col items-center justify-center p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all hover:-translate-y-1 group"
                            >
                                <filter.icon className="w-6 h-6 text-indigo-400 mb-2 group-hover:text-indigo-300" />
                                <span className="text-sm font-medium text-slate-300 group-hover:text-white">{filter.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Ethical Note */}
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500 bg-slate-800/30 py-2 px-4 rounded-full inline-block border border-slate-800">
                        <AlertCircle className="w-3 h-3" />
                        <span>All sessions are for personal exploration and entertainment purposes only.</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
