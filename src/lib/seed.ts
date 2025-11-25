import { db } from "./firebase";
import { collection, writeBatch, doc } from "firebase/firestore";
import { DUMMY_VIEWERS } from "./db/profiles";

export async function seedViewers() {
    const batch = writeBatch(db);
    const collectionRef = collection(db, "profiles");

    console.log("Starting seed process...");

    DUMMY_VIEWERS.forEach((viewer) => {
        if (viewer.uid) {
            const docRef = doc(collectionRef, viewer.uid);
            batch.set(docRef, viewer);
            console.log(`Prepared viewer: ${viewer.displayName}`);
        }
    });

    try {
        await batch.commit();
        console.log("Successfully seeded profiles collection!");
    } catch (error) {
        console.error("Error seeding profiles:", error);
    }
}
