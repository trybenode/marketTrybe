// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { doc, getDoc } from 'firebase/firestore';
// import { auth, db } from '../../firebaseConfig';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     // Listen for auth changes
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         // Basic user info from Firebase Auth.
//         // We leave fullName empty because we expect it to be provided in Firestore
//         const basicUserInfo = {
//           uid: user.uid,
//           email: user.email,
//           fullName: user.displayName, 
//           phoneNumber: user.phoneNumber || '',
//           profilePicture: user.photoURL || '',
//           // Placeholders for extra data
//           matricNumber: '',
//           address: '',
//           locationType: '',
//         };

//         // Fetch extra details from Firestore, which should include the full name
//         const userRef = doc(db, 'users', user.uid);
//         const docSnap = await getDoc(userRef);

//         if (docSnap.exists()) {
//           const firestoreData = docSnap.data();
//           // Merge the Auth info with Firestore data.
//           setCurrentUser({ ...basicUserInfo, ...firestoreData });
//         } else {
//           // If no extra data exists, use basicUserInfo
//           setCurrentUser(basicUserInfo);
//         }
//       } else {
//         // User is logged out
//         setCurrentUser(null);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <UserContext.Provider value={{ currentUser, setCurrentUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);


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
          verified: false, // Default to false
        };

        if (docSnap.exists()) {
          userData = { ...userData, ...docSnap.data() };
        }

        setCurrentUser(userData);

        // 🔹 Listen for KYC status changes
        const kycQuery = query(collection(db, 'kycRequests'), where('userId', '==', user.uid));
        const unsubscribeKyc = onSnapshot(kycQuery, async (snapshot) => {
          if (!snapshot.empty) {
            const kycData = snapshot.docs[0].data();

            if (kycData.status === 'verified' && !userData.verified) {
              // Update `verified` field in users collection
              await updateDoc(userRef, { verified: true });

              // Update local state
              setCurrentUser((prev) => ({ ...prev, verified: true }));
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
