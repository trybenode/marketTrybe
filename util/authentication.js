import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export const logout = async () => {
  await signOut(auth);
  // Store will be automatically updated via onAuthStateChanged
};

export const getCurrentUser = () => auth.currentUser;
