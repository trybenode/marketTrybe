import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Zustand store for managing favorites
const useFavoritesStore = create((set, get) => ({
  favoriteIds: [],

  // Load favorites from AsyncStorage when the app starts
  loadFavorites: async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem("favoriteIds");
      if (storedFavorites) {
        set({ favoriteIds: JSON.parse(storedFavorites) });
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  },

  // Toggle favorite status (add/remove item ID)
  toggleFavorite: async (itemId) => {
    set((state) => {
      const isFavorite = state.favoriteIds.includes(itemId);
      const updatedFavorites = isFavorite
        ? state.favoriteIds.filter((id) => id !== itemId) // Remove item
        : [...state.favoriteIds, itemId]; // Add item

      AsyncStorage.setItem("favoriteIds", JSON.stringify(updatedFavorites));
      return { favoriteIds: updatedFavorites };
    });
  },
}));

export default useFavoritesStore;