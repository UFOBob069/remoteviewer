"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getSellerProfile, createOrUpdateSellerProfile, SellerProfile } from "@/lib/db/profiles";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<Partial<SellerProfile>>({
        bio: "",
        location: "",
        skills: [],
        pricing: { hourlyRate: 0 },
    });
    const [skillsInput, setSkillsInput] = useState("");

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
        if (user) {
            loadProfile(user.uid);
        }
    }, [user, loading, router]);

    const loadProfile = async (uid: string) => {
        const data = await getSellerProfile(uid);
        if (data) {
            setProfile(data);
            setSkillsInput(data.skills.join(", "));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setSaving(true);
        try {
            const skillsArray = skillsInput.split(",").map(s => s.trim()).filter(s => s.length > 0);
            await createOrUpdateSellerProfile(user.uid, {
                ...profile,
                skills: skillsArray,
                displayName: user.displayName || "Remote Viewer",
                photoURL: user.photoURL || "",
            });
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to save profile.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Edit Your Profile</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Bio</label>
                    <textarea
                        rows={4}
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        placeholder="Tell clients about your experience and expertise..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Location</label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        placeholder="City, State, Country"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Skills (comma separated)</label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                        value={skillsInput}
                        onChange={(e) => setSkillsInput(e.target.value)}
                        placeholder="Real Estate, Construction, Inspections..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700">Hourly Rate ($)</label>
                    <input
                        type="number"
                        className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                        value={profile.pricing?.hourlyRate}
                        onChange={(e) => setProfile({ ...profile, pricing: { ...profile.pricing, hourlyRate: Number(e.target.value) } })}
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={saving}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save Profile"}
                    </button>
                </div>
            </form>
        </div>
    );
}
