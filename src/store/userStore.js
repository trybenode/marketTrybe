import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUserStore = create((set, get) => ({
  user: null,
  isInitialized: false,

  // Load user data from AsyncStorage
  loadUser: async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        set({ user: JSON.parse(storedUser), isInitialized: true });
      } else {
        set({ isInitialized: true });
      }
    } catch (error) {
      console.error("Error loading user:", error);
      set({ isInitialized: true });
    }
  },

  // Set user data
  setUser: async (userData) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      set({ user: userData, isInitialized: true });
    } catch (error) {
      console.error("Error saving user:", error);
    }
  },

  // Clear user data
  clearUser: async () => {
    try {
      await AsyncStorage.removeItem("user");
      set({ user: null });
    } catch (error) {
      console.error("Error clearing user:", error);
    }
  },

  // Safe getters with initialization check
  getUserId: () => {
    const state = get();
    if (!state.isInitialized) {
      console.warn('User store not initialized. Call loadUser first.');
      return null;
    }
    return state.user?.id ?? null;
  },

  getUserEmail: () => {
    const state = get();
    if (!state.isInitialized) {
      console.warn('User store not initialized. Call loadUser first.');
      return null;
    }
    return state.user?.email ?? null;
  },

  // Helper to check if store is ready
  isReady: () => get().isInitialized
}));

export default useUserStore;
