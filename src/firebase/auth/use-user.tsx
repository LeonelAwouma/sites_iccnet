'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User, signInAnonymously } from 'firebase/auth';
import { useAuth } from '../provider';

export function useUser() {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          setUser(user);
        } else {
          // If no user, sign in anonymously
          signInAnonymously(auth).catch((error) => {
            console.error('Anonymous sign-in failed', error);
          });
        }
        setLoading(false);
      },
      (error) => {
        console.error('Auth state change error', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth]);

  return { user, loading };
}
