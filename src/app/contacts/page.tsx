'use client';

import React, { useState } from 'react';
import { useApp, EmergencyContact } from '@/context/AppContext';
import BottomNav from '@/components/BottomNav';

export default function ContactsPage() {
  const { emergencyContacts, setEmergencyContacts } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', email: '', relationship: '', isPrimary: false });

  const handleSave = () => {
    if (editingId) {
      setEmergencyContacts(emergencyContacts.map(c => c.id === editingId ? { ...c, ...form } : c));
      setEditingId(null);
    } else {
      const newContact: EmergencyContact = { ...form, id: Date.now().toString(), avatar: form.name.charAt(0) };
      setEmergencyContacts([...emergencyContacts, newContact]);
    }
    setForm({ name: '', phone: '', email: '', relationship: '', isPrimary: false });
    setShowForm(false);
  };

  const handleEdit = (contact: EmergencyContact) => {
    setForm({ name: contact.name, phone: contact.phone, email: contact.email, relationship: contact.relationship, isPrimary: contact.isPrimary });
    setEditingId(contact.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setEmergencyContacts(emergencyContacts.filter(c => c.id !== id));
  };

  const relationshipColors: Record<string, string> = {
    Mother: '#ec4899', Father: '#3b82f6', Sister: '#a78bfa', Brother: '#60a5fa', Friend: '#10b981', Husband: '#f59e0b', Wife: '#ec4899', Other: '#6b7280',
  };

  return (
    <div className="min-h-screen pb-28" style={{ background: 'linear-gradient(135deg, #0a0a15 0%, #1a1a2e 100%)' }}>
      <div className="px-5 pt-12 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Emergency Contacts</h1>
          <p className="text-gray-400 text-sm mt-1">{emergencyContacts.length} contacts saved</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditingId(null); setForm({ name: '', phone: '', email: '', relationship: '', isPrimary: false }); }} className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xl" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>
          +
        </button>
      </div>

      <div className="px-5 space-y-4">
        {showForm && (
          <div className="rounded-3xl p-5" style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
            <h3 className="text-white font-bold mb-4">{editingId ? 'Edit Contact' : 'Add New Contact'}</h3>
            <div className="space-y-3">
              {[{ key: 'name', label: 'Full Name', type: 'text', placeholder: 'Contact name' }, { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98765 43210' }, { key: 'email', label: 'Email', type: 'email', placeholder: 'email@example.com' }].map(field => (
                <div key={field.key}>
                  <label className="text-gray-400 text-xs mb-1 block">{field.label}</label>
                  <input type={field.type} value={form[field.key as keyof typeof form] as string} onChange={e => setForm({ ...form, [field.key]: e.target.value })} placeholder={field.placeholder} className="w-full px-4 py-3 rounded-2xl text-white placeholder-gray-600 outline-none text-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>
              ))}
              <div>
                <label className="text-gray-400 text-xs mb-1 block">Relationship</label>
                <select value={form.relationship} onChange={e => setForm({ ...form, relationship: e.target.value })} className="w-full px-4 py-3 rounded-2xl text-white outline-none text-sm" style={{ background: 'rgba(15,15,30,0.9)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <option value="">Select relationship</option>
                  {['Mother', 'Father', 'Sister', 'Brother', 'Friend', 'Husband', 'Wife', 'Other'].map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div className={`w-12 h-6 rounded-full transition-all relative ${form.isPrimary ? 'bg-purple-600' : 'bg-gray-700'}`} onClick={() => setForm({ ...form, isPrimary: !form.isPrimary })}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${form.isPrimary ? 'left-7' : 'left-1'}`} />
                </div>
                <span className="text-gray-300 text-sm">Set as Primary Contact</span>
              </label>
              <div className="flex gap-3">
                <button onClick={() => setShowForm(false)} className="flex-1 py-3 rounded-2xl text-gray-400 font-semibold text-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>Cancel</button>
                <button onClick={handleSave} className="flex-1 py-3 rounded-2xl text-white font-semibold text-sm" style={{ background: 'linear-gradient(135deg, #7c3aed, #3b82f6)' }}>Save</button>
              </div>
            </div>
          </div>
        )}

        {emergencyContacts.map(contact => (
          <div key={contact.id} className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0" style={{ background: `${relationshipColors[contact.relationship] || '#6b7280'}30`, border: `2px solid ${relationshipColors[contact.relationship] || '#6b7280'}50` }}>
                {contact.avatar || contact.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-white font-bold text-sm">{contact.name}</p>
                  {contact.isPrimary && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(124, 58, 237, 0.2)', color: '#a78bfa' }}>Primary</span>}
                </div>
                <p className="text-gray-400 text-xs mt-0.5">{contact.relationship} • {contact.phone}</p>
                <p className="text-gray-500 text-xs">{contact.email}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(contact)} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(59, 130, 246, 0.2)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
                <button onClick={() => handleDelete(contact.id)} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(239, 68, 68, 0.2)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>
          </div>
        ))}

        <button className="w-full py-4 rounded-2xl text-gray-400 font-semibold flex items-center justify-center gap-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.15)' }}>
          <span className="text-xl">📱</span>
          Import from Phone Contacts
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
