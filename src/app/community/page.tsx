'use client';

import React, { useState } from 'react';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/context/AppContext';

const communityReports = [
  { id: 1, area: 'MG Road, Near Metro', type: 'Unsafe Area', time: '2 hours ago', reports: 8, verified: true, severity: 'high' },
  { id: 2, area: 'Koramangala 5th Block', type: 'Poor Lighting', time: '5 hours ago', reports: 3, verified: false, severity: 'medium' },
  { id: 3, area: 'Indiranagar 100ft Road', type: 'Suspicious Activity', time: '1 day ago', reports: 12, verified: true, severity: 'high' },
  { id: 4, area: 'Jayanagar 4th Block', type: 'Isolated Road', time: '2 days ago', reports: 5, verified: true, severity: 'medium' },
  { id: 5, area: 'HSR Layout Sector 2', type: 'Safe Zone', time: '3 days ago', reports: 20, verified: true, severity: 'safe' },
];

const safetyTips = [
  { icon: '📱', tip: 'Keep your phone charged and SafeStreet AI monitoring active when traveling alone.' },
  { icon: '👥', tip: 'Share your live location with trusted contacts when traveling at night.' },
  { icon: '🚶', tip: 'Prefer well-lit, crowded routes. Avoid isolated roads especially after dark.' },
  { icon: '🔊', tip: 'Trust your instincts. If something feels wrong, move to a public place immediately.' },
  { icon: '📞', tip: 'Save emergency numbers: Police 100, Women Helpline 1091, Ambulance 108.' },
];

export default function CommunityPage() {
  const { addAlert } = useApp();
  const [activeTab, setActiveTab] = useState<'alerts' | 'report' | 'tips'>('alerts');
  const [reportForm, setReportForm] = useState({ area: '', type: '', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleReport = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addAlert({ type: 'community', title: 'Report Submitted', message: `Unsafe area reported: ${reportForm.area}`, severity: 'medium' });
    setTimeout(() => { setSubmitted(false); setReportForm({ area: '', type: '', description: '' }); }, 2000);
  };

  const severityColors = {
    high: { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '#ef4444', label: 'High Risk' },
    medium: { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', text: '#f59e0b', label: 'Medium' },
    safe: { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', text: '#10b981', label: 'Safe' },
  };

  return (
    <div className="min-h-screen pb-28" style={{ background: 'linear-gradient(135deg, #0a0a15 0%, #1a1a2e 100%)' }}>
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-black text-white">Community Safety</h1>
        <p className="text-gray-400 text-sm mt-1">Stay informed, stay safe together</p>
      </div>

      <div className="px-5 mb-4">
        <div className="flex gap-2 p-1 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {(['alerts', 'report', 'tips'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all" style={{ background: activeTab === tab ? 'linear-gradient(135deg, #7c3aed, #3b82f6)' : 'transparent', color: activeTab === tab ? 'white' : '#6b7280' }}>
              {tab === 'alerts' ? '🔔 Alerts' : tab === 'report' ? '📝 Report' : '💡 Tips'}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 space-y-4">
        {activeTab === 'alerts' && (
          <>
            <div className="p-4 rounded-2xl flex items-center gap-3" style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <span className="text-2xl">🚨</span>
              <div>
                <p className="text-red-400 font-bold text-sm">Active Alert Nearby</p>
                <p className="text-gray-400 text-xs">3 incidents reported within 2km of your location</p>
              </div>
            </div>
            {communityReports.map(report => {
              const sc = severityColors[report.severity as keyof typeof severityColors];
              return (
                <div key={report.id} className="rounded-2xl p-4" style={{ background: sc.bg, border: `1px solid ${sc.border}` }}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-bold text-sm">{report.type}</span>
                        {report.verified && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>✓ Verified</span>}
                      </div>
                      <p className="text-gray-400 text-xs">📍 {report.area}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-xl" style={{ background: `${sc.text}20`, color: sc.text }}>{sc.label}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-500 text-xs">🕐 {report.time}</span>
                    <span className="text-gray-500 text-xs">👥 {report.reports} reports</span>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {activeTab === 'report' && (
          <div className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="text-white font-bold mb-4">Report Unsafe Area</h3>
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">✅</div>
                <p className="text-green-400 font-bold">Report Submitted!</p>
                <p className="text-gray-400 text-sm mt-2">Thank you for keeping the community safe</p>
              </div>
            ) : (
              <form onSubmit={handleReport} className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Area / Location</label>
                  <input value={reportForm.area} onChange={e => setReportForm({ ...reportForm, area: e.target.value })} placeholder="e.g., MG Road near Metro" required className="w-full px-4 py-3 rounded-2xl text-white placeholder-gray-600 outline-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Incident Type</label>
                  <select value={reportForm.type} onChange={e => setReportForm({ ...reportForm, type: e.target.value })} required className="w-full px-4 py-3 rounded-2xl text-white outline-none" style={{ background: 'rgba(15,15,30,0.9)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <option value="">Select type...</option>
                    {['Unsafe Area', 'Poor Lighting', 'Suspicious Activity', 'Isolated Road', 'Harassment'].map(r => <option key={r} value={r} style={{ background: '#1a1a2e' }}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">Description</label>
                  <textarea value={reportForm.description} onChange={e => setReportForm({ ...reportForm, description: e.target.value })} placeholder="Describe what happened..." rows={3} className="w-full px-4 py-3 rounded-2xl text-white placeholder-gray-600 outline-none resize-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>
                <button type="submit" className="w-full py-4 rounded-2xl text-white font-bold" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>Submit Report</button>
              </form>
            )}
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="space-y-3">
            {safetyTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: 'rgba(124, 58, 237, 0.2)' }}>{tip.icon}</div>
                <p className="text-gray-300 text-sm leading-relaxed">{tip.tip}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
