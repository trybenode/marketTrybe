import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import useUserStore from '../src/store/userStore';

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const auth = getAuth();
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      useUserStore.getState().setUser({
        id: user?.uid || null,
        email: user?.email || null,
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { loading };
};