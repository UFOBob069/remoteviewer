"use client";

import { useState } from "react";
import { X, Send, Calendar, MapPin, Camera, ArrowRight } from "lucide-react";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    viewerName: string;
    hourlyRate: number;
}

export function BookingModal({ isOpen, onClose, viewerName, hourlyRate }: BookingModalProps) {
    if (!isOpen) return null;

    const [step, setStep] = useState(1);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="text-lg font-bold text-slate-900">Send a Brief to {viewerName}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto">
                    {step === 1 ? (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-2">
                                    Where do you need the viewer to go?
                                </label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter full address"
                                        className="w-full pl-10 rounded-lg border-slate-300 focus:ring-indigo-500 focus:border-indigo-500 py-3"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-2">
                                    What do you need checked?
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Describe exactly what you need verified. Be specific about photos, videos, or conditions to check."
                                    className="w-full rounded-lg border-slate-300 focus:ring-indigo-500 focus:border-indigo-500 p-3"
                                ></textarea>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-900 mb-2">
                                        When?
                                    </label>
                                    <select className="w-full rounded-lg border-slate-300 focus:ring-indigo-500 focus:border-indigo-500 py-3">
                                        <option>As soon as possible</option>
                                        <option>Within 24 hours</option>
                                        <option>Specific date...</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-900 mb-2">
                                        Media Required
                                    </label>
                                    <select className="w-full rounded-lg border-slate-300 focus:ring-indigo-500 focus:border-indigo-500 py-3">
                                        <option>Photos only</option>
                                        <option>Photos + Video</option>
                                        <option>Live Video Call</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                <Send className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Brief Sent!</h3>
                            <p className="text-slate-600 max-w-md mx-auto">
                                {viewerName} has received your request. They typically respond within 1 hour. You'll be notified when they accept.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {step === 1 && (
                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                        <div className="text-sm text-slate-500">
                            Estimated: <span className="font-bold text-slate-900">${hourlyRate} - ${hourlyRate * 2}</span>
                        </div>
                        <button
                            onClick={() => setStep(2)}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors flex items-center"
                        >
                            Send Request <ArrowRight className="ml-2 w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
