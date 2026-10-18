import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where,
  serverTimestamp 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../lib/firebase';

const COLLECTION_NAME = 'enquiries';

export const enquiryService = {
  /**
   * Public: Submit a client enquiry or quote request.
   * Enforces input sanitization, honeypot anti-spam protection, and Firestore persistence.
   */
  async submitEnquiry(formData) {
    // 1. Anti-spam bot honeypot check
    if (formData.botField && formData.botField.trim() !== '') {
      // Quietly succeed to fool bots without writing spam to DB
      return {
        success: true,
        message: "Thank you for your enquiry. We will contact you shortly."
      };
    }

    // 2. Strict client-side validation
    const name = (formData.name || '').trim();
    const phone = (formData.phone || '').trim();
    const email = (formData.email || '').trim();
    const message = (formData.message || '').trim();
    const service = (formData.service || 'General Consultation').trim();
    const sourcePage = (formData.sourcePage || window.location.pathname).trim();

    if (!name || name.length < 2) {
      return {
        success: false,
        message: "Please enter your full name (at least 2 characters)."
      };
    }

    if (!phone || phone.length < 7) {
      return {
        success: false,
        message: "Please enter a valid contact phone number."
      };
    }

    if (!message || message.length < 5) {
      return {
        success: false,
        message: "Please describe your project or requirements (at least 5 characters)."
      };
    }

    // 3. Firestore submission
    if (isFirebaseConfigured() && db) {
      try {
        const payload = {
          name,
          phone,
          email,
          service,
          message,
          sourcePage,
          status: 'new', // Visitor cannot forge status
          adminNotes: '', // Visitor cannot set admin notes
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
        return {
          success: true,
          id: docRef.id,
          message: "Enquiry submitted successfully! Our studio team will call or WhatsApp you within 24 hours."
        };
      } catch (err) {
        console.error('Firestore enquiry submission error:', err);
        return {
          success: false,
          message: "Failed to submit enquiry. Please call us directly or try again later."
        };
      }
    }

    // 4. Resilience Fallback (when Firebase credentials are not yet configured)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          isDemo: true,
          message: "Enquiry recorded in demo mode. Configure your Firebase environment variables for live cloud persistence.",
          dataSubmitted: {
            name,
            phone,
            email,
            service,
            message,
            submittedAt: new Date().toISOString()
          }
        });
      }, 500);
    });
  },

  // ---------------------------------------------------------------------------
  // ADMIN PIPELINE MANAGEMENT
  // ---------------------------------------------------------------------------

  /**
   * Admin: Fetch enquiries with optional status filter
   */
  async getEnquiries(statusFilter = 'All') {
    if (!isFirebaseConfigured() || !db) {
      return [];
    }

    try {
      const enquiriesRef = collection(db, COLLECTION_NAME);
      let q;
      if (statusFilter && statusFilter !== 'All') {
        q = query(
          enquiriesRef,
          where('status', '==', statusFilter),
          orderBy('createdAt', 'desc')
        );
      } else {
        q = query(enquiriesRef, orderBy('createdAt', 'desc'));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt || Date.now())
        };
      });
    } catch (err) {
      console.error('Admin getEnquiries error:', err);
      return [];
    }
  },

  /**
   * Admin: Update enquiry status ('new', 'contacted', 'qualified', 'converted', 'closed')
   */
  async updateEnquiryStatus(id, newStatus) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      status: newStatus,
      updatedAt: serverTimestamp()
    });
    return true;
  },

  /**
   * Admin: Update internal notes
   */
  async updateAdminNotes(id, notes) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, {
      adminNotes: notes,
      updatedAt: serverTimestamp()
    });
    return true;
  },

  /**
   * Admin: Delete enquiry
   */
  async deleteEnquiry(id) {
    if (!isFirebaseConfigured() || !db) {
      throw new Error('Firebase Firestore is not configured.');
    }

    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    return true;
  },

  /**
   * Admin: Compute pipeline statistics
   */
  async getEnquiryStats() {
    const list = await this.getEnquiries('All');
    return {
      total: list.length,
      new: list.filter((e) => e.status === 'new').length,
      contacted: list.filter((e) => e.status === 'contacted').length,
      qualified: list.filter((e) => e.status === 'qualified').length,
      converted: list.filter((e) => e.status === 'converted').length,
      closed: list.filter((e) => e.status === 'closed').length
    };
  }
};
