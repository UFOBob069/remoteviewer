"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { sendMessage, subscribeToConversationMessages, subscribeToConversations, Conversation, Message } from "@/lib/db/messages";
import { getSellerProfile } from "@/lib/db/profiles";
import { getUserProfile } from "@/lib/db/users";

function MessagesContent() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const initialToUser = searchParams.get("to");

    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [otherUserName, setOtherUserName] = useState("");

    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Load conversations
    useEffect(() => {
        if (!user) return;
        const unsubscribe = subscribeToConversations(user.uid, (convs) => {
            setConversations(convs);
        });
        return () => unsubscribe();
    }, [user]);

    // Handle initial "to" param
    useEffect(() => {
        if (user && initialToUser) {
            const convId = [user.uid, initialToUser].sort().join("_");
            setSelectedConversationId(convId);
        }
    }, [user, initialToUser]);

    // Load messages for selected conversation
    useEffect(() => {
        if (!selectedConversationId) return;

        const unsubscribe = subscribeToConversationMessages(selectedConversationId, (msgs) => {
            setMessages(msgs);
            scrollToBottom();
        });

        // Fetch other user's name
        const fetchOtherUser = async () => {
            if (!user) return;
            const participants = selectedConversationId.split("_");
            const otherId = participants.find(id => id !== user.uid);
            if (otherId) {
                // Try seller profile first, then user profile
                const seller = await getSellerProfile(otherId);
                if (seller) {
                    setOtherUserName(seller.displayName);
                } else {
                    const userProf = await getUserProfile(otherId);
                    setOtherUserName(userProf?.displayName || "User");
                }
            }
        };
        fetchOtherUser();

        return () => unsubscribe();
    }, [selectedConversationId, user]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !user || !selectedConversationId) return;

        const participants = selectedConversationId.split("_");
        const receiverId = participants.find(id => id !== user.uid);

        if (receiverId) {
            await sendMessage(user.uid, receiverId, newMessage);
            setNewMessage("");
        }
    };

    if (!user) return <div className="p-8">Please log in to view messages.</div>;

    return (
        <div className="max-w-6xl mx-auto h-[calc(100vh-64px)] flex bg-white border-x border-slate-200">
            {/* Sidebar - Conversations List */}
            <div className="w-1/3 border-r border-slate-200 overflow-y-auto">
                <div className="p-4 border-b border-slate-200 bg-slate-50">
                    <h2 className="font-bold text-lg text-slate-800">Messages</h2>
                </div>
                <ul>
                    {conversations.map((conv) => (
                        <li
                            key={conv.id}
                            onClick={() => setSelectedConversationId(conv.id)}
                            className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${selectedConversationId === conv.id ? "bg-indigo-50" : ""}`}
                        >
                            <div className="font-medium text-slate-900 truncate">
                                {/* In a real app, we'd fetch names for all convs. Simplified here. */}
                                Conversation
                            </div>
                            <div className="text-sm text-slate-500 truncate">{conv.lastMessage}</div>
                        </li>
                    ))}
                    {conversations.length === 0 && (
                        <li className="p-8 text-center text-slate-500">No conversations yet.</li>
                    )}
                </ul>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedConversationId ? (
                    <>
                        <div className="p-4 border-b border-slate-200 bg-white shadow-sm flex justify-between items-center">
                            <h3 className="font-bold text-slate-900">{otherUserName || "Chat"}</h3>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                            {messages.map((msg) => {
                                const isMe = msg.senderId === user.uid;
                                return (
                                    <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-sm ${isMe ? "bg-indigo-600 text-white rounded-br-none" : "bg-white text-slate-800 border border-slate-200 rounded-bl-none"}`}>
                                            <p>{msg.content}</p>
                                            <p className={`text-xs mt-1 ${isMe ? "text-indigo-200" : "text-slate-400"}`}>
                                                {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 rounded-full border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"
                                />
                                <button
                                    type="submit"
                                    disabled={!newMessage.trim()}
                                    className="bg-indigo-600 text-white rounded-full px-6 py-2 font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-slate-50 text-slate-400">
                        Select a conversation to start messaging
                    </div>
                )}
            </div>
        </div>
    );
}

export default function MessagesPage() {
    return (
        <Suspense fallback={<div className="p-8">Loading messages...</div>}>
            <MessagesContent />
        </Suspense>
    );
}
