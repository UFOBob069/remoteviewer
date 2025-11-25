"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Eye, EyeOff, Mail, Lock, User, Brain, MapPin, DollarSign, Clock, BookOpen, Shield } from "lucide-react";

export default function BecomeViewerPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        specialty: "CRV",
        location: "",
        bio: "",
        experienceYears: 0,
        hourlyRate: 50,
        sessionTypes: [] as string[],
        languages: "English",
        ethicsAgreement: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSessionTypeChange = (type: string) => {
        setFormData(prev => {
            if (prev.sessionTypes.includes(type)) {
                return { ...prev, sessionTypes: prev.sessionTypes.filter(t => t !== type) };
            } else {
                return { ...prev, sessionTypes: [...prev.sessionTypes, type] };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        if (!formData.ethicsAgreement) {
            setError("You must agree to the Code of Ethics to join.");
            return;
        }

        if (formData.sessionTypes.length === 0) {
            setError("Please select at least one session type.");
            return;
        }

        setLoading(true);

        try {
            // Create Auth User
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            // Update Profile Display Name
            await updateProfile(user, {
                displayName: formData.name
            });

            // Create Seller Profile in Firestore
            await setDoc(doc(db, "profiles", user.uid), {
                uid: user.uid,
                displayName: formData.name,
                email: formData.email,
                bio: formData.bio,
                location: formData.location,
                methods: [formData.specialty],
                role: "seller",
                rating: 0,
                reviewCount: 0,
                pricing: { hourlyRate: Number(formData.hourlyRate) },
                experienceYears: Number(formData.experienceYears),
                sessionTypes: formData.sessionTypes,
                languages: formData.languages.split(",").map(l => l.trim()),
                ethics: "I agree to the Psychic Platform Code of Ethics.",
                createdAt: new Date().toISOString(),
                photoURL: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" // Default placeholder
            });

            router.push("/dashboard");
        } catch (err: any) {
            console.error("Sign up error:", err);
            if (err.code === "auth/email-already-in-use") {
                setError("Email is already in use");
            } else {
                setError("Failed to create account. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-4">
                    <Brain className="w-12 h-12 text-indigo-500" />
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold text-white">
                    Join as a Remote Viewer
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Share your intuitive gifts with the world.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="bg-slate-800 py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-slate-700">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-900/50 border border-red-800 text-red-200 px-4 py-3 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Basic Info */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Account Info</h3>
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                                        Display Name
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            className="bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-slate-600 rounded-md py-2 text-white placeholder-slate-400"
                                            placeholder="Mystic Oracle"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                        Email address
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-slate-600 rounded-md py-2 text-white placeholder-slate-400"
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                                        Password
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-10 sm:text-sm border-slate-600 rounded-md py-2 text-white placeholder-slate-400"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-slate-500" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-slate-500" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Professional Info */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-white border-b border-slate-700 pb-2">Professional Profile</h3>

                                <div>
                                    <label htmlFor="specialty" className="block text-sm font-medium text-slate-300">
                                        Primary Method
                                    </label>
                                    <select
                                        id="specialty"
                                        name="specialty"
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-slate-700 text-white"
                                        value={formData.specialty}
                                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                    >
                                        <option value="CRV">Coordinate Remote Viewing (CRV)</option>
                                        <option value="ARV">Associative Remote Viewing (ARV)</option>
                                        <option value="ERV">Extended Remote Viewing (ERV)</option>
                                        <option value="Intuitive">Intuitive / Psychic</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="experienceYears" className="block text-sm font-medium text-slate-300">
                                            Years Exp.
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <input
                                                id="experienceYears"
                                                name="experienceYears"
                                                type="number"
                                                min="0"
                                                required
                                                className="bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-600 rounded-md py-2 text-white placeholder-slate-400 pl-3"
                                                value={formData.experienceYears}
                                                onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="hourlyRate" className="block text-sm font-medium text-slate-300">
                                            Hourly Rate ($)
                                        </label>
                                        <div className="mt-1 relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <DollarSign className="h-4 w-4 text-slate-500" />
                                            </div>
                                            <input
                                                id="hourlyRate"
                                                name="hourlyRate"
                                                type="number"
                                                min="1"
                                                required
                                                className="bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-8 sm:text-sm border-slate-600 rounded-md py-2 text-white placeholder-slate-400"
                                                value={formData.hourlyRate}
                                                onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium text-slate-300">
                                        Location
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <MapPin className="h-5 w-5 text-slate-500" />
                                        </div>
                                        <input
                                            id="location"
                                            name="location"
                                            type="text"
                                            required
                                            className="bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-slate-600 rounded-md py-2 text-white placeholder-slate-400"
                                            placeholder="City, Country"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bio & Details */}
                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-slate-300">
                                Professional Bio
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="bio"
                                    name="bio"
                                    rows={3}
                                    className="bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-slate-600 rounded-md text-white placeholder-slate-400 p-2"
                                    placeholder="Describe your methodology, training, and what clients can expect..."
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Session Types */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Session Types Offered
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {["Blind", "Live Video", "Audio", "Written", "Lost Item"].map((type) => (
                                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.sessionTypes.includes(type)}
                                            onChange={() => handleSessionTypeChange(type)}
                                            className="rounded border-slate-600 bg-slate-700 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="text-sm text-slate-300">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Languages */}
                        <div>
                            <label htmlFor="languages" className="block text-sm font-medium text-slate-300">
                                Languages (comma separated)
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <BookOpen className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    id="languages"
                                    name="languages"
                                    type="text"
                                    className="bg-slate-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-slate-600 rounded-md py-2 text-white placeholder-slate-400"
                                    placeholder="English, Spanish, German"
                                    value={formData.languages}
                                    onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Ethics Agreement */}
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="ethics"
                                    name="ethics"
                                    type="checkbox"
                                    required
                                    checked={formData.ethicsAgreement}
                                    onChange={(e) => setFormData({ ...formData, ethicsAgreement: e.target.checked })}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-600 rounded bg-slate-700"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="ethics" className="font-medium text-slate-300">
                                    I agree to the Code of Ethics
                                </label>
                                <p className="text-slate-500">
                                    I pledge to use my abilities responsibly, ethically, and with integrity. I will not provide medical diagnoses or legal advice.
                                </p>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating profile..." : "Create Viewer Profile"}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-700" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-slate-800 text-slate-400">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link href="/login" className="font-medium text-indigo-400 hover:text-indigo-300">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
