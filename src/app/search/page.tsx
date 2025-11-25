import { getAllSellers } from "@/lib/db/profiles";
import { ViewerCard } from "@/components/ViewerCard";

export const dynamic = "force-dynamic";

export default async function SearchPage() {
    const viewers = await getAllSellers();

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Hire a Remote Viewer</h1>
                    <p className="text-slate-600 mt-2">Find the perfect person to be your eyes on the ground.</p>
                </div>

                {viewers.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
                        <p className="text-slate-500 text-lg">No remote viewers found yet. Be the first to join!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {viewers.map((viewer) => (
                            <ViewerCard key={viewer.uid} viewer={viewer} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
