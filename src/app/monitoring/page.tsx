'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '@/context/AppContext';
import BottomNav from '@/components/BottomNav';

export default function MonitoringPage() {
  const { monitoring, setMonitoring, setIsEmergencyActive, setSafetyStatus, addAlert } = useApp();
  const [emergencyCountdown, setEmergencyCountdown] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([
    '🟢 System initialized',
    '📡 GPS signal acquired',
    '🎤 Microphone calibrated',
    '🤖 AI models loaded',
    '✅ All sensors ready',
  ]);

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [msg, ...prev.slice(0, 19)]);
  }, []);

  useEffect(() => {
    if (!monitoring.isActive) return;
    const interval = setInterval(() => {
      const newDanger = Math.min(100, Math.max(0, monitoring.dangerProbability + (Math.random() - 0.45) * 8));
      const newNoise = Math.min(100, Math.max(0, monitoring.noiseLevel + (Math.random() - 0.5) * 10));
      const newHR = Math.min(120, Math.max(60, monitoring.heartRate + (Math.random() - 0.5) * 4));
      setMonitoring({ dangerProbability: Math.round(newDanger), noiseLevel: Math.round(newNoise), heartRate: Math.round(newHR), confidenceLevel: Math.round(80 + Math.random() * 15) });
      if (newDanger > 75 && monitoring.dangerProbability <= 75) {
        addLog('⚠️ HIGH DANGER PROBABILITY DETECTED');
        addLog('🚨 Initiating emergency protocol...');
        setSafetyStatus('danger');
        setEmergencyCountdown(10);
      } else if (newDanger > 50) {
        addLog('⚠️ Elevated risk detected - monitoring closely');
        setSafetyStatus('caution');
      } else if (Math.random() > 0.7) {
        const msgs = ['🎤 Voice analysis: Normal conversation', '📱 Motion: Walking pattern detected', '🌍 GPS: Location updated', '🔊 Noise level: Normal environment', '💓 Heart rate: Normal range', '🏃 Running: Not detected', '📊 Threat score: Low'];
        addLog(msgs[Math.floor(Math.random() * msgs.length)]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [monitoring.isActive, monitoring.dangerProbability]);

  useEffect(() => {
    if (emergencyCountdown === null) return;
    if (emergencyCountdown <= 0) {
      setIsEmergencyActive(true);
      addAlert({ type: 'emergency', title: '🚨 EMERGENCY ACTIVATED', message: 'AI detected danger. SOS sent to all contacts.', severity: 'critical' });
      setEmergencyCountdown(null);
      return;
    }
    const t = setTimeout(() => setEmergencyCountdown(prev => (prev !== null ? prev - 1 : null)), 1000);
    return () => clearTimeout(t);
  }, [emergencyCountdown]);

  const dangerColor = monitoring.dangerProbability > 70 ? '#ef4444' : monitoring.dangerProbability > 40 ? '#f59e0b' : '#10b981';

  const sensorCards = [
    { label: 'Microphone', status: monitoring.microphoneStatus, icon: '🎤', detail: `${monitoring.noiseLevel}dB` },
    { label: 'Motion', status: monitoring.motionStatus, icon: '📱', detail: 'Stable' },
    { label: 'GPS', status: monitoring.gpsStatus, icon: '📍', detail: 'Locked' },
    { label: 'Voice AI', status: monitoring.voiceDetection, icon: '🗣️', detail: 'Listening' },
    { label: 'Distress AI', status: !monitoring.distressDetection, icon: '⚠️', detail: monitoring.distressDetection ? 'ALERT' : 'Clear' },
    { label: 'Fall Detect', status: !monitoring.fallDetected, icon: '🏃', detail: monitoring.fallDetected ? 'DETECTED' : 'Normal' },
  ];

  return (
    <div className="min-h-screen pb-28" style={{ background: 'linear-gradient(135deg, #0a0a15 0%, #1a1a2e 100%)' }}>
      {emergencyCountdown !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-flash-red">
          <div className="text-center p-8 rounded-3xl mx-6" style={{ background: 'rgba(239, 68, 68, 0.2)', border: '2px solid rgba(239, 68, 68, 0.6)', backdropFilter: 'blur(20px)' }}>
            <div className="text-7xl font-black text-red-400 mb-4">{emergencyCountdown}</div>
            <h2 className="text-white text-2xl font-black mb-2">DANGER DETECTED!</h2>
            <p className="text-gray-300 mb-6">Emergency SOS will be sent in {emergencyCountdown} seconds</p>
            <button onClick={() => { setEmergencyCountdown(null); setSafetyStatus('safe'); }} className="px-8 py-3 rounded-2xl text-white font-bold" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
              Cancel (False Alarm)
            </button>
          </div>
        </div>
      )}

      <div className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-black text-white">AI Monitoring</h1>
        <p className="text-gray-400 text-sm mt-1">Real-time safety surveillance</p>
      </div>

      <div className="px-5 space-y-4">
        <div className="rounded-3xl p-5 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${dangerColor}40` }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wider">Danger Probability</p>
              <div className="flex items-end gap-2 mt-1">
                <span className="text-5xl font-black" style={{ color: dangerColor }}>{monitoring.dangerProbability}</span>
                <span className="text-2xl font-bold text-gray-400 mb-1">%</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs uppercase tracking-wider">Confidence</p>
              <p className="text-white font-bold text-2xl mt-1">{monitoring.confidenceLevel}%</p>
            </div>
          </div>
          <div className="flex justify-center my-4">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="none" stroke={dangerColor} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${monitoring.dangerProbability * 2.51} 251`} style={{ transition: 'stroke-dasharray 0.5s ease' }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs text-gray-400">RISK</span>
                <span className="text-lg font-black" style={{ color: dangerColor }}>{monitoring.dangerProbability > 70 ? 'HIGH' : monitoring.dangerProbability > 40 ? 'MED' : 'LOW'}</span>
              </div>
            </div>
          </div>
          {monitoring.isActive && (
            <div className="flex items-end gap-0.5 h-10">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="flex-1 rounded-full animate-wave" style={{ height: `${(i % 8 + 1) * 4}px`, background: `linear-gradient(180deg, ${dangerColor}, transparent)`, animationDelay: `${i * 0.03}s`, opacity: 0.7 }} />
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {sensorCards.map(sensor => (
            <div key={sensor.label} className="rounded-2xl p-3 text-center" style={{ background: sensor.status ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', border: `1px solid ${sensor.status ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}` }}>
              <div className="text-xl mb-1">{sensor.icon}</div>
              <div className="text-xs font-bold" style={{ color: sensor.status ? '#10b981' : '#ef4444' }}>{sensor.status ? 'ON' : 'OFF'}</div>
              <div className="text-gray-500 text-xs">{sensor.label}</div>
              <div className="text-gray-400 text-xs mt-0.5">{sensor.detail}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Heart Rate', value: `${monitoring.heartRate} BPM`, icon: '💓', color: monitoring.heartRate < 100 ? '#10b981' : '#f59e0b' },
            { label: 'Noise Level', value: `${monitoring.noiseLevel} dB`, icon: '🔊', color: monitoring.noiseLevel < 70 ? '#10b981' : '#f59e0b' },
            { label: 'Running', value: monitoring.runningDetected ? 'DETECTED' : 'Not Detected', icon: '🏃', color: monitoring.runningDetected ? '#ef4444' : '#10b981' },
            { label: 'Fall Detect', value: monitoring.fallDetected ? 'DETECTED' : 'Normal', icon: '⚡', color: monitoring.fallDetected ? '#ef4444' : '#10b981' },
          ].map(item => (
            <div key={item.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{item.icon}</span>
                <span className="text-gray-400 text-xs">{item.label}</span>
              </div>
              <div className="font-bold text-sm" style={{ color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Live Activity Log
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {logs.map((log, i) => (
              <div key={i} className="text-xs text-gray-400 py-1 border-b border-white border-opacity-5 font-mono">{log}</div>
            ))}
          </div>
        </div>

        <div className="pb-4">
          {monitoring.isActive ? (
            <button onClick={() => setMonitoring({ isActive: false })} className="w-full py-4 rounded-2xl text-white font-bold text-lg" style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
              Stop AI Monitoring
            </button>
          ) : (
            <button onClick={() => { setMonitoring({ isActive: true }); addLog('🚀 AI Monitoring started'); }} className="w-full py-4 rounded-2xl text-white font-bold text-lg" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)', boxShadow: '0 8px 30px rgba(124, 58, 237, 0.4)' }}>
              Start AI Monitoring
            </button>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
