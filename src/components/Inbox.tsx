"use client";

import { useState } from "react";
import { Search, Send, MoreVertical, Phone, Video } from "lucide-react";

export function Inbox() {
    const [activeConversation, setActiveConversation] = useState<number | null>(1);
    const [messageInput, setMessageInput] = useState("");

    // Mock Data
    const conversations = [
        {
            id: 1,
            user: "Sarah Jenkins",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            lastMessage: "I've uploaded the session summary.",
            time: "10:30 AM",
            unread: 2,
            online: true
        },
        {
            id: 2,
            user: "Marcus Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
            lastMessage: "Can we reschedule for tomorrow?",
            time: "Yesterday",
            unread: 0,
            online: false
        }
    ];

    const messages = [
        {
            id: 1,
            sender: "Sarah Jenkins",
            text: "Hi there! I've received your target coordinates.",
            time: "10:00 AM",
            isMe: false
        },
        {
            id: 2,
            sender: "Me",
            text: "Great! When can I expect the results?",
            time: "10:05 AM",
            isMe: true
        },
        {
            id: 3,
            sender: "Sarah Jenkins",
            text: "I'll start the session in about an hour. You should have the full report by this afternoon.",
            time: "10:15 AM",
            isMe: false
        },
        {
            id: 4,
            sender: "Sarah Jenkins",
            text: "I've uploaded the session summary. Let me know if you have questions!",
            time: "10:30 AM",
            isMe: false
        }
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-[600px] flex">
            {/* Sidebar / Conversation List */}
            <div className="w-80 border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="font-bold text-slate-900 mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {conversations.map((conv) => (
                        <div
                            key={conv.id}
                            onClick={() => setActiveConversation(conv.id)}
                            className={`p-4 flex gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${activeConversation === conv.id ? "bg-indigo-50 border-r-2 border-indigo-600" : ""}`}
                        >
                            <div className="relative">
                                <img src={conv.avatar} alt={conv.user} className="w-10 h-10 rounded-full object-cover" />
                                {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`font-bold text-sm truncate ${activeConversation === conv.id ? "text-indigo-900" : "text-slate-900"}`}>{conv.user}</span>
                                    <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{conv.time}</span>
                                </div>
                                <p className={`text-xs truncate ${conv.unread > 0 ? "font-bold text-slate-900" : "text-slate-500"}`}>
                                    {conv.lastMessage}
                                </p>
                            </div>
                            {conv.unread > 0 && (
                                <div className="flex items-center">
                                    <span className="w-5 h-5 bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                        {conv.unread}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50">
                {/* Chat Header */}
                <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <img src={conversations[0].avatar} alt="User" className="w-10 h-10 rounded-full object-cover" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">Sarah Jenkins</h3>
                            <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                Online
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <Phone className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <Video className="w-5 h-5" />
                        </button>
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[70%] ${msg.isMe ? "order-1" : "order-2"}`}>
                                <div className={`p-4 rounded-2xl shadow-sm text-sm ${msg.isMe
                                        ? "bg-indigo-600 text-white rounded-br-none"
                                        : "bg-white text-slate-700 border border-slate-200 rounded-bl-none"
                                    }`}>
                                    {msg.text}
                                </div>
                                <span className={`text-[10px] text-slate-400 mt-1 block ${msg.isMe ? "text-right" : "text-left"}`}>
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-200">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                        />
                        <button className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors shadow-sm hover:shadow-md">
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
