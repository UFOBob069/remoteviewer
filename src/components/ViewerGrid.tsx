"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Star, Filter, Search, Clock, Shield, Camera, Brain } from "lucide-react";
import { getAllSellers, SellerProfile } from "@/lib/db/profiles";

export function ViewerGrid() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q") || "";

    const [viewers, setViewers] = useState<SellerProfile[]>([]);
    const [loading, setLoading] = useState(true);

    const [filterMethod, setFilterMethod] = useState("All");
    const [filterRating, setFilterRating] = useState(0);
    const [sortPrice, setSortPrice] = useState<"asc" | "desc" | null>(null);
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [filterSessionType, setFilterSessionType] = useState<string[]>([]);
    const [filterVerified, setFilterVerified] = useState(false);

    // Fetch data from Firestore
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getAllSellers();
                setViewers(data);
            } catch (error) {
                console.error("Failed to fetch viewers:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // Update search query when URL param changes
    useEffect(() => {
        if (initialQuery) {
            setSearchQuery(initialQuery);
        }
    }, [initialQuery]);

    const toggleFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
        setter(prev => prev.includes(value) ? prev.filter(i => i !== value) : [...prev, value]);
    };

    const filteredViewers = useMemo(() => {
        return viewers.filter(viewer => {
            // Method / Specialty
            if (filterMethod !== "All" && !viewer.methods?.includes(filterMethod as any)) return false;

            // Rating
            if (viewer.rating! < filterRating) return false;

            // Search Query (matches name, bio, location, skills, methods)
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const matches =
                    viewer.displayName?.toLowerCase().includes(q) ||
                    viewer.bio?.toLowerCase().includes(q) ||
                    viewer.location?.toLowerCase().includes(q) ||
                    viewer.skills?.some(s => s.toLowerCase().includes(q)) ||
                    viewer.methods?.some(m => m.toLowerCase().includes(q));
                if (!matches) return false;
            }

            // Session Type
            if (filterSessionType.length > 0 && !filterSessionType.some(t => viewer.sessionTypes?.includes(t as any))) return false;

            // Verified Badge
            if (filterVerified && !viewer.badges?.includes("Verified")) return false;

            return true;
        }).sort((a, b) => {
            if (sortPrice === "asc") return (a.pricing?.hourlyRate || 0) - (b.pricing?.hourlyRate || 0);
            if (sortPrice === "desc") return (b.pricing?.hourlyRate || 0) - (a.pricing?.hourlyRate || 0);
            return 0;
        });
    }, [viewers, filterMethod, filterRating, sortPrice, searchQuery, filterSessionType, filterVerified]);

    if (loading) {
        return (
            <section className="py-12 bg-slate-50" id="viewers">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Skeleton Sidebar */}
                        <div className="w-full lg:w-72 flex-shrink-0 space-y-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-[600px] animate-pulse">
                                <div className="h-6 bg-slate-200 rounded w-1/2 mb-6"></div>
                                <div className="space-y-6">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="space-y-2">
                                            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                                            <div className="h-10 bg-slate-200 rounded w-full"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Skeleton Grid */}
                        <div className="flex-1">
                            <div className="mb-6 h-8 bg-slate-200 rounded w-1/3 animate-pulse"></div>
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-[450px] animate-pulse">
                                        <div className="aspect-[4/3] bg-slate-200"></div>
                                        <div className="p-5 space-y-4">
                                            <div className="flex justify-between">
                                                <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                                                <div className="h-6 bg-slate-200 rounded w-1/4"></div>
                                            </div>
                                            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 bg-slate-200 rounded w-full"></div>
                                                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="h-6 bg-slate-200 rounded w-1/4"></div>
                                                <div className="h-6 bg-slate-200 rounded w-1/4"></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 bg-slate-50" id="viewers">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-full lg:w-72 flex-shrink-0 space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
                            <div className="flex items-center gap-2 font-bold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                                <Filter className="w-5 h-5" />
                                Filters
                            </div>

                            {/* Search Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-slate-900 mb-2">Search Keywords</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="e.g. Lost Item, CRV..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-2.5"
                                    />
                                </div>
                            </div>

                            {/* Method / Specialty */}
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-slate-900 mb-2">Specialty / Method</label>
                                <select
                                    value={filterMethod}
                                    onChange={(e) => setFilterMethod(e.target.value)}
                                    className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-2.5"
                                >
                                    <option value="All">All Methods</option>
                                    <option value="CRV">Coordinate Remote Viewing (CRV)</option>
                                    <option value="ARV">Associative Remote Viewing (ARV)</option>
                                    <option value="ERV">Extended Remote Viewing (ERV)</option>
                                    <option value="Intuitive">Intuitive / Psychic</option>
                                    <option value="Dream">Dream Interpretation</option>
                                </select>
                            </div>

                            {/* Session Type */}
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-slate-900 mb-2">Session Type</label>
                                <div className="space-y-2">
                                    {["Blind", "Live Video", "Audio", "Written", "Lost Item"].map((opt) => (
                                        <label key={opt} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={filterSessionType.includes(opt)}
                                                onChange={() => toggleFilter(setFilterSessionType, opt)}
                                                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="ml-2 text-sm text-slate-600">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Sort */}
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-slate-900 mb-2">Price</label>
                                <select
                                    value={sortPrice || ""}
                                    onChange={(e) => setSortPrice(e.target.value as "asc" | "desc" | null)}
                                    className="w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm py-2.5"
                                >
                                    <option value="">Relevance</option>
                                    <option value="asc">Low to High</option>
                                    <option value="desc">High to Low</option>
                                </select>
                            </div>

                            {/* Badges */}
                            <div className="mb-6">
                                <label className="flex items-center p-3 border border-indigo-100 bg-indigo-50 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={filterVerified}
                                        onChange={(e) => setFilterVerified(e.target.checked)}
                                        className="rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="ml-2 text-sm font-bold text-indigo-900 flex items-center gap-1">
                                        <Shield className="w-3 h-3 mr-1" /> Verified Only
                                    </span>
                                </label>
                            </div>

                            {/* Rating Filter */}
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-2">Min Rating</label>
                                <div className="space-y-2">
                                    {[4, 3, 2].map((stars) => (
                                        <label key={stars} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="rating"
                                                checked={filterRating === stars}
                                                onChange={() => setFilterRating(stars)}
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-300"
                                            />
                                            <span className="ml-2 text-sm text-slate-600 flex items-center">
                                                {stars}+ <Star className="w-3 h-3 ml-1 fill-current text-yellow-400" />
                                            </span>
                                        </label>
                                    ))}
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="rating"
                                            checked={filterRating === 0}
                                            onChange={() => setFilterRating(0)}
                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-300"
                                        />
                                        <span className="ml-2 text-sm text-slate-600">Any</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Grid */}
                    <div className="flex-1">
                        <div className="mb-6 flex justify-between items-end">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Available Viewers</h2>
                                <p className="text-slate-500 mt-1">
                                    {filteredViewers.length} experts found {searchQuery && `matching "${searchQuery}"`}
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredViewers.map((viewer) => (
                                <Link href={`/viewers/${viewer.uid}`} key={viewer.uid} className="group block">
                                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col h-full">
                                        {/* Card Image / Portfolio Preview */}
                                        <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
                                            {viewer.portfolio && viewer.portfolio[0] ? (
                                                <img src={viewer.portfolio[0]} alt="Portfolio" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                    <Camera className="w-8 h-8" />
                                                </div>
                                            )}

                                            {/* Badges Overlay */}
                                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                                                {viewer.badges?.includes("Verified") && (
                                                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-indigo-600 flex items-center shadow-sm">
                                                        <Shield className="w-3 h-3 mr-1" /> VERIFIED
                                                    </span>
                                                )}
                                                {viewer.availability === "Now" && (
                                                    <span className="bg-green-500/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-white flex items-center shadow-sm">
                                                        <Clock className="w-3 h-3 mr-1" /> AVAILABLE NOW
                                                    </span>
                                                )}
                                            </div>

                                            {/* Avatar Overlay */}
                                            <div className="absolute -bottom-3 right-3">
                                                <div className="h-12 w-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                                                    <img src={viewer.photoURL} alt={viewer.displayName} className="w-full h-full object-cover" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-5 pt-6 flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors line-clamp-1">
                                                    {viewer.displayName}
                                                </h3>
                                                <div className="flex items-center text-sm font-bold text-slate-900">
                                                    <Star className="w-3 h-3 fill-current text-yellow-400 mr-1" />
                                                    {viewer.rating}
                                                    <span className="text-slate-400 font-normal ml-1">({viewer.reviewCount})</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
                                                <Brain className="w-3 h-3" />
                                                {viewer.training ? "Trained Viewer" : "Intuitive"}
                                            </div>

                                            <p className="text-slate-600 text-sm mb-4 line-clamp-2 flex-1">
                                                {viewer.bio}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {viewer.methods?.slice(0, 2).map((tag, i) => (
                                                    <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md font-bold uppercase tracking-wider">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                                <div className="text-xs text-slate-500">
                                                    Starting at
                                                </div>
                                                <div className="font-bold text-slate-900 text-lg">
                                                    ${viewer.pricing?.hourlyRate}
                                                    <span className="text-xs font-normal text-slate-500">/session</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
