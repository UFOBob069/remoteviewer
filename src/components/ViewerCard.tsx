import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { SellerProfile } from "@/lib/db/profiles";

export function ViewerCard({ viewer }: { viewer: SellerProfile }) {
    return (
        <Link href={`/viewers/${viewer.uid}`} className="block group">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="aspect-[4/3] bg-slate-200 relative">
                    {viewer.photoURL ? (
                        <img src={viewer.photoURL} alt={viewer.displayName} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-400 bg-slate-100">
                            {viewer.displayName.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {viewer.displayName}
                        </h3>
                        <div className="flex items-center gap-1 text-sm">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{viewer.rating || "New"}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-slate-500 mb-3">
                        <MapPin className="w-3 h-3" />
                        {viewer.location || "Remote"}
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-2 mb-4 h-10">
                        {viewer.bio || "No bio available."}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div className="text-xs text-slate-500 uppercase font-semibold tracking-wider">
                            Starting at
                        </div>
                        <div className="font-bold text-slate-900">
                            ${viewer.pricing?.hourlyRate || 0}<span className="text-xs font-normal text-slate-500">/hr</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
