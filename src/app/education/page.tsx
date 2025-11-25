import Link from "next/link";
import { Play, BookOpen, Brain, ArrowRight } from "lucide-react";

export default function EducationPage() {
    const articles = [
        {
            title: "What is Coordinate Remote Viewing (CRV)?",
            excerpt: "Learn about the structured protocol developed by SRI International for the US military.",
            category: "Methodology",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&h=400&fit=crop"
        },
        {
            title: "The Ethics of Remote Viewing",
            excerpt: "Understanding the boundaries and responsibilities of accessing intuitive information.",
            category: "Ethics",
            readTime: "4 min read",
            image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=800&h=400&fit=crop"
        },
        {
            title: "How to Prepare for Your First Session",
            excerpt: "Tips for clients on how to formulate a target and what to expect from a viewer.",
            category: "Guide",
            readTime: "3 min read",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop"
        }
    ];

    const videos = [
        {
            title: "Introduction to Associative Remote Viewing",
            duration: "12:30",
            thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop"
        },
        {
            title: "A Brief History of Project Stargate",
            duration: "18:45",
            thumbnail: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=800&h=450&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="bg-indigo-900 py-20 px-4 text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Remote Viewing Academy</h1>
                <p className="text-indigo-200 max-w-2xl mx-auto text-lg">
                    Explore the history, science, and protocols behind remote viewing.
                    Educate yourself before booking a session.
                </p>
            </div>

            <div className="container mx-auto px-4 py-16 max-w-6xl">
                {/* Featured Articles */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <BookOpen className="w-6 h-6 text-indigo-600" />
                        <h2 className="text-2xl font-bold text-slate-900">Latest Articles</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {articles.map((article, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
                                <div className="h-48 overflow-hidden">
                                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-3">
                                        <span className="text-indigo-600">{article.category}</span>
                                        <span className="text-slate-400">{article.readTime}</span>
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-4">
                                        {article.excerpt}
                                    </p>
                                    <span className="text-indigo-600 text-sm font-bold flex items-center">
                                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Video Section */}
                <div>
                    <div className="flex items-center gap-3 mb-8">
                        <Play className="w-6 h-6 text-red-600" />
                        <h2 className="text-2xl font-bold text-slate-900">Video Library</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {videos.map((video, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group cursor-pointer">
                                <div className="aspect-video bg-slate-900 relative">
                                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Play className="w-8 h-8 text-white fill-current ml-1" />
                                        </div>
                                    </div>
                                    <span className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                                        {video.duration}
                                    </span>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-slate-900 text-lg">{video.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-slate-900 py-16 text-center px-4 mt-12">
                <Brain className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">Ready to experience it yourself?</h2>
                <p className="text-slate-400 mb-8">Connect with a trained viewer today.</p>
                <Link
                    href="/viewers"
                    className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-colors"
                >
                    Find a Viewer
                </Link>
            </div>
        </div>
    );
}
