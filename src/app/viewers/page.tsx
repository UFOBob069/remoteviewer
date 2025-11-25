import { Suspense } from "react";
import { ViewerGrid } from "@/components/ViewerGrid";

export default function ViewersPage() {
    return (
        <main className="min-h-screen bg-slate-50 pt-16">
            <Suspense fallback={<div className="container mx-auto px-4 py-12">Loading viewers...</div>}>
                <ViewerGrid />
            </Suspense>
        </main>
    );
}
