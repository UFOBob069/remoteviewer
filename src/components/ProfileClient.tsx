"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, MapPin, Clock, Shield, Check, Globe, MessageSquare, Heart, Share2, Flag, Brain } from "lucide-react";
import { SellerProfile } from "@/lib/db/profiles";
import { BookingModal } from "@/components/BookingModal";

interface ProfileClientProps {
    profile: SellerProfile;
}

export function ProfileClient({ profile }: ProfileClientProps) {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header / Cover */}
            <div className="h-64 bg-slate-900 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-slate-900 opacity-90"></div>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-200">
                                        <img src={profile.photoURL} alt={profile.displayName} className="w-full h-full object-cover" />
                                    </div>
                                    {profile.availability === "Now" && (
                                        <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h1 className="text-3xl font-bold text-slate-900 mb-2">{profile.displayName}</h1>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
                                                <span className="flex items-center font-bold text-slate-900">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                                    {profile.rating} <span className="text-slate-500 font-normal ml-1">({profile.reviewCount})</span>
                                                </span>
                                                <span className="flex items-center">
                                                    <MapPin className="w-4 h-4 mr-1" /> {profile.location}
                                                </span>
                                                {profile.badges?.includes("Verified") && (
                                                    <span className="flex items-center text-indigo-600 font-medium">
                                                        <Shield className="w-4 h-4 mr-1" /> Verified
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                                                <Heart className="w-5 h-5" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                                                <Share2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-lg text-slate-700 leading-relaxed">
                                        {profile.bio}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Portfolio */}
                        {profile.portfolio && profile.portfolio.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                                <h2 className="text-xl font-bold text-slate-900 mb-6">Portfolio</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {profile.portfolio.map((img, i) => (
                                        <div key={i} className="aspect-video rounded-lg overflow-hidden bg-slate-100 relative group cursor-pointer">
                                            <img src={img} alt={`Portfolio ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* About / Stats */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">About Me</h2>

                            {/* Training & Ethics */}
                            <div className="mb-8 space-y-6">
                                {profile.training && (
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <Brain className="w-4 h-4 text-indigo-600" /> Training & Background
                                        </h3>
                                        <p className="text-slate-600 text-sm">{profile.training}</p>
                                    </div>
                                )}
                                {profile.ethics && (
                                    <div>
                                        <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-green-600" /> Ethical Guidelines
                                        </h3>
                                        <p className="text-slate-600 text-sm italic">"{profile.ethics}"</p>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 border-t border-slate-100 pt-8">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <Globe className="w-5 h-5 text-slate-400" />
                                        <span className="font-medium">Languages:</span>
                                        <span>{profile.languages?.join(", ") || "English"}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <Clock className="w-5 h-5 text-slate-400" />
                                        <span className="font-medium">Avg. Response:</span>
                                        <span>{profile.responseTime || "1 hour"}</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <Check className="w-5 h-5 text-slate-400" />
                                        <span className="font-medium">Completed Sessions:</span>
                                        <span>{profile.completedJobs || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-700">
                                        <MapPin className="w-5 h-5 text-slate-400" />
                                        <span className="font-medium">From:</span>
                                        <span>{profile.location}</span>
                                    </div>
                                </div>
                            </div>

                            <h3 className="font-bold text-slate-900 mb-4">Methods & Specialties</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.methods?.map((method, i) => (
                                    <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold uppercase tracking-wider">
                                        {method}
                                    </span>
                                ))}
                                {profile.skills?.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Reviews (Mock) */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                            <div className="flex items-center gap-2 mb-6">
                                <h2 className="text-xl font-bold text-slate-900">Reviews</h2>
                                <span className="text-slate-500 text-lg">({profile.reviewCount})</span>
                            </div>

                            <div className="space-y-8">
                                {[1, 2].map((i) => (
                                    <div key={i} className="border-b border-slate-100 last:border-0 pb-8 last:pb-0">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                                            <div>
                                                <div className="font-bold text-slate-900">Client Name</div>
                                                <div className="flex items-center text-xs text-slate-500">
                                                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                                                    5.0 • 2 weeks ago
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-slate-600 text-sm">
                                            "Excellent work! Very professional and detailed. The photos were high quality and exactly what I needed. Highly recommended!"
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-slate-500 font-medium">Hourly Rate</span>
                                    <span className="text-3xl font-bold text-slate-900">${profile.pricing?.hourlyRate}</span>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <Clock className="w-4 h-4 text-green-600" />
                                        <span className="font-medium text-green-600">Available {profile.availability}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <Check className="w-4 h-4 text-slate-400" />
                                        <span>Background Checked</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600">
                                        <Shield className="w-4 h-4 text-slate-400" />
                                        <span>Secure Payment Escrow</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => setIsBookingModalOpen(true)}
                                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                                    >
                                        Book Now
                                    </button>
                                    <button className="w-full py-3 px-4 bg-white border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                                        <MessageSquare className="w-4 h-4" />
                                        Contact Me
                                    </button>
                                </div>

                                <div className="mt-4 text-center">
                                    <button className="text-xs text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1 mx-auto">
                                        <Flag className="w-3 h-3" /> Report this profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => setIsBookingModalOpen(false)}
                viewerName={profile.displayName}
                hourlyRate={profile.pricing?.hourlyRate || 0}
            />

            {/* Global Disclaimer */}
            <div className="container mx-auto px-4 mt-8 text-center">
                <p className="text-xs text-slate-400 max-w-2xl mx-auto">
                    Disclaimer: All sessions are for entertainment and personal exploration purposes only.
                    Remote viewing is an experimental intuitive practice and results are not guaranteed.
                    Viewers do not provide medical, legal, or financial advice.
                </p>
            </div>
        </div>
    );
}
