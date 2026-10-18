import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';

const COLLECTION_NAME = 'popups';

export const popupService = {
  /**
   * Public: Fetch currently active and schedule-valid event popups
   */
  async getActivePopups() {
    let validPopups = [];

    if (isFirebaseConfigured() && db) {
      try {
        const popupsRef = collection(db, COLLECTION_NAME);
        // Simple equality query without requiring composite index
        const q = query(popupsRef, where('active', '==', true));
        const snapshot = await getDocs(q);
        const now = new Date();

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          let isValidDate = true;

          if (data.startAt) {
            const startDate = new Date(data.startAt);
            if (now < startDate) isValidDate = false;
          }

          if (data.endAt) {
            const endDate = new Date(data.endAt);
            if (now > endDate) isValidDate = false;
          }

          if (isValidDate) {
            validPopups.push({
              id: docSnap.id,
              ...data
            });
          }
        });

        // Sort by priority in memory (highest priority first)
        validPopups.sort((a, b) => (Number(b.priority) || 0) - (Number(a.priority) || 0));
      } catch (err) {
        console.warn('Failed to fetch active popups from Firestore, using studio default popup:', err);
      }
    }

    // High-impact curated studio default announcement if no custom popups exist yet
    if (validPopups.length === 0) {
      validPopups = [
        {
          id: 'default_studio_consultation_popup',
          title: 'Complimentary On-Site Architecture & Interior Consultation',
          subtitle: 'LIMITED TIME STUDIO OFFER',
          message: 'Planning a residential interior renovation, luxury modular kitchen, or turnkey civil construction in Noida? Schedule a direct site review with our lead designer today.',
          ctaLabel: 'Claim Complimentary Consultation',
          ctaUrl: '#contact',
          active: true,
          priority: 1,
          image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
        }
      ];
    }

    return validPopups;
  },

  /**
   * Helper: Check if visitor dismissed this popup
   */
  isDismissed(dismissKey) {
    if (!dismissKey) return false;
    try {
      // Check session storage first
      const sessionDismissed = sessionStorage.getItem(`ak_popup_dismiss_${dismissKey}`);
      if (sessionDismissed) return true;

      // Check 24-hour persistent local storage
      const stored = localStorage.getItem(`ak_popup_dismiss_${dismissKey}`);
      if (!stored) return false;
      const dismissedTime = parseInt(stored, 10);
      const ONE_DAY = 24 * 60 * 60 * 1000;
      return Date.now() - dismissedTime < ONE_DAY;
    } catch (e) {
      return false;
    }
  },

  /**
   * Helper: Record popup dismissal
   */
  dismiss(dismissKey, persistent = false) {
    if (!dismissKey) return;
    try {
      if (persistent) {
        localStorage.setItem(`ak_popup_dismiss_${dismissKey}`, Date.now().toString());
      } else {
        sessionStorage.setItem(`ak_popup_dismiss_${dismissKey}`, 'true');
      }
    } catch (e) {
      // Ignore storage errors
    }
  },

  // ---------------------------------------------------------------------------
  // ADMIN OPERATIONS
  // ---------------------------------------------------------------------------

  /**
   * Admin: Fetch all popups (active & inactive)
   */
  async getAllPopupsAdmin() {
    if (!isFirebaseConfigured() || !db) {
      return [];
    }

    try {
      const popupsRef = collection(db, COLLECTION_NAME);
      const q = query(popupsRef, orderBy('priority', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
    } catch (err) {
      console.error('Admin getAllPopups error:', err);
      return [];
    }
  },

  /**
   * Admin: Create new event popup
   */
  async createPopup(popupData) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const popupId = `popup-${Date.now()}`;
    const docRef = doc(db, COLLECTION_NAME, popupId);

    const payload = {
      ...popupData,
      id: popupId,
      title: popupData.title || 'Special Announcement',
      subtitle: popupData.subtitle || 'AK Global Solutions Event',
      message: popupData.message || '',
      image: popupData.image || '',
      ctaLabel: popupData.ctaLabel || 'Learn More',
      ctaUrl: popupData.ctaUrl || '#contact',
      active: Boolean(popupData.active),
      startAt: popupData.startAt || new Date().toISOString(),
      endAt: popupData.endAt || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      priority: Number(popupData.priority) || 1,
      dismissKey: popupData.dismissKey || `event_${Date.now()}`,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, payload);
    return { id: popupId, ...payload };
  },

  /**
   * Admin: Update popup
   */
  async updatePopup(id, popupData) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    const updatePayload = {
      ...popupData,
      priority: Number(popupData.priority) || 0,
      active: Boolean(popupData.active),
      updatedAt: serverTimestamp()
    };

    await updateDoc(docRef, updatePayload);
    return { id, ...updatePayload };
  },

  /**
   * Admin: Delete popup
   */
  async deletePopup(id) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  },

  /**
   * Admin: Toggle active state
   */
  async togglePopupActive(id, currentActive) {
    return this.updatePopup(id, { active: !currentActive });
  }
};

