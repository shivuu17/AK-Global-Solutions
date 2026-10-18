import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

/**
 * Firebase Client Configuration
 * Sourced securely from Vite environment variables (VITE_FIREBASE_*)
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBXmE-gQ_DuKRWop9TojyY7AXEgOAafkhY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'ak-globalsolutions.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'ak-globalsolutions',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'ak-globalsolutions.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '912066017254',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:912066017254:web:2793875a68f9a032068827',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-RCSRYNQWTK',
};

/**
 * Checks whether required Firebase configuration variables are provided.
 */
export const isFirebaseConfigured = () => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey !== 'AIzaSyExampleKey1234567890abcdef'
  );
};

// Initialize Firebase App gracefully (singleton pattern)
let app = null;
let auth = null;
let db = null;
let analytics = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);

    // Initialize Analytics if in supported browser environment
    if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      }).catch(() => {});
    }
  } catch (error) {
    console.error('Failed to initialize Firebase SDK:', error);
  }
} else {
  console.warn(
    '[AK Global Solutions] Firebase credentials are not yet configured or using example placeholders. The application is running in fallback resilience mode using local curated data.'
  );
}

export { app, auth, db, analytics };
export default app;

