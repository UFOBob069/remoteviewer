import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, orderBy, onSnapshot, Timestamp, getDocs, doc, setDoc, getDoc } from "firebase/firestore";

export interface Message {
    id?: string;
    senderId: string;
    receiverId: string;
    content: string;
    createdAt: Timestamp;
    read: boolean;
}

export interface Conversation {
    id: string;
    participants: string[];
    lastMessage: string;
    lastMessageTime: Timestamp;
    unreadCount: number;
}

export async function sendMessage(senderId: string, receiverId: string, content: string) {
    try {
        // 1. Add message to messages collection
        const conversationId = [senderId, receiverId].sort().join("_");
        await addDoc(collection(db, "messages"), {
            conversationId,
            senderId,
            receiverId,
            content,
            createdAt: Timestamp.now(),
            read: false,
        });

        // 2. Update or create conversation for both users
        const conversationRef = doc(db, "conversations", conversationId);

        await setDoc(conversationRef, {
            participants: [senderId, receiverId],
            lastMessage: content,
            lastMessageTime: Timestamp.now(),
            unreadCount: 1, // Simplified logic
        }, { merge: true });

    } catch (error) {
        console.error("Error sending message:", error);
        throw error;
    }
}

export function subscribeToMessages(currentUserId: string, otherUserId: string, callback: (messages: Message[]) => void) {
    // Deprecated or unused in favor of subscribeToConversationMessages
}

export function subscribeToConversationMessages(conversationId: string, callback: (messages: Message[]) => void) {
    const q = query(
        collection(db, "messages"),
        where("conversationId", "==", conversationId),
        orderBy("createdAt", "asc")
    );

    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
        callback(messages);
    });
}

export function subscribeToConversations(userId: string, callback: (conversations: Conversation[]) => void) {
    const q = query(
        collection(db, "conversations"),
        where("participants", "array-contains", userId),
        orderBy("lastMessageTime", "desc")
    );

    return onSnapshot(q, (snapshot) => {
        const conversations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Conversation));
        callback(conversations);
    });
}
