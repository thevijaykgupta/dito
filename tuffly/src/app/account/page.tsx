'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const hostelOptions = [
  'Cauvery Hostel',
  'Krishna Hostel',
  'Krishna Annex',
  'MV Hostel',
  'DJ Hostel',
  'Krishna Garden Hostel',
  'Millennium Hostel'
];
const academicYearOptions = [
  '1st Year', '2nd Year', '3rd Year', '4th Year', 'PG', 'Other'
];

// Dummy user profile (replace with real user data in production)
const initialProfile = {
  phone: '',
  email: '',
  room: '',
  hostel: '',
  academicYear: ''
};

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [completed, setCompleted] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Dummy data for demonstration
  const purchases = [
    { id: 1, item: 'Oreo Biscuits', price: 30, date: '2024-06-02', seller: { id: 'user2', name: 'User 2' } },
    // ... more purchases
  ];
  const sales = [
    { id: 2, item: 'Cup Noodles', price: 40, date: '2024-06-03', buyer: 'user3@example.com' },
    // ... more sales
  ];

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.phone && profile.email && profile.room && profile.hostel && profile.academicYear) {
      setCompleted(true);
    }
  };

  if (!completed || !profile.phone || !profile.email || !profile.room || !profile.hostel || !profile.academicYear) {
    return (
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-bold mb-6 text-yellow-700 text-center">Profile</h2>
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-2 border-4 border-yellow-300">
            {profilePic && (
              <Image
                src={profilePic}
                alt="Profile"
                fill
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <label className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-full cursor-pointer text-sm">
            Upload Photo
            <input type="file" accept="image/*" onChange={handleProfilePicChange} className="hidden" />
          </label>
        </div>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              value={profile.phone}
              onChange={e => setProfile({ ...profile, phone: e.target.value })}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. 9876543210"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={e => setProfile({ ...profile, email: e.target.value })}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. your@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Room Number</label>
            <input
              type="text"
              value={profile.room}
              onChange={e => setProfile({ ...profile, room: e.target.value })}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. A 100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Hostel</label>
            <select
              value={profile.hostel}
              onChange={e => setProfile({ ...profile, hostel: e.target.value })}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Hostel</option>
              {hostelOptions.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Academic Year</label>
            <select
              value={profile.academicYear}
              onChange={e => setProfile({ ...profile, academicYear: e.target.value })}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Academic Year</option>
              {academicYearOptions.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold">Save Profile</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <div className="mb-6 p-4 bg-white rounded shadow">
        <div><strong>Phone:</strong> {profile.phone}</div>
        <div><strong>Email:</strong> {profile.email}</div>
        <div><strong>Room:</strong> {profile.room}</div>
        <div><strong>Hostel:</strong> {profile.hostel}</div>
        <div><strong>Academic Year:</strong> {profile.academicYear}</div>
      </div>
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Purchases</h2>
        <ul className="space-y-2">
          {purchases.map(p => (
            <li key={p.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
              <span>{p.item}</span>
              <span className="text-gray-500">₹{p.price} • {p.date}</span>
              <span className="text-xs text-gray-400">Seller: {p.seller.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Sales</h2>
        <ul className="space-y-2">
          {sales.map(s => (
            <li key={s.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
              <span>{s.item}</span>
              <span className="text-gray-500">₹{s.price} • {s.date}</span>
              <span className="text-xs text-gray-400">Buyer: {s.buyer}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 
