"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ProfileClient } from "@/components/ProfileClient";
import { SellerProfile, getSellerProfile } from "@/lib/db/profiles";

export default function ViewerProfilePage() {
    const params = useParams();
    const [profile, setProfile] = useState<SellerProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProfile() {
            if (!params.id) return;

            try {
                const data = await getSellerProfile(params.id as string);
                if (data) {
                    setProfile(data);
                } else {
                    setError("Viewer not found");
                }
            } catch (err) {
                console.error("Error fetching profile:", err);
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Oops!</h1>
                    <p className="text-slate-600">{error || "Viewer not found"}</p>
                </div>
            </div>
        );
    }

    return <ProfileClient profile={profile} />;
}
