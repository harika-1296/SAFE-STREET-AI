'use client';

import React, { useState } from 'react';
import BottomNav from '@/components/BottomNav';


const mapMarkers = [
  { id: 1, type: 'police', label: 'Police Station', icon: '🚔', color: '#3b82f6' },
  { id: 2, type: 'hospital', label: 'Apollo Hospital', icon: '🏥', color: '#10b981' },
  { id: 3, type: 'danger', label: 'High Risk Zone', icon: '⚠️', color: '#ef4444' },
  { id: 4, type: 'safe', label: 'Safe Zone', icon: '✅', color: '#10b981' },
  { id: 5, type: 'shelter', label: 'Emergency Shelter', icon: '🏠', color: '#7c3aed' },
];

const heatZones = [
  { id: 1, name: 'MG Road Area', risk: 'High', incidents: 23, color: '#ef4444' },
  { id: 2, name: 'Koramangala', risk: 'Medium', incidents: 12, color: '#f59e0b' },
  { id: 3, name: 'Indiranagar', risk: 'Low', incidents: 5, color: '#10b981' },
  { id: 4, name: 'Whitefield', risk: 'Medium', incidents: 8, color: '#f59e0b' },
  { id: 5, name: 'Electronic City', risk: 'High', incidents: 18, color: '#ef4444' },
];

export default function MapPage() {
  const [activeTab, setActiveTab] = useState<'location' | 'route' | 'heatmap'>('location');
  const [destination, setDestination] = useState('');
  const [routeType, setRouteType] = useState<'safe' | 'fast'>('safe');
  const [filter, setFilter] = useState('all');
  const [isNight, setIsNight] = useState(false);
  const [shareLocation, setShareLocation] = useState(false);

  return (
    <div className="min-h-screen pb-28" style={{ background: 'linear-gradient(135deg, #0a0a15 0%, #1a1a2e 100%)' }}>
      <div className="px-5 pt-12 pb-4">
        <h1 className="text-2xl font-black text-white">Safety Map</h1>
        <p className="text-gray-400 text-sm mt-1">Navigate safely with AI guidance</p>
      </div>

      <div className="px-5 mb-4">
        <div className="flex gap-2 p-1 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)' }}>
          {(['location', 'route', 'heatmap'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold capitalize transition-all" style={{ background: activeTab === tab ? 'linear-gradient(135deg, #7c3aed, #3b82f6)' : 'transparent', color: activeTab === tab ? 'white' : '#6b7280' }}>
              {tab === 'location' ? '📍 Live' : tab === 'route' ? '🗺️ Route' : '🔥 Heatmap'}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 space-y-4">
        <div className="rounded-3xl overflow-hidden relative" style={{ height: '280px', background: isNight ? 'linear-gradient(135deg, #0a0a15, #1a1a2e)' : 'linear-gradient(135deg, #1e3a5f, #2d5a8e)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          {mapMarkers.map((marker, idx) => (
            <div key={marker.id} className="absolute flex flex-col items-center" style={{ left: `${15 + idx * 17}%`, top: `${15 + idx * 12}%` }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg" style={{ background: `${marker.color}30`, border: `2px solid ${marker.color}` }}>
                {marker.icon}
              </div>
            </div>
          ))}
          <div className="absolute" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
            <div className="w-4 h-4 rounded-full bg-blue-400 border-2 border-white shadow-lg animate-pulse" />
            <div className="absolute inset-0 rounded-full bg-blue-400 opacity-30 animate-ping" />
          </div>
          <div className="absolute top-3 left-3 right-3 flex justify-between">
            <div className="px-3 py-1.5 rounded-xl text-xs text-white font-medium" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)' }}>📍 Bangalore, Karnataka</div>
            <button onClick={() => setIsNight(!isNight)} className="px-3 py-1.5 rounded-xl text-xs text-white font-medium" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)' }}>{isNight ? '☀️ Day' : '🌙 Night'}</button>
          </div>
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
            <div className="text-xs text-white" style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '6px 10px', borderRadius: '10px' }}>
              <div>Lat: 12.9716°N</div><div>Lng: 77.5946°E</div><div>Accuracy: ±5m</div>
            </div>
            <div className="text-xs font-medium px-3 py-1.5 rounded-xl" style={{ background: 'rgba(16, 185, 129, 0.3)', border: '1px solid rgba(16, 185, 129, 0.5)', color: '#10b981' }}>🟢 GPS Active</div>
          </div>
        </div>

        {activeTab === 'location' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              {[{ label: 'Latitude', value: '12.9716°N', icon: '📍' }, { label: 'Longitude', value: '77.5946°E', icon: '📍' }, { label: 'Accuracy', value: '±5 meters', icon: '🎯' }, { label: 'Altitude', value: '920m', icon: '⛰️' }].map(item => (
                <div key={item.label} className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-lg mb-1">{item.icon}</div>
                  <div className="text-white font-bold text-sm">{item.value}</div>
                  <div className="text-gray-500 text-xs">{item.label}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setShareLocation(!shareLocation)} className="w-full py-4 rounded-2xl text-white font-bold flex items-center justify-center gap-2" style={{ background: shareLocation ? 'rgba(239, 68, 68, 0.2)' : 'linear-gradient(135deg, #7c3aed, #3b82f6)', border: shareLocation ? '1px solid rgba(239, 68, 68, 0.4)' : 'none' }}>
              {shareLocation ? '🔴 Stop Sharing Location' : '📤 Share Live Location'}
            </button>
          </>
        )}

        {activeTab === 'route' && (
          <>
            <div className="rounded-3xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="mb-4">
                <label className="text-gray-400 text-sm mb-2 block">Destination</label>
                <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="Enter destination..." className="w-full px-4 py-3 rounded-2xl text-white placeholder-gray-600 outline-none" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
              </div>
              <div className="flex gap-3 mb-4">
                {(['safe', 'fast'] as const).map(type => (
                  <button key={type} onClick={() => setRouteType(type)} className="flex-1 py-3 rounded-2xl text-sm font-semibold" style={{ background: routeType === type ? 'linear-gradient(135deg, #7c3aed, #3b82f6)' : 'rgba(255,255,255,0.05)', color: routeType === type ? 'white' : '#6b7280', border: routeType !== type ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                    {type === 'safe' ? '🛡️ Safest Route' : '⚡ Fastest Route'}
                  </button>
                ))}
              </div>
              <button className="w-full py-4 rounded-2xl text-white font-bold" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>Get Directions</button>
            </div>
            <div className="space-y-3">
              {[{ label: 'Nearby Police Stations', count: 3, icon: '🚔', color: '#3b82f6' }, { label: 'Nearby Hospitals', count: 2, icon: '🏥', color: '#10b981' }, { label: 'Public Places', count: 8, icon: '🏪', color: '#7c3aed' }, { label: 'Metro Stations', count: 2, icon: '🚇', color: '#f59e0b' }].map(item => (
                <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center gap-3"><span className="text-xl">{item.icon}</span><span className="text-white font-medium text-sm">{item.label}</span></div>
                  <span className="font-bold text-sm" style={{ color: item.color }}>{item.count} nearby</span>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'heatmap' && (
          <>
            <div className="flex gap-2 flex-wrap mb-2">
              {['all', 'danger', 'safe', 'police', 'hospital'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className="px-3 py-1.5 rounded-xl text-xs font-semibold capitalize" style={{ background: filter === f ? 'linear-gradient(135deg, #7c3aed, #3b82f6)' : 'rgba(255,255,255,0.05)', color: filter === f ? 'white' : '#6b7280', border: filter !== f ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                  {f}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {heatZones.map(zone => (
                <div key={zone.id} className="flex items-center justify-between p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${zone.color}30` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: zone.color }} />
                    <div><p className="text-white font-semibold text-sm">{zone.name}</p><p className="text-gray-500 text-xs">{zone.incidents} incidents reported</p></div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-xl" style={{ background: `${zone.color}20`, color: zone.color }}>{zone.risk}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
