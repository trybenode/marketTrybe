import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import useUserStore from '../src/store/userStore';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const initializeAuth = async () => {
      await useUserStore.getState().loadUser();
      
      const auth = getAuth();
      return onAuthStateChanged(auth, (user) => {
        if (user) {
          useUserStore.getState().setUser({
            id: user.uid,
            email: user.email,
          });
        } else {
          useUserStore.getState().clearUser();
        }
        setLoading(false);
      });
    };

    initializeAuth().then(unsubscribe => {
      return () => unsubscribe();
    });
  }, []);

  return { loading };
};