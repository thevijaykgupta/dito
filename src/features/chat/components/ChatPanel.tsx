'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { FaArrowLeft, FaSearch, FaEllipsisH } from 'react-icons/fa';
import Link from 'next/link';

interface Conversation {
  id: string;
  userName: string;
  userLocation: string;
  userImage: string;
  lastMessage: string;
  timestamp: string;
  productImage: string;
  productName: string;
  productPrice: string;
  type: 'buying' | 'selling';
  unreadBadge?: number;
  isOnline: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    userName: 'Rahul Verma',
    userLocation: 'Hostel D',
    userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    lastMessage: 'Is it available? Can we meet tomorrow?',
    timestamp: '10:45 PM',
    productImage: 'https://via.placeholder.com/80?text=Boat',
    productName: 'Boat Airdropes 141',
    productPrice: '₹799',
    type: 'buying',
    unreadBadge: 2,
    isOnline: true,
  },
  {
    id: '2',
    userName: 'Sneha Kapoor',
    userLocation: 'Hostel A',
    userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    lastMessage: 'Thanks! I\'ll take it. When can I pick it up?',
    timestamp: 'Yesterday',
    productImage: 'https://via.placeholder.com/80?text=Book',
    productName: 'Calculus Textbook',
    productPrice: '₹350',
    type: 'buying',
    isOnline: true,
  },
  {
    id: '3',
    userName: 'Aman Singh',
    userLocation: 'Hostel C',
    userImage: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aman',
    lastMessage: 'Can you share more photos?',
    timestamp: 'Tue',
    productImage: 'https://via.placeholder.com/80?text=Cycle',
    productName: 'Hero Sprint Cycle',
    productPrice: '₹2,500',
    type: 'selling',
    isOnline: true,
  },
];

export default function ChatPanel() {
  const [filter, setFilter] = useState<'all' | 'buying' | 'selling'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = mockConversations.filter((conv) => {
    const matchesFilter = filter === 'all' || conv.type === filter;
    const matchesSearch = conv.userName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    
     <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-yellow-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-amber-400/20 bg-slate-900/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-yellow-400 hover:border-yellow-300">
              <FaArrowLeft className="text-2xl" />
            </Link>
            <h1 className="text-2xl font-bold text-white">Inbox</h1>
          </div>
          <button className="text-yellow-400 hover:border-yellow-300">
            <FaSearch className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-4xl mx-auto px-4 mt-6 mb-6">
        <div className="flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              filter === 'all'
                ? 'bg-yellow-400 text-slate-900'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-slate-500 hover: border-yellow-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('buying')}
            className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${
              filter === 'buying'
                ? 'bg-yellow-400 text-slate-900'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-slate-500 hover: border-yellow-300'
            }`}
          >
            🛍️ Buying
          </button>
          <button
            onClick={() => setFilter('selling')}
            className={`px-6 py-2 rounded-full font-bold transition-all flex items-center gap-2 ${
              filter === 'selling'
                ? 'bg-yellow-400 text-slate-900'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-slate-500 hover: border-yellow-300'
            }`}
          >
            📦 Selling
          </button>
        </div>
      </div>

      {/* Recent Conversations Header */}
      <div className="max-w-4xl mx-auto px-4 mb-6 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-700">Recent Conversations</h2>
        <button className="text-gray-500 hover:text-yellow-400 hover:border-yellow-300 flex items-center gap-2 text-sm">
          Sort: Recent <FaEllipsisH className="text-xs" />
        </button>
      </div>

      {/* Conversations List */}
      <div className="max-w-4xl mx-auto px-4 space-y-4 pb-32">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No conversations yet</h3>
            <p className="text-gray-500 mb-2">Find something you like and start chatting 🚀</p>
            <p className="text-gray-500 text-sm mb-8">Only campus students. No strangers.</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/sell"
                className="bg-yellow-400 text-slate-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-300 hover:border-yellow-300 transition-all"
              >
                🛍️ Explore Marketplace →
              </Link>
            </div>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              className="bg-white rounded-2xl p-5 border border-gray-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border-l-4 border-l-yellow-400 "
            >
              <div className="flex gap-4">
                {/* User Avatar */}
                <div className="relative">
                  <img
                    src={conversation.userImage}
                    alt={conversation.userName}
                    className="w-16 h-16 rounded-full border-2 border-gray-300 object-cover"
                  />
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                  )}
                </div>

                {/* Message Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-gray-700">{conversation.userName}</h3>
                      <p className="text-xs text-gray-500">{conversation.userLocation}</p>
                    </div>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{conversation.lastMessage}</p>

                  {/* Product Info */}
                  <div className="flex items-center gap-3 bg-gray-50 border border-gray-300 shadow-sm rounded-lg p-2">
                    <img
                      src={conversation.productImage}
                      alt={conversation.productName}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-white-900 text-sm font-medium">{conversation.productName}</p>
                      <p className="text-yellow-400 font-bold text-sm">{conversation.productPrice}</p>
                    </div>
                    {conversation.unreadBadge && (
                      <div className="bg-yellow-400 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {conversation.unreadBadge}
                      </div>
                    )}
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        conversation.type === 'buying'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {conversation.type === 'buying' ? 'Buying' : 'Selling'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Action Buttons */}
      {filteredConversations.length === 0 && (
        <div className="fixed bottom-24 right-6 flex flex-col gap-3 md:flex md:flex-col md:gap-3">
          <button className="bg-slate-700 text-white px-4 py-3 rounded-lg hover:bg-slate-600 transition-all flex items-center gap-2 text-sm font-bold">
            🔒 Sell Item
          </button>
          <button className="bg-slate-700 text-white px-4 py-3 rounded-lg hover:bg-slate-600 transition-all flex items-center gap-2 text-sm font-bold">
            💎 Post Request
          </button>
        </div>
      )}

      {/* Floating Plus Button */}
      <Link
        href="/sell"
        className="fixed bottom-24 right-6 w-16 h-16 bg-yellow-400 text-slate-900 rounded-full flex items-center justify-center text-3xl hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl"
      >
        +
      </Link>
    </div>
  );
}
