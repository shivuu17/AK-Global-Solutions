import { 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';

const COLLECTION_NAME = 'events';

export const eventService = {
  /**
   * Public: Fetch published events
   */
  async getEvents() {
    if (!isFirebaseConfigured() || !db) {
      return [];
    }

    try {
      const eventsRef = collection(db, COLLECTION_NAME);
      const q = query(
        eventsRef,
        where('status', '==', 'published'),
        orderBy('startAt', 'asc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.warn('Failed to fetch events from Firestore:', err);
      return [];
    }
  },

  // ---------------------------------------------------------------------------
  // ADMIN OPERATIONS
  // ---------------------------------------------------------------------------

  async getAllEventsAdmin() {
    if (!isFirebaseConfigured() || !db) return [];
    try {
      const eventsRef = collection(db, COLLECTION_NAME);
      const q = query(eventsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    } catch (err) {
      console.error('Admin getAllEvents error:', err);
      return [];
    }
  },

  async createEvent(eventData) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const eventId = `event-${Date.now()}`;
    const docRef = doc(db, COLLECTION_NAME, eventId);
    const payload = {
      ...eventData,
      id: eventId,
      status: eventData.status || 'published',
      displayOrder: Number(eventData.displayOrder) || 1,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, payload);
    return { id: eventId, ...payload };
  },

  async updateEvent(id, eventData) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    const updatePayload = {
      ...eventData,
      updatedAt: serverTimestamp()
    };

    await updateDoc(docRef, updatePayload);
    return { id, ...updatePayload };
  },

  async deleteEvent(id) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  }
};

