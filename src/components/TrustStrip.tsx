import { ShieldCheck, Lock, Award } from "lucide-react";

export function TrustStrip() {
    return (
        <section className="bg-slate-900 py-12 border-t border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-green-400">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Vetted Experts</h3>
                        <p className="text-slate-400 text-sm max-w-xs">Every viewer passes a rigorous blind-target test before joining.</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-blue-400">
                            <Lock className="h-6 w-6" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Privacy First</h3>
                        <p className="text-slate-400 text-sm max-w-xs">Your data is encrypted and sessions can be done anonymously.</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-purple-400">
                            <Award className="h-6 w-6" />
                        </div>
                        <h3 className="text-white font-semibold mb-2">Satisfaction Guarantee</h3>
                        <p className="text-slate-400 text-sm max-w-xs">If protocols aren't followed, we'll make it right.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
