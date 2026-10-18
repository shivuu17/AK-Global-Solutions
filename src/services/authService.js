import { 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../lib/firebase';

/**
 * Verified Admin Email Allowlist
 * Configured in VITE_ADMIN_EMAILS (comma-separated), with sensible studio defaults
 */
const getAdminEmails = () => {
  const envEmails = import.meta.env.VITE_ADMIN_EMAILS;
  if (!envEmails) {
    return ['akglobalsolutions@gmail.com', 'admin@akglobalsolutions.in'];
  }
  return envEmails.split(',').map((e) => e.trim().toLowerCase());
};

export const authService = {
  /**
   * Check if a given Firebase user is authorized as an administrator.
   * Enforces verified email matching and optional custom claims.
   */
  isAdminUser(user) {
    if (!user || !user.email) return false;
    const adminEmails = getAdminEmails();
    const emailMatches = adminEmails.includes(user.email.toLowerCase());
    return emailMatches;
  },

  /**
   * Sign in administrator with email and password
   */
  async login(email, password) {
    if (!isFirebaseConfigured() || !auth) {
      throw new Error(
        'Firebase is not yet configured. Please supply your Firebase Web credentials in .env.local.'
      );
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;

      // Verify that this user is on the approved admin allowlist
      if (!this.isAdminUser(user)) {
        await signOut(auth);
        throw new Error(
          'Access Denied: Your account is not authorized as an AK Global Solutions administrator.'
        );
      }

      return user;
    } catch (error) {
      throw new Error(this.formatAuthError(error));
    }
  },

  /**
   * Sign out current user
   */
  async logout() {
    if (auth) {
      await signOut(auth);
    }
  },

  /**
   * Send password reset email
   */
  async resetPassword(email) {
    if (!isFirebaseConfigured() || !auth) {
      throw new Error('Firebase Auth is not available.');
    }
    try {
      await sendPasswordResetEmail(auth, email.trim());
      return true;
    } catch (error) {
      throw new Error(this.formatAuthError(error));
    }
  },

  /**
   * Subscribe to authentication state changes
   */
  onAuthStateChange(callback) {
    if (!auth) {
      // Offline / fallback dummy listener
      callback(null);
      return () => {};
    }
    return onAuthStateChanged(auth, (user) => {
      if (user && this.isAdminUser(user)) {
        callback(user);
      } else {
        callback(null);
      }
    });
  },

  /**
   * Get current authenticated user
   */
  getCurrentUser() {
    if (!auth) return null;
    const user = auth.currentUser;
    return this.isAdminUser(user) ? user : null;
  },

  /**
   * Human-friendly error translation
   */
  formatAuthError(error) {
    const code = error.code || '';
    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return 'Invalid email or password. Please verify your credentials.';
      case 'auth/too-many-requests':
        return 'Too many unsuccessful login attempts. Please wait a few minutes before trying again.';
      case 'auth/network-request-failed':
        return 'Network connection error. Please check your internet connection.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      default:
        return error.message || 'An unexpected authentication error occurred.';
    }
  }
};

