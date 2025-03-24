import React, { createContext, useState, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Listen for auth changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Basic user info from Firebase Auth.
        // We leave fullName empty because we expect it to be provided in Firestore
        const basicUserInfo = {
          uid: user.uid,
          email: user.email,
          fullName: user.displayName, 
          phoneNumber: user.phoneNumber || '',
          profilePicture: user.photoURL || '',
          // Placeholders for extra data
          matricNumber: '',
          address: '',
          locationType: '',
        };

        // Fetch extra details from Firestore, which should include the full name
        const userRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const firestoreData = docSnap.data();
          // Merge the Auth info with Firestore data.
          setCurrentUser({ ...basicUserInfo, ...firestoreData });
        } else {
          // If no extra data exists, use basicUserInfo
          setCurrentUser(basicUserInfo);
        }
      } else {
        // User is logged out
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
