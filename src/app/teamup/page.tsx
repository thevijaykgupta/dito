"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BottomNav from "@/components/BottomNav";

type Post = {
  id: number;
  name: string;
  title: string;
  description: string;
  skills: string[];
  members: number;
  maxMembers: number;
  match?: number;
};

export default function TeamUpPage() {
  const [tab, setTab] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      name: "Rahul Verma",
      title: "Hackathon Team",
      description: "Need React + Backend dev",
      skills: ["React", "Node"],
      members: 2,
      maxMembers: 4,
      match: 90,
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    skills: "",
  });

  const createPost = () => {
    if (!form.title) return;

    const newPost: Post = {
      id: Date.now(),
      name: "You",
      title: form.title,
      description: form.description,
      skills: form.skills.split(","),
      members: 1,
      maxMembers: 4,
    };

    setPosts([newPost, ...posts]);
    setShowModal(false);
    setForm({ title: "", description: "", skills: "" });
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white pb-24">
      <div className="max-w-3xl mx-auto px-4 pt-20">

        {/* HEADER */}
        <h1 className="text-2xl font-bold mb-6">🤝 TeamUp</h1>

        {/* TABS */}
        <div className="flex gap-2 mb-6">
          {["all", "my", "matches"].map((t) => (
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

        {/* POSTS */}
        <div className="space-y-4">
          {posts.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.02 }}
              className="bg-[#121633] border border-white/10 rounded-2xl p-5"
            >
              <p className="font-semibold">{p.title}</p>
              <p className="text-gray-400 text-sm">{p.description}</p>

              <div className="flex justify-between mt-4">
                <button className="border border-white/20 px-3 py-1 rounded-full text-sm">
                  Chat
                </button>
                <button className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
                  Join
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <BottomNav />
    </main>
  );
}