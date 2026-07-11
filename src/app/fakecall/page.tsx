'use client';

import React, { useState, useEffect } from 'react';
import BottomNav from '@/components/BottomNav';

const callers = [
  { id: '1', name: 'Mom', number: '+91 98765 43210', avatar: 'M' },
  { id: '2', name: 'Sister Priya', number: '+91 87654 32109', avatar: 'P' },
  { id: '3', name: 'Boss Rahul', number: '+91 76543 21098', avatar: 'R' },
  { id: '4', name: 'Doctor', number: '+91 65432 10987', avatar: 'D' },
  { id: '5', name: 'Unknown Number', number: '+91 00000 00000', avatar: '?' },
];

export default function FakeCallPage() {
  const [selectedCaller, setSelectedCaller] = useState(callers[0]);
  const [delay, setDelay] = useState(0);
  const [isRinging, setIsRinging] = useState(false);
  const [isOnCall, setIsOnCall] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (!isOnCall) return;
    const interval = setInterval(() => setCallDuration(d => d + 1), 1000);
    return () => clearInterval(interval);
  }, [isOnCall]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) { setCountdown(null); setIsRinging(true); return; }
    const t = setTimeout(() => setCountdown(c => (c !== null ? c - 1 : null)), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const startFakeCall = () => {
    if (delay === 0) { setIsRinging(true); } else { setCountdown(delay); }
  };

  const answerCall = () => { setIsRinging(false); setIsOnCall(true); setCallDuration(0); };
  const endCall = () => { setIsOnCall(false); setIsRinging(false); setCallDuration(0); };
  const formatDuration = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  if (isRinging) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-between py-16 px-6" style={{ background: 'linear-gradient(135deg, #0a0a15 0%, #1a1a2e 100%)' }}>
        <div className="text-center animate-slide-down">
          <p className="text-gray-400 text-sm mb-2">Incoming Call</p>
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black text-white mx-auto mb-4 animate-pulse" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 0 40px rgba(124, 58, 237, 0.6)' }}>
            {selectedCaller.avatar}
          </div>
          <h2 className="text-white text-3xl font-black">{selectedCaller.name}</h2>
          <p className="text-gray-400 mt-2">{selectedCaller.number}</p>
          <p className="text-gray-500 text-sm mt-1">Mobile</p>
        </div>
        <div className="flex items-center justify-center gap-16">
          <div className="flex flex-col items-center gap-2">
            <button onClick={endCall} className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#ef4444' }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
            </button>
            <span className="text-red-400 text-xs">Decline</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <button onClick={answerCall} className="w-16 h-16 rounded-full flex items-center justify-center animate-bounce" style={{ background: '#10b981' }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
            </button>
            <span className="text-green-400 text-xs">Answer</span>
          </div>
        </div>
      </div>
    );
  }

  if (isOnCall) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-between py-16 px-6" style={{ background: 'linear-gradient(135deg, #0a0a15 0%, #1a1a2e 100%)' }}>
        <div className="text-center">
          <p className="text-green-400 text-sm mb-2">On Call</p>
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl font-black text-white mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
            {selectedCaller.avatar}
          </div>
          <h2 className="text-white text-3xl font-black">{selectedCaller.name}</h2>
          <p className="text-green-400 text-xl font-bold mt-3">{formatDuration(callDuration)}</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {[{ icon: '🔇', label: 'Mute' }, { icon: '🔊', label: 'Speaker' }, { icon: '⌨️', label: 'Keypad' }].map(btn => (
            <div key={btn.label} className="flex flex-col items-center gap-2">
              <button className="w-14 h-14 rounded-full flex items-center justify-center text-2xl" style={{ background: 'rgba(255,255,255,0.1)' }}>{btn.icon}</button>
              <span className="text-gray-400 text-xs">{btn.label}</span>
            </div>
          ))}
        </div>
        <button onClick={endCall} className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: '#ef4444' }}>
          <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg>
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28" style={{ background: 'linear-gradient(135deg, #0a0a15 0%, #1a1a2e 100%)' }}>
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-black text-white">Fake Call</h1>
        <p className="text-gray-400 text-sm mt-1">Escape uncomfortable situations</p>
      </div>

      <div className="px-5 space-y-4">
        <div className="p-4 rounded-2xl flex items-start gap-3" style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
          <span className="text-xl">💡</span>
          <p className="text-gray-300 text-sm">Use fake call to escape uncomfortable situations. Choose a caller and trigger an incoming call.</p>
        </div>

        <div className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 className="text-white font-bold mb-4">Choose Caller</h3>
          <div className="space-y-2">
            {callers.map(caller => (
              <button key={caller.id} onClick={() => setSelectedCaller(caller)} className="w-full flex items-center gap-3 p-3 rounded-2xl transition-all" style={{ background: selectedCaller.id === caller.id ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255,255,255,0.03)', border: `1px solid ${selectedCaller.id === caller.id ? 'rgba(124, 58, 237, 0.4)' : 'rgba(255,255,255,0.08)'}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>{caller.avatar}</div>
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">{caller.name}</p>
                  <p className="text-gray-500 text-xs">{caller.number}</p>
                </div>
                {selectedCaller.id === caller.id && <div className="ml-auto w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">✓</div>}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white font-medium text-sm">Call Delay</p>
              <p className="text-gray-500 text-xs">Time before call rings</p>
            </div>
            <span className="text-purple-400 font-bold">{delay === 0 ? 'Immediate' : `${delay}s`}</span>
          </div>
          <input type="range" min="0" max="60" step="5" value={delay} onChange={e => setDelay(parseInt(e.target.value))} className="w-full accent-purple-500" />
          <div className="flex justify-between text-xs text-gray-500 mt-1"><span>Now</span><span>60s</span></div>
        </div>

        {countdown !== null && (
          <div className="p-4 rounded-2xl text-center" style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
            <p className="text-purple-400 font-bold">Call incoming in {countdown}s...</p>
          </div>
        )}

        <button onClick={startFakeCall} disabled={countdown !== null} className="w-full py-4 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 8px 30px rgba(124, 58, 237, 0.4)' }}>
          📞 {delay === 0 ? 'Call Now' : `Schedule Call (${delay}s)`}
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
