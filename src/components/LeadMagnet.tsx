"use client";

import { Download, Lock } from "lucide-react";

export function LeadMagnet() {
    return (
        <section className="py-20 bg-indigo-900 text-white overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold sm:text-4xl mb-6">
                            Not ready to book? Get the free Session Prep Checklist.
                        </h2>
                        <p className="text-indigo-200 text-lg mb-8">
                            Learn exactly how to phrase your questions and prepare your mind for a remote viewing session to get the best results.
                        </p>

                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-indigo-700 flex items-center justify-center flex-shrink-0">
                                    <span className="font-bold text-sm">1</span>
                                </div>
                                <span className="text-indigo-100">5 essential questions to ask yourself first</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-indigo-700 flex items-center justify-center flex-shrink-0">
                                    <span className="font-bold text-sm">2</span>
                                </div>
                                <span className="text-indigo-100">How to avoid "polluting" the viewer</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="h-6 w-6 rounded-full bg-indigo-700 flex items-center justify-center flex-shrink-0">
                                    <span className="font-bold text-sm">3</span>
                                </div>
                                <span className="text-indigo-100">Interpreting your results guide</span>
                            </li>
                        </ul>

                        <div className="flex items-center gap-4 p-4 bg-indigo-800/50 rounded-lg border border-indigo-700 max-w-md">
                            <div className="h-10 w-10 rounded-full bg-indigo-600 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-medium text-white">"This checklist changed how I approach every session."</p>
                                <p className="text-xs text-indigo-300">- Alex P., Entrepreneur</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white text-slate-900 rounded-2xl p-8 shadow-2xl max-w-md mx-auto lg:ml-auto w-full">
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold">Get the Checklist</h3>
                            <p className="text-slate-500 text-sm">Sent instantly to your inbox.</p>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="goal" className="block text-sm font-medium text-slate-700 mb-1">Main Goal (Optional)</label>
                                <select id="goal" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white">
                                    <option value="">Select a goal...</option>
                                    <option value="business">Business Decision</option>
                                    <option value="personal">Personal Clarity</option>
                                    <option value="lost">Finding Lost Items</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="flex items-start gap-2">
                                <input type="checkbox" id="terms" className="mt-1 rounded text-indigo-600 focus:ring-indigo-500" />
                                <label htmlFor="terms" className="text-xs text-slate-500">
                                    I agree to receive the checklist and occasional updates. Unsubscribe anytime.
                                </label>
                            </div>

                            <button type="submit" className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg flex justify-center items-center gap-2">
                                <Download className="h-4 w-4" />
                                Send ME the checklist
                            </button>

                            <div className="flex justify-center items-center gap-2 text-xs text-slate-400 mt-4">
                                <Lock className="h-3 w-3" />
                                Your info is secure. No spam.
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
