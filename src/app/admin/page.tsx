'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const stats = [
  { label: 'Total Users', value: '12,847', change: '+12%', icon: '👥', color: '#7c3aed' },
  { label: 'Active Alerts', value: '234', change: '+5%', icon: '🚨', color: '#ef4444' },
  { label: 'SOS Sent Today', value: '47', change: '-3%', icon: '🆘', color: '#f59e0b' },
  { label: 'Incidents Resolved', value: '1,293', change: '+18%', icon: '✅', color: '#10b981' },
];

const recentIncidents = [
  { id: 1, user: 'Priya S.', type: 'Distress Detection', location: 'MG Road, Bangalore', time: '2 min ago', status: 'active', score: 89 },
  { id: 2, user: 'Ananya K.', type: 'Voice Activation', location: 'Koramangala', time: '15 min ago', status: 'resolved', score: 92 },
  { id: 3, user: 'Meera R.', type: 'Fall Detection', location: 'Indiranagar', time: '1 hr ago', status: 'resolved', score: 67 },
  { id: 4, user: 'Divya M.', type: 'Unusual Movement', location: 'Whitefield', time: '2 hr ago', status: 'pending', score: 45 },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'alerts' | 'analytics'>('overview');

  const statusColors = {
    active: { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444', label: 'Active' },
    resolved: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981', label: 'Resolved' },
    pending: { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b', label: 'Pending' },
  };

  return (
    <div className="min-h-screen pb-8" style={{ background: 'linear-gradient(135deg, #0a0a15 0%, #1a1a2e 100%)' }}>
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">SafeStreet AI Control Center</p>
          </div>
          <Link href="/dashboard" className="px-4 py-2 rounded-xl text-sm font-semibold text-purple-400" style={{ background: 'rgba(124, 58, 237, 0.2)', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
            ← App
          </Link>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="px-5 mb-4 overflow-x-auto">
        <div className="flex gap-2 pb-1" style={{ minWidth: 'max-content' }}>
          {(['overview', 'users', 'alerts', 'analytics'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className="px-4 py-2 rounded-xl text-xs font-semibold capitalize whitespace-nowrap" style={{ background: activeTab === tab ? 'linear-gradient(135deg, #7c3aed, #3b82f6)' : 'rgba(255,255,255,0.05)', color: activeTab === tab ? 'white' : '#6b7280', border: activeTab !== tab ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 space-y-4">
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map(stat => (
                <div key={stat.label} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{stat.icon}</span>
                    <span className="text-xs font-bold" style={{ color: stat.change.startsWith('+') ? '#10b981' : '#ef4444' }}>{stat.change}</span>
                  </div>
                  <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Incidents */}
            <div className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-white font-bold mb-4">Recent Incidents</h3>
              <div className="space-y-3">
                {recentIncidents.map(incident => {
                  const sc = statusColors[incident.status as keyof typeof statusColors];
                  return (
                    <div key={incident.id} className="p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-white font-semibold text-sm">{incident.user}</p>
                          <p className="text-gray-400 text-xs">{incident.type}</p>
                          <p className="text-gray-500 text-xs">📍 {incident.location}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold px-2 py-1 rounded-xl" style={{ background: sc.bg, color: sc.text }}>{sc.label}</span>
                          <p className="text-gray-500 text-xs mt-1">{incident.time}</p>
                          <p className="text-xs font-bold mt-1" style={{ color: incident.score > 70 ? '#ef4444' : '#f59e0b' }}>{incident.score}% risk</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Heatmap Summary */}
            <div className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-white font-bold mb-4">Heatmap Data</h3>
              <div className="space-y-3">
                {[
                  { area: 'MG Road', incidents: 23, pct: 85 },
                  { area: 'Electronic City', incidents: 18, pct: 67 },
                  { area: 'Koramangala', incidents: 12, pct: 45 },
                  { area: 'Whitefield', incidents: 8, pct: 30 },
                  { area: 'Indiranagar', incidents: 5, pct: 18 },
                ].map(zone => (
                  <div key={zone.area}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-300">{zone.area}</span>
                      <span className="text-gray-500">{zone.incidents} incidents</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="h-full rounded-full" style={{ width: `${zone.pct}%`, background: zone.pct > 70 ? '#ef4444' : zone.pct > 40 ? '#f59e0b' : '#10b981' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <h3 className="text-white font-bold mb-4">Registered Users</h3>
            <div className="space-y-3">
              {['Priya Sharma', 'Ananya Kumar', 'Meera Reddy', 'Divya Menon', 'Sneha Patel'].map((name, i) => (
                <div key={name} className="flex items-center justify-between p-3 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>{name.charAt(0)}</div>
                    <div>
                      <p className="text-white font-semibold text-sm">{name}</p>
                      <p className="text-gray-500 text-xs">Active • Bangalore</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold px-2 py-1 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>Active</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-3">
            {recentIncidents.map(incident => {
              const sc = statusColors[incident.status as keyof typeof statusColors];
              return (
                <div key={incident.id} className="rounded-2xl p-4" style={{ background: sc.bg, border: `1px solid ${sc.text}30` }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white font-bold text-sm">{incident.type}</p>
                      <p className="text-gray-400 text-xs">{incident.user} • {incident.location}</p>
                      <p className="text-gray-500 text-xs mt-1">{incident.time}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded-xl" style={{ background: `${sc.text}20`, color: sc.text }}>{sc.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-4">
            <div className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 className="text-white font-bold mb-4">Weekly Statistics</h3>
              <div className="flex items-end gap-2 h-32">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-lg" style={{ height: `${h}%`, background: 'linear-gradient(180deg, #7c3aed, #3b82f6)' }} />
                    <span className="text-gray-500 text-xs">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{ label: 'Avg Response Time', value: '2.3 min', icon: '⚡' }, { label: 'False Alarms', value: '12%', icon: '🔔' }, { label: 'Contacts Notified', value: '847', icon: '📱' }, { label: 'Routes Analyzed', value: '3,291', icon: '🗺️' }].map(item => (
                <div key={item.label} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-xl mb-2">{item.icon}</div>
                  <div className="text-white font-black text-lg">{item.value}</div>
                  <div className="text-gray-500 text-xs">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
