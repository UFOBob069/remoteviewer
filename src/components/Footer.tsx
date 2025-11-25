import Link from "next/link";
import { Hexagon } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl mb-4">
                            <Hexagon className="h-8 w-8 text-indigo-500 fill-indigo-500/20" />
                            HireRemoteViews
                        </Link>
                        <p className="text-sm">
                            Connecting you with vetted intuitive professionals for clear, actionable insights.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link></li>
                            <li><Link href="#viewers" className="hover:text-white transition-colors">Browse Viewers</Link></li>
                            <li><Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                            <li><Link href="#apply" className="hover:text-white transition-colors">Apply as Viewer</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Disclaimer</h4>
                        <p className="text-xs leading-relaxed">
                            Remote viewing is an experimental intuitive practice. Information provided by viewers is for entertainment and research purposes only. It should not replace professional legal, medical, or financial advice.
                        </p>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>&copy; {new Date().getFullYear()} Hire Remote Views. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white">Twitter</Link>
                        <Link href="#" className="hover:text-white">LinkedIn</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
