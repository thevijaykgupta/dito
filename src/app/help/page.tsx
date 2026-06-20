'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft, FaQuestionCircle, FaPhone, FaEnvelope, FaWhatsapp, FaComments, FaSearch } from 'react-icons/fa';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'orders' | 'payment';
}

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'How do I place an order?',
      answer: 'Browse our categories, add items to your cart, and proceed to checkout. You can pay using various payment methods including UPI, cards, or cash.',
      category: 'orders'
    },
    {
      id: 2,
      question: 'What payment methods do you accept?',
      answer: 'We accept UPI, credit/debit cards, net banking, and cash. All online payments are secure and encrypted.',
      category: 'payment'
    },
    {
      id: 4,
      question: 'Can I cancel my order?',
      answer: 'You can cancel your order within 30 minutes of placing it. After that, please contact our support team for assistance.',
      category: 'orders'
    },
    {
      id: 5,
      question: 'What if I receive a damaged item?',
      answer: 'If you receive a damaged item, please take a photo and contact us immediately. We will arrange a replacement or refund.',
      category: 'orders'
    },
    {
      id: 6,
      question: 'How do I track my order?',
      answer: 'You can track your order in real-time through the "My Orders" section. You will also receive SMS updates on your order status.',
      category: 'orders'
    },
    {
      id: 7,
      question: 'Is there a minimum order amount?',
      answer: 'No, there is no minimum order amount.',
      category: 'general'
    },
    {
      id: 8,
      question: 'Can I return items?',
      answer: 'Yes, you can return items within 24 hours if they are unused and in original packaging.',
      category: 'orders'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link 
            href="/"
            className="p-2 text-gray-600 hover:text-yellow-600 transition-colors"
          >
            <FaArrowLeft className="text-xl" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Help & Support</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Contact */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Need Immediate Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="tel:+919876543210"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors"
            >
              <FaPhone className="text-yellow-600 text-xl" />
              <div>
                <p className="font-medium text-gray-800">Call Us</p>
                <p className="text-sm text-gray-500">+91 98765 43210</p>
              </div>
            </a>
            <a 
              href="mailto:support@Tuffly.com"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors"
            >
              <FaEnvelope className="text-yellow-600 text-xl" />
              <div>
                <p className="font-medium text-gray-800">Email Us</p>
                <p className="text-sm text-gray-500">support@Tuffly.com</p>
              </div>
            </a>
            <a 
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors"
            >
              <FaWhatsapp className="text-green-600 text-xl" />
              <div>
                <p className="font-medium text-gray-800">WhatsApp</p>
                <p className="text-sm text-gray-500">Chat with us</p>
              </div>
            </a>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-yellow-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory('general')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'general'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-yellow-50'
              }`}
            >
              General
            </button>
            <button
              onClick={() => setSelectedCategory('orders')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'orders'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-yellow-50'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setSelectedCategory('payment')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === 'payment'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-yellow-50'
              }`}
            >
              Payment
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
          
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-8">
              <FaQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No questions found. Try adjusting your search.</p>
            </div>
          ) : (
      <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-800">{faq.question}</span>
                    <FaQuestionCircle className={`text-yellow-600 transition-transform ${expandedFAQ === faq.id ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFAQ === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Chat
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-4">Our support team is available 24/7 to help you with any questions or issues.</p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <FaComments />
            <span>Start Live Chat</span>
          </button>
        </div> */}

        {/* Quick Links */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/orders"
              className="p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors"
            >
              <h3 className="font-medium text-gray-800 mb-2">Track Your Order</h3>
              <p className="text-sm text-gray-500">Check the status of your current orders</p>
            </Link>
            <Link 
              href="/profile"
              className="p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors"
            >
              <h3 className="font-medium text-gray-800 mb-2">My Account</h3>
              <p className="text-sm text-gray-500">Manage your profile and preferences</p>
            </Link>
            <Link 
              href="/categories"
              className="p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors"
            >
              <h3 className="font-medium text-gray-800 mb-2">Browse Products</h3>
              <p className="text-sm text-gray-500">Explore our wide range of products</p>
            </Link>
            <Link 
              href="/cart"
              className="p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors"
            >
              <h3 className="font-medium text-gray-800 mb-2">Shopping Cart</h3>
              <p className="text-sm text-gray-500">View and manage your cart items</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
