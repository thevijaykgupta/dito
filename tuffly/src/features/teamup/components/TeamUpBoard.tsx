'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { TeamMatchResult, TeamUpProfile } from '../types';

const initialState: Omit<TeamUpProfile, 'userId' | 'name'> = {
  campus: '',
  isAvailableForTeam: true,
  subjects: [],
  skills: [],
  region: '',
  cgpaMin: undefined,
  cgpaMax: undefined,
  hostel: '',
};

function parseCsv(value: string): string[] {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function TeamUpBoard() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState(initialState);
  const [subjectInput, setSubjectInput] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [matches, setMatches] = useState<TeamMatchResult[]>([]);
  const [status, setStatus] = useState('');

  const saveProfile = async () => {
    if (!user) return;
    const payload: TeamUpProfile = {
      ...form,
      userId: user.id,
      name: user.name,
      campus: form.campus || user.campus,
      subjects: parseCsv(subjectInput),
      skills: parseCsv(skillInput),
    };
    const response = await fetch('/api/teamup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (response.ok) {
      await updateProfile({ isAvailableForTeam: payload.isAvailableForTeam });
      setStatus('TeamUp profile saved.');
    } else {
      setStatus('Failed to save profile.');
    }
  };

  const findMatches = async () => {
    if (!user) return;
    const payload: TeamUpProfile = {
      ...form,
      userId: user.id,
      name: user.name,
      campus: form.campus || user.campus,
      subjects: parseCsv(subjectInput),
      skills: parseCsv(skillInput),
    };
    const response = await fetch('/api/teamup/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setMatches(data.matches || []);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">TeamUp</h1>
        <p className="text-gray-600 mb-4">Find EL/PBL teammates based on subjects, skills, and location.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isAvailableForTeam}
              onChange={(e) => setForm((prev) => ({ ...prev, isAvailableForTeam: e.target.checked }))}
            />
            Available for team
          </label>
          <input
            className="border rounded px-3 py-2"
            placeholder="Campus (RVCE / RVU)"
            value={form.campus}
            onChange={(e) => setForm((prev) => ({ ...prev, campus: e.target.value }))}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Subjects (comma separated)"
            value={subjectInput}
            onChange={(e) => setSubjectInput(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Skills (comma separated)"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Region"
            value={form.region}
            onChange={(e) => setForm((prev) => ({ ...prev, region: e.target.value }))}
          />
          <input
            className="border rounded px-3 py-2"
            placeholder="Hostel"
            value={form.hostel}
            onChange={(e) => setForm((prev) => ({ ...prev, hostel: e.target.value }))}
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button onClick={saveProfile} className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Save Profile
          </button>
          <button onClick={findMatches} className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">
            Find Matches
          </button>
        </div>
        {status ? <p className="mt-3 text-sm text-gray-600">{status}</p> : null}
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Suggested teammates</h2>
        <div className="space-y-3">
          {matches.length === 0 ? (
            <p className="text-gray-500">No matches yet.</p>
          ) : (
            matches.map((match) => (
              <div key={match.profile.userId} className="border rounded p-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">{match.profile.name}</p>
                  <p className="text-sm text-gray-600">
                    {match.profile.subjects.join(', ')} | {match.profile.skills.join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">{match.compatibilityScore}%</p>
                  <button className="text-sm text-indigo-600 hover:underline">Invite to team</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
