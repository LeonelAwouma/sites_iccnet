'use client';

import { createContext, useContext, ReactNode } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

type FirebaseClientContextValue = {
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
};

const FirebaseClientContext = createContext<FirebaseClientContextValue | undefined>(
  undefined
);

export function FirebaseClientProvider({
  children,
  ...value
}: {
  children: ReactNode;
  firebaseApp: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
}) {
  return (
    <FirebaseClientContext.Provider value={value}>
      {children}
    </FirebaseClientContext.Provider>
  );
}

export const useFirebaseClient = () => {
  const context = useContext(FirebaseClientContext);
  if (context === undefined) {
    throw new Error(
      'useFirebaseClient must be used within a FirebaseClientProvider'
    );
  }
  return context;
};
