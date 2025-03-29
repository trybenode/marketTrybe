import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

const checkEmailVerification = async (user) => {
  if (user && user.emailVerified) {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { emailVerified: true });
  }
};

const AuthProvider = ({ children }) => {
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload(); // Refresh user data
        checkEmailVerification(user);
      }
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  return children;
};

export default AuthProvider;
