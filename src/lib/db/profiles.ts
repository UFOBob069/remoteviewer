import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";

export interface SellerProfile {
    uid: string;
    displayName: string;
    bio: string;
    location: string;
    skills: string[]; // Keeping for backward compatibility, but using methods/specialties primarily
    pricing: {
        hourlyRate: number;
        customOffer?: string;
    };
    rating: number;
    reviewCount: number;
    photoURL?: string;
    availability?: "Now" | "Today" | "Tomorrow" | "This Week";
    methods?: ("CRV" | "ARV" | "ERV" | "Intuitive" | "Dream" | "Tarot")[];
    sessionTypes?: ("Blind" | "Live Video" | "Audio" | "Written" | "Lost Item")[];
    training?: string;
    ethics?: string;
    deliverySpeed?: "1h" | "24h" | "3d";
    portfolio?: string[];
    badges?: string[];
    languages?: string[];
    completedJobs?: number;
    responseTime?: string;
}

export const DUMMY_VIEWERS: Partial<SellerProfile>[] = [
    {
        uid: "1",
        displayName: "Cassandra V.",
        bio: "Certified Remote Viewer specializing in blind targets and lost object recovery. Trained in CRV methodology.",
        location: "Sedona, AZ",
        skills: ["CRV", "Lost Items", "Blind Targets"],
        methods: ["CRV", "Intuitive"],
        sessionTypes: ["Blind", "Written", "Lost Item"],
        pricing: { hourlyRate: 85 },
        rating: 4.9,
        reviewCount: 342,
        photoURL: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
        availability: "Now",
        training: "Advanced CRV under Major Ed Dames (2015)",
        ethics: "I do not perform medical diagnoses or legal predictions.",
        deliverySpeed: "24h",
        badges: ["Top Rated", "Verified"],
        languages: ["English"],
        completedJobs: 1250,
        responseTime: "< 1 hour",
        portfolio: [
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop", // Starry sky/mystical
            "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=400&h=300&fit=crop"  // Sketch/drawing
        ]
    },
    {
        uid: "2",
        displayName: "Marcus Orion",
        bio: "Associative Remote Viewer (ARV) for binary choices and future probabilities. High accuracy track record.",
        location: "Portland, OR",
        skills: ["ARV", "Predictions", "Finance"],
        methods: ["ARV", "ERV"],
        sessionTypes: ["Blind", "Live Video"],
        pricing: { hourlyRate: 120 },
        rating: 5.0,
        reviewCount: 189,
        photoURL: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
        availability: "Today",
        training: "Stanford Research Institute (SRI) Protocols",
        ethics: "Strictly for entertainment and personal guidance.",
        deliverySpeed: "1h",
        badges: ["Pro Seller", "Verified"],
        languages: ["English", "German"],
        completedJobs: 450,
        responseTime: "< 2 hours",
        portfolio: [
            "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=400&h=300&fit=crop", // Abstract/science
            "https://images.unsplash.com/photo-1614730341194-75c60764fc86?w=400&h=300&fit=crop"  // Data/charts
        ]
    },
    {
        uid: "3",
        displayName: "Elena Myst",
        bio: "Intuitive empath and dream interpreter. I connect with symbolic imagery to provide deep personal insights.",
        location: "New Orleans, LA",
        skills: ["Intuitive", "Dreams", "Symbols"],
        methods: ["Intuitive", "Dream"],
        sessionTypes: ["Audio", "Written", "Live Video"],
        pricing: { hourlyRate: 60 },
        rating: 4.8,
        reviewCount: 520,
        photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
        availability: "Tomorrow",
        training: "Hereditary Intuitive, 10+ years practice",
        ethics: "Compassionate, non-judgmental space.",
        deliverySpeed: "24h",
        badges: ["Verified", "Rising Talent"],
        languages: ["English", "Spanish"],
        completedJobs: 890,
        responseTime: "< 30 mins",
        portfolio: [
            "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=300&fit=crop", // Crystals/light
            "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=400&h=300&fit=crop"  // Tarot/cards
        ]
    },
    {
        uid: "4",
        displayName: "Dr. Aris",
        bio: "Scientific approach to Extended Remote Viewing (ERV). Explore consciousness and non-local awareness.",
        location: "London, UK",
        skills: ["ERV", "Consciousness", "Meditation"],
        methods: ["ERV", "CRV"],
        sessionTypes: ["Blind", "Audio"],
        pricing: { hourlyRate: 150 },
        rating: 5.0,
        reviewCount: 88,
        photoURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        availability: "This Week",
        training: "PhD in Parapsychology (Honorary)",
        ethics: "Research-focused, ethical exploration.",
        deliverySpeed: "3d",
        badges: ["Verified", "Expert"],
        languages: ["English"],
        completedJobs: 210,
        responseTime: "< 4 hours",
        portfolio: [
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop", // Space/nebula
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop"  // Lab/research
        ]
    },
    {
        uid: "5",
        displayName: "Sarah J.",
        bio: "Quick, practical intuitive impressions for everyday questions. Lost keys? Missing pet? I can help look.",
        location: "Austin, TX",
        skills: ["Lost Items", "Pets", "Practical"],
        methods: ["Intuitive", "CRV"],
        sessionTypes: ["Lost Item", "Written"],
        pricing: { hourlyRate: 40 },
        rating: 4.7,
        reviewCount: 156,
        photoURL: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
        availability: "Now",
        training: "Self-taught, 5 years experience",
        ethics: "Honest impressions, no guarantees.",
        deliverySpeed: "1h",
        badges: ["Verified"],
        languages: ["English"],
        completedJobs: 340,
        responseTime: "< 15 mins",
        portfolio: [
            "https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400&h=300&fit=crop", // Keys/map
            "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop"  // Dogs/pets
        ]
    },
    {
        uid: "6",
        displayName: "The Seer",
        bio: "Deep trance remote viewing for complex targets and mysteries. Uncover the hidden layers of reality.",
        location: "Remote",
        skills: ["Deep Trance", "Mysteries", "Complex"],
        methods: ["ERV", "Intuitive"],
        sessionTypes: ["Blind", "Written"],
        pricing: { hourlyRate: 200 },
        rating: 4.9,
        reviewCount: 42,
        photoURL: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        availability: "This Week",
        training: "Monroe Institute Alumnus",
        ethics: "Deep respect for the unknown.",
        deliverySpeed: "3d",
        badges: ["Verified", "Premium"],
        languages: ["English"],
        completedJobs: 95,
        responseTime: "< 24 hours",
        portfolio: [
            "https://images.unsplash.com/photo-1506318137071-a8bcbf6d919d?w=400&h=300&fit=crop", // Tunnel/light
            "https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?w=400&h=300&fit=crop"  // Eye/vision
        ]
    },
];

export async function createOrUpdateSellerProfile(uid: string, data: Partial<SellerProfile>) {
    try {
        const docRef = doc(db, "profiles", uid);
        await setDoc(docRef, { uid, ...data }, { merge: true });
    } catch (error) {
        console.error("Error updating seller profile:", error);
        throw error;
    }
}

export async function getSellerProfile(uid: string) {
    try {
        const docRef = doc(db, "profiles", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as SellerProfile;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error getting seller profile:", error);
        throw error;
    }
}

export async function getAllSellers() {
    try {
        const q = query(collection(db, "profiles"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => doc.data() as SellerProfile);
    } catch (error) {
        console.error("Error getting all sellers:", error);
        throw error;
    }
}
