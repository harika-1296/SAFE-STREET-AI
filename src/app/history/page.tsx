'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import BottomNav from '@/components/BottomNav';

export default function HistoryPage() {
  const { incidents } = useApp();
  const [selected, setSelected] = useState<string | null>(null);

  const statusColors = {
    resolved: { bg: 'rgba(16, 185, 129, 0.1)', border: 'rgba(16, 185, 129, 0.3)', text: '#10b981' },
    pending: { bg: 'rgba(245, 158, 11, 0.1)', border: 'rgba(245, 158, 11, 0.3)', text: '#f59e0b' },
    active: { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '#ef4444' },
  };

  const formatDate = (date: Date) => date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="min-h-screen pb-28" style={{ background: 'linear-gradient(135deg, #0a0a15 0%, #1a1a2e 100%)' }}>
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-black text-white">Incident History</h1>
        <p className="text-gray-400 text-sm mt-1">{incidents.length} incidents recorded</p>
      </div>

      <div className="px-5 mb-4">
        <div className="grid grid-cols-3 gap-3">
          {[{ label: 'Total', value: incidents.length, color: '#7c3aed' }, { label: 'Resolved', value: incidents.filter(i => i.status === 'resolved').length, color: '#10b981' }, { label: 'Pending', value: incidents.filter(i => i.status === 'pending').length, color: '#f59e0b' }].map(stat => (
            <div key={stat.label} className="p-3 rounded-2xl text-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 space-y-4">
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ background: 'rgba(124, 58, 237, 0.3)' }} />
          <div className="space-y-4">
            {incidents.map(incident => {
              const sc = statusColors[incident.status];
              const isExpanded = selected === incident.id;
              return (
                <div key={incident.id} className="relative pl-14">
                  <div className="absolute left-4 top-4 w-4 h-4 rounded-full border-2 z-10" style={{ background: sc.text, borderColor: sc.text, boxShadow: `0 0 10px ${sc.text}` }} />
                  <div className="rounded-2xl p-4 cursor-pointer transition-all" style={{ background: sc.bg, border: `1px solid ${sc.border}` }} onClick={() => setSelected(isExpanded ? null : incident.id)}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-white font-bold text-sm">{incident.type}</p>
                        <p className="text-gray-400 text-xs mt-0.5">📍 {incident.location}</p>
                        <p className="text-gray-500 text-xs mt-0.5">🕐 {formatDate(incident.date)}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold px-2 py-1 rounded-xl" style={{ background: `${sc.text}20`, color: sc.text }}>{incident.status.toUpperCase()}</span>
                        <div className="mt-2"><span className="text-xs font-bold" style={{ color: incident.dangerScore > 70 ? '#ef4444' : incident.dangerScore > 40 ? '#f59e0b' : '#10b981' }}>{incident.dangerScore}% danger</span></div>
                      </div>
                    </div>
                    {isExpanded && (
                      <div className="mt-4 pt-4 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <p className="text-gray-300 text-sm">{incident.description}</p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <p className="text-gray-500 text-xs">Duration</p>
                            <p className="text-white font-semibold text-sm mt-0.5">{incident.duration}</p>
                          </div>
                          <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
                            <p className="text-gray-500 text-xs">Danger Score</p>
                            <p className="font-semibold text-sm mt-0.5" style={{ color: incident.dangerScore > 70 ? '#ef4444' : '#f59e0b' }}>{incident.dangerScore}/100</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 rounded-xl text-xs font-semibold text-gray-400" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>🎵 Audio (Placeholder)</button>
                          <button className="flex-1 py-2 rounded-xl text-xs font-semibold text-gray-400" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>📄 Report</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
