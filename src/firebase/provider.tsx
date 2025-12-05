'use client';

import { createContext, useContext, ReactNode, useMemo, useState, useEffect } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import { FirebaseClientProvider } from './client-provider';
import { initializeFirebase } from '.';

type FirebaseContextValue = {
  firebaseApp?: FirebaseApp;
  auth?: Auth;
  firestore?: Firestore;
};

const FirebaseContext = createContext<FirebaseContextValue | undefined>(
  undefined
);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [firebase, setFirebase] = useState<FirebaseContextValue | null>(null);

  useEffect(() => {
    // Initialize Firebase only on the client-side
    if (typeof window !== 'undefined') {
      const { firebaseApp, auth, firestore } = initializeFirebase();
      setFirebase({ firebaseApp, auth, firestore });
    }
  }, []);

  const contextValue = useMemo(() => {
    if (!firebase) return {};
    return {
      firebaseApp: firebase.firebaseApp,
      auth: firebase.auth,
      firestore: firebase.firestore,
    };
  }, [firebase]);

  if (!firebase) {
    // You can return a loader here if you want
    return <>{children}</>;
  }

  return (
    <FirebaseContext.Provider value={contextValue}>
      <FirebaseClientProvider
        firebaseApp={firebase.firebaseApp!}
        auth={firebase.auth!}
        firestore={firebase.firestore!}
      >
        {children}
      </FirebaseClientProvider>
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useFirebaseApp = () => useFirebase()?.firebaseApp;
export const useFirestore = () => useFirebase()?.firestore;
export const useAuth = () => useFirebase()?.auth;
