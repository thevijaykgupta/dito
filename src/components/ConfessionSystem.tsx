'use client';

import React, { useState, useEffect } from 'react';
import { FaHeart, FaComment, FaShare, FaEye, FaTimes, FaUserSecret, FaClock, FaFire, FaSadTear, FaLaugh, FaAngry } from 'react-icons/fa';

interface Confession {
  id: string;
  content: string;
  category: 'love' | 'gossip' | 'thoughts' | 'complaint' | 'funny' | 'sad';
  createdAt: Date;
  expiresAt: Date;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  isAnonymous: boolean;
  authorId: string; // Only visible to admin
  authorName: string; // Only visible to admin
  authorEmail: string; // Only visible to admin
}

interface ConfessionSystemProps {
  isAdmin?: boolean;
}

export default function ConfessionSystem({ isAdmin = false }: ConfessionSystemProps) {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newConfession, setNewConfession] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Confession['category']>('thoughts');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'love', name: 'Love & Crush', icon: <FaHeart className="text-red-500" />, color: 'bg-red-100 text-red-800' },
    { id: 'gossip', name: 'Gossip', icon: <FaComment className="text-purple-500" />, color: 'bg-purple-100 text-purple-800' },
    { id: 'thoughts', name: 'Inner Thoughts', icon: <FaEye className="text-blue-500" />, color: 'bg-blue-100 text-blue-800' },
    { id: 'complaint', name: 'Complaints', icon: <FaAngry className="text-orange-500" />, color: 'bg-orange-100 text-orange-800' },
    { id: 'funny', name: 'Funny Stories', icon: <FaLaugh className="text-yellow-500" />, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'sad', name: 'Sad Stories', icon: <FaSadTear className="text-gray-500" />, color: 'bg-gray-100 text-gray-800' },
  ];

  useEffect(() => {
    // Load sample confessions
    const sampleConfessions: Confession[] = [
      {
        id: '1',
        content: 'I have a huge crush on someone from my class but I\'m too shy to tell them. They probably don\'t even know I exist 😔',
        category: 'love',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        likes: 45,
        comments: 12,
        shares: 3,
        views: 156,
        isAnonymous: true,
        authorId: 'user123',
        authorName: 'Anonymous User',
        authorEmail: 'anonymous@example.com'
      },
      {
        id: '2',
        content: 'The mess food is getting worse day by day. Today\'s lunch was literally inedible. Someone please do something about this!',
        category: 'complaint',
        createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        likes: 89,
        comments: 23,
        shares: 15,
        views: 342,
        isAnonymous: true,
        authorId: 'user456',
        authorName: 'Anonymous User',
        authorEmail: 'anonymous@example.com'
      },
      {
        id: '3',
        content: 'Just saw a professor trip over their own feet in the corridor. It was so awkward but also kind of funny. Hope they\'re okay though!',
        category: 'funny',
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
        expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        likes: 67,
        comments: 8,
        shares: 5,
        views: 234,
        isAnonymous: true,
        authorId: 'user789',
        authorName: 'Anonymous User',
        authorEmail: 'anonymous@example.com'
      }
    ];
    setConfessions(sampleConfessions);
  }, []);

  const handleSubmitConfession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConfession.trim()) return;

    setIsSubmitting(true);
    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 2000));

      const confession: Confession = {
        id: Date.now().toString(),
        content: newConfession,
        category: selectedCategory,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
        likes: 0,
        comments: 0,
        shares: 0,
        views: 0,
        isAnonymous: true,
        authorId: 'current-user',
        authorName: 'Anonymous User',
        authorEmail: 'anonymous@example.com'
      };

      setConfessions(prev => [confession, ...prev]);
      setNewConfession('');
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to submit confession:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = (confessionId: string) => {
    setConfessions(prev => prev.map(confession => 
      confession.id === confessionId 
        ? { ...confession, likes: confession.likes + 1 }
        : confession
    ));
  };

  const handleShare = (confessionId: string) => {
    setConfessions(prev => prev.map(confession => 
      confession.id === confessionId 
        ? { ...confession, shares: confession.shares + 1 }
        : confession
    ));
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getTimeRemaining = (expiresAt: Date) => {
    const now = new Date();
    const diffInHours = (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 0) return 'Expired';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h left`;
    return `${Math.floor(diffInHours / 24)}d left`;
  };

  const filteredConfessions = confessions.filter(confession => {
    if (selectedFilter === 'all') return true;
    return confession.category === selectedFilter;
  });

  function getCategoryColor(category: string) {
    switch (category) {
      case 'love': return 'bg-pink-100 text-pink-700';
      case 'gossip': return 'bg-yellow-100 text-yellow-700';
      case 'thoughts': return 'bg-blue-100 text-blue-700';
      case 'complaint': return 'bg-red-100 text-red-700';
      case 'funny': return 'bg-green-100 text-green-700';
      case 'sad': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  return (
    <>
      {/* Confession Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-56 right-4 z-40 bg-gradient-to-r from-pink-500 to-red-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        title="Confessions"
      >
        <FaUserSecret className="text-xl" />
      </button>

      {/* Confession Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-red-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaUserSecret className="text-2xl text-pink-600" />
                  <h2 className="text-2xl font-bold text-gray-800">Anonymous Confessions</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  <FaTimes />
                </button>
              </div>
              <p className="text-gray-600 mt-2">
                Share your thoughts anonymously. Confessions are visible for 5 days only.
              </p>
            </div>

            {/* Content */}
            <div className="flex flex-col h-full">
              {/* Filters */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedFilter(category.id)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                        selectedFilter === category.id
                          ? 'bg-pink-500 text-white'
                          : category.color
                      }`}
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Confessions List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {filteredConfessions.length === 0 ? (
                  <div className="text-center py-12">
                    <FaUserSecret className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No confessions found</p>
                  </div>
                ) : (
                  filteredConfessions.map((confession) => (
                    <div
                      key={confession.id}
                      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow"
                    >
                      {/* Confession Header */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center">
                            <FaUserSecret className="text-white text-sm" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Anonymous</p>
                            <p className="text-xs text-gray-500">{formatTimeAgo(confession.createdAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(confession.category)}`}>
                            {categories.find(cat => cat.id === confession.category)?.name}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center space-x-1">
                            <FaClock />
                            <span>{getTimeRemaining(confession.expiresAt)}</span>
                          </span>
                        </div>
                      </div>

                      {/* Confession Content */}
                      <p className="text-gray-800 mb-4 leading-relaxed">{confession.content}</p>

                      {/* Admin Info (Only visible to admin) */}
                      {isAdmin && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                          <h4 className="font-semibold text-yellow-800 mb-2">Admin Info:</h4>
                          <div className="text-sm text-yellow-700 space-y-1">
                            <p><strong>Author ID:</strong> {confession.authorId}</p>
                            <p><strong>Name:</strong> {confession.authorName}</p>
                            <p><strong>Email:</strong> {confession.authorEmail}</p>
                          </div>
                        </div>
                      )}

                      {/* Confession Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleLike(confession.id)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                          >
                            <FaHeart />
                            <span>{confession.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                            <FaComment />
                            <span>{confession.comments}</span>
                          </button>
                          <button
                            onClick={() => handleShare(confession.id)}
                            className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-colors"
                          >
                            <FaShare />
                            <span>{confession.shares}</span>
                          </button>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-400 text-sm">
                          <FaEye />
                          <span>{confession.views}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* New Confession Form */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <form onSubmit={handleSubmitConfession} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Confession (Anonymous)
                    </label>
                    <textarea
                      value={newConfession}
                      onChange={(e) => setNewConfession(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                      placeholder="Share your thoughts, feelings, or experiences anonymously..."
                      maxLength={500}
                      required
                    />
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">
                        {newConfession.length}/500 characters
                      </span>
                      <span className="text-xs text-gray-500">
                        Visible for 5 days
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      {categories.map(category => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setSelectedCategory(category.id as Confession['category'])}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center space-x-2 ${
                            selectedCategory === category.id
                              ? 'bg-pink-500 text-white'
                              : category.color
                          }`}
                        >
                          {category.icon}
                          <span>{category.name}</span>
                        </button>
                      ))}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || !newConfession.trim()}
                      className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Posting...' : 'Post Confession'}
                    </button>
                  </div>
                </form>

                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Privacy Notice:</strong> Your identity is completely anonymous. Only admins can see your details for moderation purposes. Confessions are automatically deleted after 5 days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
