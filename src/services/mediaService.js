import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, isFirebaseConfigured, auth } from '../lib/firebase';

const COLLECTION_NAME = 'media';

export const mediaService = {
  /**
   * Check if Cloudinary is configured
   */
  isCloudinaryConfigured() {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'akglobalsolutions';
    const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ak_global_admin_preset';
    return Boolean(cloudName && cloudName !== 'your_cloud_name' && preset);
  },

  /**
   * Upload an image file to Cloudinary and record its metadata in Firestore
   * @param {File} file 
   * @param {string} category 
   * @param {string} alt 
   */
  async uploadImage(file, category = 'project', alt = '') {
    if (!file) throw new Error('No file provided for upload.');

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      throw new Error('Unsupported file format. Please upload JPG, PNG, WEBP, or AVIF.');
    }

    // Validate size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      throw new Error('Image size exceeds 10MB limit. Please compress the image before uploading.');
    }

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'akglobalsolutions';
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ak_global_admin_preset';

    if (!cloudName || cloudName === 'your_cloud_name') {
      throw new Error(
        'Cloudinary is not yet configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your environment.'
      );
    }

    // Prepare FormData for Cloudinary Upload API
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset || 'ak_global_admin_preset');
    formData.append('folder', `ak_global_solutions/${category}`);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(
        errData.error?.message || `Cloudinary upload failed with status ${response.status}.`
      );
    }

    const uploadResult = await response.json();

    // Record metadata in Firestore `media` collection
    let mediaRecord = {
      url: uploadResult.secure_url || uploadResult.url,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      width: uploadResult.width,
      height: uploadResult.height,
      bytes: uploadResult.bytes,
      alt: alt || file.name,
      category,
      createdAt: new Date().toISOString()
    };

    if (isFirebaseConfigured() && db) {
      try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
          ...mediaRecord,
          createdAt: serverTimestamp(),
          createdBy: auth?.currentUser?.uid || 'admin'
        });
        mediaRecord.id = docRef.id;
      } catch (err) {
        console.warn('Failed to record media metadata to Firestore:', err);
      }
    }

    return mediaRecord;
  },

  /**
   * Fetch all uploaded media items from Firestore
   */
  async getMediaList() {
    if (!isFirebaseConfigured() || !db) {
      return [];
    }

    try {
      const mediaRef = collection(db, COLLECTION_NAME);
      const q = query(mediaRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
    } catch (err) {
      console.error('Failed to fetch media list:', err);
      return [];
    }
  },

  /**
   * Delete media record from Firestore
   */
  async deleteMedia(id) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  }
};

