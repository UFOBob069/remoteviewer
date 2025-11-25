import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export interface UserProfile {
    uid: string;
    email: string;
    role: "buyer" | "seller";
    displayName: string;
    createdAt: number;
}

export async function createUserProfile(uid: string, data: Omit<UserProfile, "uid">) {
    try {
        await setDoc(doc(db, "users", uid), {
            uid,
            ...data,
        });
    } catch (error) {
        console.error("Error creating user profile:", error);
        throw error;
    }
}

export async function getUserProfile(uid: string) {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as UserProfile;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting user profile:", error);
        throw error;
    }
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
    try {
        const docRef = doc(db, "users", uid);
        await updateDoc(docRef, data);
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
}
