"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, FileText, MessageSquare, Settings, LogOut, User } from "lucide-react";
import { Inbox } from "@/components/Inbox";
import { useAuth } from "@/context/AuthContext";

export function ClientDashboard() {
    const { user, signOut } = useAuth();
    const [activeTab, setActiveTab] = useState("sessions");

    // Mock Data (replace with real data later)
    const sessions = [
        {
            id: 1,
            viewer: "Sarah Jenkins",
            type: "Lost Item Location",
            date: "Oct 24, 2023",
            status: "Completed",
            price: "$45"
        },
        {
            id: 2,
            viewer: "Marcus Chen",
            type: "CRV Session",
            date: "Nov 02, 2023",
            status: "In Progress",
            price: "$120"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-xl font-bold text-indigo-900">
                            {user?.displayName ? `Welcome, ${user.displayName.split(' ')[0]}` : 'Dashboard'}
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">{user?.email}</p>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        <button
                            onClick={() => setActiveTab("sessions")}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === "sessions" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                            <Clock className="w-5 h-5" /> Sessions
                        </button>
                        <button
                            onClick={() => setActiveTab("messages")}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === "messages" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                            <MessageSquare className="w-5 h-5" /> Messages
                        </button>
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === "profile" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                            <User className="w-5 h-5" /> Profile
                        </button>
                        <button
                            onClick={() => setActiveTab("settings")}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${activeTab === "settings" ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}
                        >
                            <Settings className="w-5 h-5" /> Settings
                        </button>
                    </nav>

                    <div className="p-4 border-t border-slate-100">
                        <button
                            onClick={() => signOut()}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut className="w-5 h-5" /> Sign Out
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex justify-between items-center mb-8">
                            <h1 className="text-2xl font-bold text-slate-900">
                                {activeTab === "sessions" && "My Sessions"}
                                {activeTab === "messages" && "Messages"}
                                {activeTab === "profile" && "My Profile"}
                                {activeTab === "settings" && "Account Settings"}
                            </h1>
                            <button className="md:hidden p-2 text-slate-500">
                                <Settings className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Sessions Tab Content */}
                        {activeTab === "sessions" && (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-slate-50 border-b border-slate-200">
                                            <tr>
                                                <th className="px-6 py-4 font-bold text-slate-900">Viewer</th>
                                                <th className="px-6 py-4 font-bold text-slate-900">Session Type</th>
                                                <th className="px-6 py-4 font-bold text-slate-900">Date</th>
                                                <th className="px-6 py-4 font-bold text-slate-900">Status</th>
                                                <th className="px-6 py-4 font-bold text-slate-900">Price</th>
                                                <th className="px-6 py-4 font-bold text-slate-900">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {sessions.map((session) => (
                                                <tr key={session.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-slate-900">{session.viewer}</td>
                                                    <td className="px-6 py-4 text-slate-600">{session.type}</td>
                                                    <td className="px-6 py-4 text-slate-600">{session.date}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${session.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                                            }`}>
                                                            {session.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-medium text-slate-900">{session.price}</td>
                                                    <td className="px-6 py-4">
                                                        <button className="text-indigo-600 hover:text-indigo-900 font-medium">View Details</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {sessions.length === 0 && (
                                    <div className="p-12 text-center text-slate-500">
                                        <FileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                                        <p>No sessions found.</p>
                                        <Link href="/viewers" className="text-indigo-600 font-bold hover:underline mt-2 inline-block">
                                            Book a Session
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Messages Tab Content */}
                        {activeTab === "messages" && (
                            <div className="h-[600px]">
                                <Inbox />
                            </div>
                        )}

                        {/* Profile Tab Content */}
                        {activeTab === "profile" && (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                                <p className="text-slate-500">Profile settings coming soon.</p>
                            </div>
                        )}

                        {/* Settings Tab Content */}
                        {activeTab === "settings" && (
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                                <p className="text-slate-500">Account settings coming soon.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}
