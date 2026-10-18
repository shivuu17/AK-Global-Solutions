import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { SERVICES_DATA } from '../data/services';

const COLLECTION_NAME = 'services';

export const serviceDataService = {
  /**
   * Public: Fetch all active services
   */
  async getServices() {
    if (isFirebaseConfigured() && db) {
      try {
        const servicesRef = collection(db, COLLECTION_NAME);
        const q = query(servicesRef, orderBy('displayOrder', 'asc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          return snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data()
          }));
        }
      } catch (err) {
        console.warn('Firestore getServices failed, falling back to static services:', err);
      }
    }

    return SERVICES_DATA;
  },

  /**
   * Public: Fetch service by ID
   */
  async getServiceById(id) {
    if (isFirebaseConfigured() && db) {
      try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        }
      } catch (err) {
        console.warn(`Firestore getServiceById failed for ${id}:`, err);
      }
    }

    return SERVICES_DATA.find((s) => s.id === id) || null;
  },

  // ---------------------------------------------------------------------------
  // ADMIN OPERATIONS
  // ---------------------------------------------------------------------------

  /**
   * Admin: Fetch all services
   */
  async getAllServicesAdmin() {
    return this.getServices();
  },

  /**
   * Admin: Create new service
   */
  async createService(data) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const slug = (data.slug || data.title || `service-${Date.now()}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const docRef = doc(db, COLLECTION_NAME, slug);
    const payload = {
      ...data,
      id: slug,
      slug,
      displayOrder: Number(data.displayOrder) || 1,
      status: data.status || 'published',
      capabilities: Array.isArray(data.capabilities) ? data.capabilities : [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, payload);
    return { id: slug, ...payload };
  },

  /**
   * Admin: Update service
   */
  async updateService(id, data) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    const updatePayload = {
      ...data,
      updatedAt: serverTimestamp()
    };

    if (updatePayload.displayOrder !== undefined) {
      updatePayload.displayOrder = Number(updatePayload.displayOrder) || 0;
    }

    await updateDoc(docRef, updatePayload);
    return { id, ...updatePayload };
  },

  /**
   * Admin: Delete service
   */
  async deleteService(id) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  }
};
