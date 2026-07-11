'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0a0a15 0%, #1a1a2e 100%)' }}>
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 animate-pulse-slow" style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />

      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 py-12 max-w-md mx-auto w-full">
        <Link href="/login" className="flex items-center gap-2 text-gray-400 mb-8 w-fit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Login
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 30px rgba(124, 58, 237, 0.5)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white">Reset Password</h1>
          <p className="text-gray-400 mt-2">We'll send you a reset link</p>
        </div>

        {sent ? (
          <div className="text-center p-6 rounded-2xl" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Email Sent!</h3>
            <p className="text-gray-400 text-sm">Check your inbox for the password reset link. It expires in 30 minutes.</p>
            <Link href="/login" className="mt-4 inline-block text-purple-400 font-semibold text-sm">Back to Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-400 text-sm font-medium mb-2 block">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="priya@example.com" required className="w-full px-4 py-4 rounded-2xl text-white placeholder-gray-600 outline-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
            </div>
            <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl text-white font-bold text-lg transition-all duration-200 active:scale-95 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 8px 30px rgba(124, 58, 237, 0.4)' }}>
              {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
