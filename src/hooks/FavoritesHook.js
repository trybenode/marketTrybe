import useFavoritesStore from "../store/FavouriteStore";
import { db } from "../../firebaseConfig";
import { collection, setDoc, getDoc, getDocs, query } from "firebase/firestore";

const fetchDocumentsByIdsBatch = async (collectionName, docIds) => {
    if (!docIds || docIds.length === 0) return [];
  
    const chunks = [];
    for (let i = 0; i < docIds.length; i += 10) {
      chunks.push(docIds.slice(i, i + 10));
    }
  
    try {
      const promises = chunks.map(async (chunk) => {
        const q = query(collection(db, collectionName), where("__name__", "in", chunk));
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
  
      const results = await Promise.all(promises);
      return results.flat();
    } catch (error) {
      console.error("Error fetching documents:", error);
      return [];
    }
  };