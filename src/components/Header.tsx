"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Eye, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";

export function Header() {
    const { user, userRole, signOut } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <Eye className="h-8 w-8 text-indigo-500" />
                            <span className="font-bold text-xl text-white tracking-tight">RemoteView</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link href="/#viewers" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                            Find a Viewer
                        </Link>
                        <Link href="/services" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                            Services
                        </Link>
                        <Link href="/education" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                            Learn
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4 ml-4">
                                <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </button>
                                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                                    {user.displayName ? user.displayName[0].toUpperCase() : <User className="w-4 h-4" />}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4 ml-4">
                                <Link href="/login" className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
                                    Log in
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign up
                                </Link>
                                <Link
                                    href="/become-a-viewer"
                                    className="px-4 py-2 border border-slate-600 rounded-md shadow-sm text-sm font-medium text-slate-300 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Become a Viewer
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-slate-900 border-b border-slate-800">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/#viewers" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">
                            Find a Viewer
                        </Link>
                        <Link href="/services" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">
                            Services
                        </Link>
                        <Link href="/education" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">
                            Learn
                        </Link>

                        {user ? (
                            <>
                                <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => signOut()}
                                    className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">
                                    Log in
                                </Link>
                                <Link href="/signup" className="block px-3 py-2 rounded-md text-base font-medium text-indigo-400 hover:text-indigo-300 hover:bg-slate-800">
                                    Sign up
                                </Link>
                                <Link href="/become-a-viewer" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">
                                    Become a Viewer
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
