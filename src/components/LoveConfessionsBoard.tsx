"use client";

import React, { useState, useEffect } from "react";
import { FaHeart, FaUser, FaCalendarAlt, FaPaperPlane } from "react-icons/fa";

interface Confession {
  id: string;
  alias: string;
  message: string;
  date: string;
  likes: number;
}

const getInitialConfessions = (): Confession[] => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("love-confessions");
    if (saved) return JSON.parse(saved);
  }
  return [
    {
      id: "1",
      alias: "Secret Admirer",
      message: "I have a huge crush on the girl who sits in the library every evening. Your smile makes my day!",
      date: new Date().toLocaleDateString(),
      likes: 12,
    },
    {
      id: "2",
      alias: "Hopeless Romantic",
      message: "To the boy in the blue hoodie: I wish I had the courage to say hi. Maybe one day!",
      date: new Date().toLocaleDateString(),
      likes: 8,
    },
  ];
};

export default function LoveConfessionsBoard() {
  const [confessions, setConfessions] = useState<Confession[]>(getInitialConfessions());
  const [form, setForm] = useState({ alias: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("love-confessions", JSON.stringify(confessions));
    }
  }, [confessions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.message.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setConfessions([
        {
          id: Date.now().toString(),
          alias: form.alias.trim() || "Anonymous",
          message: form.message.trim(),
          date: new Date().toLocaleDateString(),
          likes: 0,
        },
        ...confessions,
      ]);
      setForm({ alias: "", message: "" });
      setSubmitting(false);
    }, 500);
  };

  const handleLike = (id: string) => {
    setConfessions((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  return (
    <section className="relative py-12 px-4 max-w-3xl mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-100 to-yellow-100 rounded-3xl blur-2xl opacity-60 -z-10" />
      <div className="bg-white/80 rounded-3xl shadow-2xl p-8 border border-pink-100">
        <h2 className="text-3xl font-extrabold text-pink-600 mb-2 text-center font-display drop-shadow-lg">
          💌 Love Confessions Board
        </h2>
        <p className="text-center text-gray-500 mb-8 text-lg">
          Share your feelings, crushes, or secret admirations anonymously. Spread love and positivity on campus!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 mb-8 items-center justify-center">
          <input
            type="text"
            placeholder="Your alias (optional)"
            value={form.alias}
            onChange={(e) => setForm({ ...form, alias: e.target.value })}
            className="flex-1 px-4 py-2 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none bg-white"
            maxLength={20}
          />
          <textarea
            placeholder="Write your confession..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="flex-1 px-4 py-2 rounded-lg border border-pink-200 focus:ring-2 focus:ring-pink-400 focus:outline-none bg-white min-h-[48px]"
            maxLength={200}
            required
          />
          <button
            type="submit"
            disabled={submitting || !form.message.trim()}
            className="bg-gradient-to-r from-pink-500 to-yellow-400 text-white px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition-transform flex items-center gap-2 disabled:opacity-60"
          >
            <FaPaperPlane />
            Confess
          </button>
        </form>
        <div className="space-y-6">
          {confessions.length === 0 && (
            <div className="text-center text-gray-400">No confessions yet. Be the first to confess! 💖</div>
          )}
          {confessions.map((c) => (
            <div
              key={c.id}
              className="bg-gradient-to-r from-pink-100 via-yellow-50 to-purple-100 rounded-2xl p-5 shadow flex flex-col md:flex-row items-start md:items-center gap-4 border border-pink-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 text-pink-500 font-semibold">
                <FaUser />
                {c.alias}
              </div>
              <div className="flex-1 text-lg text-gray-700 font-medium">
                {c.message}
              </div>
              <div className="flex flex-col items-end gap-2 min-w-[80px]">
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <FaCalendarAlt />
                  {c.date}
                </div>
                <button
                  onClick={() => handleLike(c.id)}
                  className="flex items-center gap-1 text-pink-600 hover:text-pink-800 font-bold text-lg group"
                  aria-label="Like confession"
                >
                  <FaHeart className="transition-transform group-hover:scale-125" />
                  <span>{c.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
