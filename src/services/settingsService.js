import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { COMPANY_INFO } from '../data/company';

const COLLECTION_NAME = 'settings';
const DOC_ID = 'general';

export const settingsService = {
  /**
   * Public: Fetch studio settings (with fallback to curated COMPANY_INFO)
   */
  async getSettings() {
    if (isFirebaseConfigured() && db) {
      try {
        const docRef = doc(db, COLLECTION_NAME, DOC_ID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return {
            ...COMPANY_INFO,
            ...docSnap.data()
          };
        }
      } catch (err) {
        console.warn('Failed to fetch settings from Firestore, using default company info:', err);
      }
    }
    return COMPANY_INFO;
  },

  /**
   * Admin: Update studio settings
   */
  async updateSettings(settingsData) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    const payload = {
      ...settingsData,
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, payload, { merge: true });
    return payload;
  },

  /**
   * Admin: One-click Seed Initial Projects, Services & Settings into Firestore
   */
  async seedInitialDatabase() {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const { PROJECTS_DATA } = await import('../data/projects');
    const { SERVICES_DATA } = await import('../data/services');

    let seededCount = 0;

    // Seed Settings
    const settingsRef = doc(db, 'settings', 'general');
    await setDoc(settingsRef, {
      ...COMPANY_INFO,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true });

    // Seed Projects
    for (const proj of PROJECTS_DATA) {
      const projRef = doc(db, 'projects', proj.id);
      await setDoc(projRef, {
        ...proj,
        status: 'published',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
      seededCount++;
    }

    // Seed Services
    for (const srv of SERVICES_DATA) {
      const srvRef = doc(db, 'services', srv.id);
      await setDoc(srvRef, {
        ...srv,
        status: 'published',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
    }

    return { success: true, count: seededCount };
  }
};
