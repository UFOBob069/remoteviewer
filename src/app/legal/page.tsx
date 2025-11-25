import Link from "next/link";
import { Shield, Scale, FileText, Lock } from "lucide-react";

export default function LegalPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">Legal & Ethical Guidelines</h1>

                <div className="grid gap-8">
                    {/* Disclaimer Section */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200" id="disclaimer">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-red-50 rounded-lg">
                                <Scale className="w-6 h-6 text-red-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Platform Disclaimer</h2>
                        </div>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p className="font-bold mb-4">For Entertainment & Exploration Purposes Only</p>
                            <p className="mb-4">
                                The services provided on this platform, including Remote Viewing (CRV, ARV, ERV) and other intuitive sessions, are for entertainment and personal exploration purposes only.
                                They are not scientifically proven and results are not guaranteed.
                            </p>
                            <p className="mb-4">
                                <strong>No Professional Advice:</strong> Viewers on this platform are NOT licensed medical professionals, attorneys, or financial advisors.
                                Information provided during sessions should never be interpreted as medical, legal, or financial advice.
                                Always consult with a qualified professional for such matters.
                            </p>
                            <p>
                                By using this platform, you acknowledge that you are at least 18 years of age and understand the experimental nature of these services.
                            </p>
                        </div>
                    </section>

                    {/* Ethics Code */}
                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200" id="ethics">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-indigo-50 rounded-lg">
                                <Shield className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Code of Ethics</h2>
                        </div>
                        <div className="prose prose-slate max-w-none text-slate-600">
                            <p className="mb-4">
                                We are committed to maintaining a safe and respectful environment. All viewers on our platform agree to adhere to the following ethical standards:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Do No Harm:</strong> Viewers shall not use their skills to harm, manipulate, or exploit others.</li>
                                <li><strong>Privacy & Confidentiality:</strong> All client information and session data must be kept strictly confidential.</li>
                                <li><strong>Honesty & Integrity:</strong> Viewers must represent their skills and training accurately and shall not make false claims about guaranteed outcomes.</li>
                                <li><strong>Empowerment:</strong> Sessions should aim to empower the client, respecting their free will and autonomy.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Privacy & Terms */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-3 mb-6">
                                <Lock className="w-6 h-6 text-slate-400" />
                                <h2 className="text-xl font-bold text-slate-900">Privacy Policy</h2>
                            </div>
                            <p className="text-slate-600 mb-4 text-sm">
                                We value your privacy. Learn how we collect, use, and protect your personal data.
                            </p>
                            <Link href="#" className="text-indigo-600 font-bold text-sm hover:underline">Read Privacy Policy &rarr;</Link>
                        </section>

                        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="w-6 h-6 text-slate-400" />
                                <h2 className="text-xl font-bold text-slate-900">Terms of Service</h2>
                            </div>
                            <p className="text-slate-600 mb-4 text-sm">
                                Understand the rules and regulations guiding the use of our platform.
                            </p>
                            <Link href="#" className="text-indigo-600 font-bold text-sm hover:underline">Read Terms of Service &rarr;</Link>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
