import React, { useState } from 'react';
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, AlertCircle, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  const { login, resetPassword, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  // If already authenticated, redirect immediately
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setLocalError(err.message || 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess(false);

    try {
      await resetPassword(resetEmail);
      setResetSuccess(true);
    } catch (err) {
      setResetError(err.message || 'Failed to send password reset email.');
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#F7F7F5] flex flex-col justify-center items-center px-4 py-12 font-sans relative">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 architectural-grid-bg opacity-15 pointer-events-none"></div>

      {/* Return to website link */}
      <div className="mb-8 z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-architectural text-[#9E9E99] hover:text-[#F7F7F5] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Website</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#1A1A1A] border border-[#2B2B2B] rounded-[6px] shadow-2xl p-8 z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-[#111111] border border-[#333333] rounded-full text-[#D85B3F] mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <span className="text-[11px] uppercase tracking-architectural font-mono text-[#D85B3F] font-bold block mb-1">
            RESTRICTED ACCESS
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#F7F7F5]">
            AK Global Admin Portal
          </h1>
          <p className="text-xs text-[#9E9E99] mt-1">
            Sign in to manage projects, enquiries, events, and media.
          </p>
        </div>

        {/* Error Alert */}
        {localError && (
          <div className="mb-6 p-4 bg-red-950/50 border border-red-800/80 rounded-[4px] flex items-start gap-3 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{localError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#9E9E99] mb-2">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@akglobalsolutions.in"
                className="w-full pl-10 pr-4 py-2.5 bg-[#111111] border border-[#333333] rounded-[4px] text-sm text-[#F7F7F5] placeholder-[#555555] focus:outline-none focus:border-[#D85B3F] transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#9E9E99]">
                Password
              </label>
              <button
                type="button"
                onClick={() => {
                  setResetEmail(email);
                  setShowResetModal(true);
                }}
                className="text-[11px] font-mono text-[#D85B3F] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#111111] border border-[#333333] rounded-[4px] text-sm text-[#F7F7F5] placeholder-[#555555] focus:outline-none focus:border-[#D85B3F] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-[#D85B3F] hover:bg-[#c44f35] text-[#F7F7F5] rounded-[4px] text-xs font-mono font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Dashboard &rarr;</span>
            )}
          </button>
        </form>

        {/* Security Notice */}
        <div className="mt-8 pt-6 border-t border-[#262626] text-center text-[11px] text-[#666666] font-mono flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Protected by Firebase Auth &amp; Role Allowlist</span>
        </div>
      </div>

      {/* Password Reset Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-[#1A1A1A] border border-[#333333] rounded-[6px] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-[#F7F7F5] mb-2">Reset Password</h3>
            <p className="text-xs text-[#9E9E99] mb-4">
              Enter your authorized admin email address and Firebase will dispatch a secure password reset link.
            </p>

            {resetSuccess ? (
              <div className="p-4 bg-emerald-950/50 border border-emerald-800 rounded-[4px] text-xs text-emerald-300 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Password reset email dispatched successfully!</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="w-full py-2 bg-[#111111] hover:bg-[#222222] text-white rounded text-xs font-mono"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                {resetError && (
                  <div className="p-3 bg-red-950/60 border border-red-800 rounded text-xs text-red-200">
                    {resetError}
                  </div>
                )}
                <div>
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@akglobalsolutions.in"
                    className="w-full px-3 py-2 bg-[#111111] border border-[#333333] rounded text-sm text-[#F7F7F5] focus:outline-none focus:border-[#D85B3F]"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowResetModal(false)}
                    className="flex-1 py-2 bg-[#222222] text-[#9E9E99] hover:text-white rounded text-xs font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-[#D85B3F] hover:bg-[#c44f35] text-white rounded text-xs font-mono font-bold"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminLoginPage;
