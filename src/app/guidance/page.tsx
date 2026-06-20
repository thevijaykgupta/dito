"use client";

import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import { motion } from "framer-motion";

type Question = {
  id: number;
  user: string;
  title: string;
  description: string;
  replies: number;
};

type Mentor = {
  id: number;
  name: string;
  domain: string;
  rating: number;
};

export default function GuidancePage() {
  const [tab, setTab] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      user: "Rahul",
      title: "How to prepare for placements?",
      description: "Need roadmap for DSA + projects",
      replies: 4,
    },
    {
      id: 2,
      user: "Sneha",
      title: "Best way to learn React?",
      description: "Beginner level guidance needed",
      replies: 2,
    },
  ]);

  const mentors: Mentor[] = [
    { id: 1, name: "Aman", domain: "SDE @ Amazon", rating: 4.8 },
    { id: 2, name: "Priya", domain: "ML Engineer", rating: 4.6 },
  ];

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const addQuestion = () => {
    if (!form.title) return;

    const newQ: Question = {
      id: Date.now(),
      user: "You",
      title: form.title,
      description: form.description,
      replies: 0,
    };

    setQuestions([newQ, ...questions]);
    setShowModal(false);
    setForm({ title: "", description: "" });
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white pb-24">
      <div className="max-w-3xl mx-auto px-4 pt-20">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">🎓 Get Guidance</h1>
          <p className="text-gray-400 text-sm">
            Ask seniors, get career help
          </p>
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-6">
          {["all", "my", "mentors"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-sm ${
                tab === t
                  ? "bg-yellow-400 text-black font-bold"
                  : "border border-white/20"
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search guidance topics..."
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 mb-6"
        />

        {/* ASK QUESTION CTA */}
        <div className="bg-gradient-to-r from-[#121633] to-[#0d1535] border border-white/10 rounded-2xl p-5 mb-6 flex justify-between items-center">
          <div>
            <p className="font-semibold">Need help?</p>
            <p className="text-gray-400 text-sm">
              Ask your question to seniors
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold"
          >
            Ask
          </button>
        </div>

        {/* MENTORS */}
        {tab === "mentors" && (
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3">Top Mentors</h2>

            <div className="flex gap-4 overflow-x-auto">
              {mentors.map((m) => (
                <div
                  key={m.id}
                  className="min-w-[200px] bg-[#121633] border border-white/10 rounded-2xl p-4"
                >
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-sm text-gray-400">{m.domain}</p>
                  <p className="text-yellow-400 text-sm mt-1">
                    ⭐ {m.rating}
                  </p>

                  <button className="mt-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QUESTIONS */}
        {tab !== "mentors" && (
          <div className="space-y-4">
            {questions.map((q) => (
              <motion.div
                key={q.id}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-[#121633] to-[#0d1535] border border-white/10 rounded-2xl p-5"
              >
                <p className="font-semibold">{q.title}</p>

                <p className="text-gray-400 text-sm mt-1">
                  {q.description}
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  💬 {q.replies} replies
                </p>

                <div className="flex justify-between mt-4">
                  <button className="border border-white/20 px-3 py-1 rounded-full text-sm">
                    View
                  </button>

                  <button className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
                    Answer
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* FLOAT BUTTON */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-20 right-4 bg-yellow-400 text-black w-14 h-14 rounded-full text-2xl shadow-lg"
      >
        +
      </button>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#121633] rounded-2xl p-6 w-full max-w-md">

            <h2 className="text-lg font-bold mb-4">Ask Question</h2>

            <input
              placeholder="Title"
              className="w-full mb-3 p-2 rounded bg-white/5"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              className="w-full mb-4 p-2 rounded bg-white/5"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="border border-white/20 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={addQuestion}
                className="bg-yellow-400 text-black px-4 py-2 rounded font-bold"
              >
                Post
              </button>
            </div>

          </div>
        </div>
      )}

      <BottomNav />
    </main>
  );
}