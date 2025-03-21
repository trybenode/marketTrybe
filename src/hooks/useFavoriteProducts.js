import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "@tanstack/react-query";
import useFavoritesStore from "../store/FavouriteStore";

// Function to fetch a single product from Firestore
const fetchProduct = async (productId) => {
  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

// Hook to fetch all favorite products
export const useFavoriteProducts = () => {
  const { favoriteIds } = useFavoritesStore();

  return useQuery(["favoriteProducts", favoriteIds], async () => {
    const productPromises = favoriteIds.map(fetchProduct);
    const products = await Promise.all(productPromises);
    return products.filter(Boolean); // Remove nulls (non-existent products)
  });
};
