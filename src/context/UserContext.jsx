import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload(); // Refresh user data

        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        let userData = {
          uid: user.uid,
          email: user.email,
          fullName: user.displayName,
          phoneNumber: user.phoneNumber || '',
          profilePicture: user.photoURL || '',
          matricNumber: '',
          address: '',
          locationType: '',
          isVerified: false, // Default
          emailVerified: user.emailVerified, // Get from Firebase Auth
        };

        if (docSnap.exists()) {
          userData = { ...userData, ...docSnap.data() };
        }

        // 🔹 If email is verified but not updated in Firestore, update it
        if (user.emailVerified && !userData.emailVerified) {
          await updateDoc(userRef, { emailVerified: true });
          userData.emailVerified = true; // Update locally
        }

        setCurrentUser(userData);

        // 🔹 Listen for KYC status changes
        const kycQuery = query(collection(db, 'kycRequests'), where('userId', '==', user.uid));
        const unsubscribeKyc = onSnapshot(kycQuery, async (snapshot) => {
          if (!snapshot.empty) {
            const kycData = snapshot.docs[0].data();

            if (kycData.status === 'verified' && !userData.isVerified) {
              // Update Firestore
              await updateDoc(userRef, { isVerified: true });

              // Update local state
              setCurrentUser((prev) => ({ ...prev, isVerified: true }));
            }
          }
        });

        return () => unsubscribeKyc(); // Cleanup KYC listener
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribeAuth(); // Cleanup auth listener
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
