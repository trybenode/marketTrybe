import { doc, getDoc, collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
// import { db } from "../firebaseConfig.js";

const fetchAllListing = async (productId) => {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

const fetchAllListings = async (limitCount, startAfterDoc = null) => {
    const collectionRef = collection(db, "products");
    let q = query(collectionRef, orderBy("createdAt", "desc"), limit(limitCount));

    if (startAfterDoc) {
        q = query(q, startAfter(startAfterDoc));
    }

    const collectionSnap = await getDocs(q);
    const listings = collectionSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));

    return { listings, lastVisible: collectionSnap.docs[collectionSnap.docs.length - 1] };
};

// Hook to fetch a single listing by its ID
export const useListing = (productId) => {
    return useQuery(["product", productId], () => fetchAllListing(productId), {
        enabled: !!productId, // Only run the query if productId is provided
    });
};

// Hook to fetch multiple listings with pagination
export const useListings = (limitCount, startAfterDoc = null) => {
    return useQuery(["products", limitCount, startAfterDoc], () => fetchAllListings(limitCount, startAfterDoc), {
        keepPreviousData: true, // Keep previous data while fetching new data
    });
};