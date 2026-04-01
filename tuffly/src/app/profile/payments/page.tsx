'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function ProfilePaymentsPage() {
  const [upiId, setUpiId] = useState('');
  const [message, setMessage] = useState('');

  const onSave = () => {
    localStorage.setItem('profile-upi-id', upiId);
    setMessage('Payment details saved.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        <Link href="/profile" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline mb-4">
          <FaArrowLeft />
          Back to profile
        </Link>
        <h1 className="text-2xl font-bold mb-2">Payments</h1>
        <p className="text-gray-600 mb-6">Add payment details here instead of signup.</p>

        <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
        <input
          value={upiId}
          onChange={(e) => setUpiId(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-4"
          placeholder="yourname@upi"
        />
        <button onClick={onSave} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Save
        </button>
        {message ? <p className="mt-3 text-sm text-green-600">{message}</p> : null}
      </div>
    </div>
  );
}
