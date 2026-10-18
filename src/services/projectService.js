import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  limit as firestoreLimit
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { PROJECTS_DATA } from '../data/projects';

const COLLECTION_NAME = 'projects';

export const projectService = {
  /**
   * Public: Fetch published projects (with optional category filter)
   * Falls back to PROJECTS_DATA if Firestore is unconfigured or empty.
   */
  async getProjects(category = 'All') {
    if (isFirebaseConfigured() && db) {
      try {
        const projectsRef = collection(db, COLLECTION_NAME);
        let q;
        if (category && category !== 'All') {
          q = query(
            projectsRef,
            where('status', '==', 'published'),
            where('category', '==', category),
            orderBy('displayOrder', 'asc')
          );
        } else {
          q = query(
            projectsRef,
            where('status', '==', 'published'),
            orderBy('displayOrder', 'asc')
          );
        }

        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          return snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data()
          }));
        }
      } catch (err) {
        console.warn('Firestore getProjects query failed, falling back to local dataset:', err);
      }
    }

    // Local fallback
    if (!category || category === 'All') {
      return PROJECTS_DATA;
    }
    return PROJECTS_DATA.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  },

  /**
   * Public: Fetch single project by ID / slug
   */
  async getProjectById(id) {
    if (isFirebaseConfigured() && db) {
      try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        }
      } catch (err) {
        console.warn(`Firestore getProjectById failed for ${id}, falling back:`, err);
      }
    }

    return PROJECTS_DATA.find((p) => p.id === id) || null;
  },

  /**
   * Public: Fetch featured projects for homepage spotlight
   */
  async getFeaturedProjects() {
    if (isFirebaseConfigured() && db) {
      try {
        const projectsRef = collection(db, COLLECTION_NAME);
        const q = query(
          projectsRef,
          where('status', '==', 'published'),
          where('isFeatured', '==', true),
          orderBy('displayOrder', 'asc'),
          firestoreLimit(6)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
        }
      } catch (err) {
        console.warn('Firestore getFeaturedProjects failed, falling back:', err);
      }
    }

    return PROJECTS_DATA.filter((p) => p.isFeatured);
  },

  /**
   * Public: Fetch related projects
   */
  async getRelatedProjects(currentId, maxItems = 2) {
    const all = await this.getProjects('All');
    return all.filter((p) => p.id !== currentId).slice(0, maxItems);
  },

  // ---------------------------------------------------------------------------
  // ADMIN OPERATIONS
  // ---------------------------------------------------------------------------

  /**
   * Admin: Fetch all projects (including drafts)
   */
  async getAllProjectsAdmin() {
    if (isFirebaseConfigured() && db) {
      try {
        const projectsRef = collection(db, COLLECTION_NAME);
        const q = query(projectsRef, orderBy('displayOrder', 'asc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          return snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data()
          }));
        }
      } catch (err) {
        console.error('Admin getAllProjects error:', err);
      }
    }

    // Default to mapped local projects with status
    return PROJECTS_DATA.map((p, idx) => ({
      ...p,
      status: 'published',
      displayOrder: idx + 1
    }));
  },

  /**
   * Admin: Create a new project
   */
  async createProject(projectData) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    // Auto-generate clean slug if not provided
    const slug = (projectData.slug || projectData.title || `project-${Date.now()}`)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const docRef = doc(db, COLLECTION_NAME, slug);

    const payload = {
      ...projectData,
      id: slug,
      slug,
      status: projectData.status || 'published',
      displayOrder: Number(projectData.displayOrder) || 1,
      isFeatured: Boolean(projectData.isFeatured),
      gallery: Array.isArray(projectData.gallery) ? projectData.gallery : [],
      features: Array.isArray(projectData.features) ? projectData.features : [],
      beforeAfter: projectData.beforeAfter || null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    await setDoc(docRef, payload);
    return { id: slug, ...payload };
  },

  /**
   * Admin: Update an existing project
   */
  async updateProject(id, projectData) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    const updatePayload = {
      ...projectData,
      updatedAt: serverTimestamp()
    };

    if (updatePayload.displayOrder !== undefined) {
      updatePayload.displayOrder = Number(updatePayload.displayOrder) || 0;
    }

    await updateDoc(docRef, updatePayload);
    return { id, ...updatePayload };
  },

  /**
   * Admin: Delete project
   */
  async deleteProject(id) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  },

  /**
   * Admin: Quick Toggle Publish / Draft
   */
  async toggleProjectPublish(id, currentStatus) {
    const nextStatus = currentStatus === 'published' ? 'draft' : 'published';
    await this.updateProject(id, { status: nextStatus });
    return nextStatus;
  }
};
