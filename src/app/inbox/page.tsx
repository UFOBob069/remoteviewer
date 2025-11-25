import { Inbox } from "@/components/Inbox";

export default function InboxPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">Inbox</h1>
                <Inbox />
            </div>
        </div>
    );
}
