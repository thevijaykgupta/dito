'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaFilter, FaClock, FaMapMarkerAlt, FaUser, FaStar, FaHeart, FaCalendar, FaMoneyBillWave } from 'react-icons/fa';

// Mock rental items data
const rentalItems = [
  {
    id: 1,
    title: 'MacBook Pro 2023',
    description: 'Perfect for coding and design work. High performance laptop.',
    category: 'Electronics',
    dailyRate: 500,
    weeklyRate: 2500,
    monthlyRate: 8000,
    owner: 'Alex Kumar',
    location: 'Hostel A, Block 3',
    images: ['/images/products/notebook.jpg'],
    available: true,
    deposit: 5000,
    tags: ['laptop', 'coding', 'design', 'student-friendly']
  },
  {
    id: 2,
    title: 'Gaming Console (PS5)',
    description: 'Latest PlayStation 5 with 2 controllers and popular games.',
    category: 'Gaming',
    dailyRate: 300,
    weeklyRate: 1500,
    monthlyRate: 5000,
    owner: 'Rahul Singh',
    location: 'Hostel B, Block 1',
    images: ['/images/products/gaming-console.jpg'],
    available: true,
    deposit: 3000,
    tags: ['gaming', 'entertainment', 'ps5', 'multiplayer']
  },
  {
    id: 3,
    title: 'Mountain Bike',
    description: 'Perfect for campus commuting and weekend adventures.',
    category: 'Transport',
    dailyRate: 100,
    weeklyRate: 500,
    monthlyRate: 1500,
    owner: 'Priya Sharma',
    location: 'Hostel C, Block 2',
    images: ['/images/products/mountain-bike.jpg'],
    available: true,
    deposit: 2000,
    tags: ['bike', 'transport', 'exercise', 'campus']
  },
  {
    id: 4,
    title: 'Scientific Calculator',
    description: 'Advanced calculator for engineering and science students.',
    category: 'Electronics',
    dailyRate: 50,
    weeklyRate: 250,
    monthlyRate: 800,
    owner: 'Vikram Patel',
    location: 'Hostel A, Block 4',
    images: ['/images/products/calculator.jpg'],
    available: true,
    deposit: 500,
    tags: ['calculator', 'engineering', 'science', 'exams']
  },
  {
    id: 5,
    title: 'Lab Equipment Set',
    description: 'Complete lab equipment for chemistry and physics experiments.',
    category: 'Lab Equipment',
    dailyRate: 200,
    weeklyRate: 1000,
    monthlyRate: 3000,
    owner: 'Anjali Desai',
    location: 'Hostel B, Block 3',
    images: ['/images/products/lab-equipment.jpg'],
    available: true,
    deposit: 1500,
    tags: ['lab', 'chemistry', 'physics', 'experiments']
  },
  {
    id: 6,
    title: 'Guitar (Acoustic)',
    description: 'Beautiful acoustic guitar for music lovers and beginners.',
    category: 'Musical Instruments',
    dailyRate: 150,
    weeklyRate: 750,
    monthlyRate: 2500,
    owner: 'Karan Malhotra',
    location: 'Hostel C, Block 1',
    images: ['/images/products/guitar.jpg'],
    available: true,
    deposit: 1000,
    tags: ['guitar', 'music', 'acoustic', 'beginner-friendly']
  }
];

const categories = ['All', 'Electronics', 'Gaming', 'Transport', 'Lab Equipment', 'Musical Instruments', 'Sports', 'Books', 'Furniture'];

export default function RentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [duration, setDuration] = useState('daily');
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = rentalItems
    .filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .filter(item => selectedCategory === 'All' || item.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return (a as any)[`${duration}Rate`] - (b as any)[`${duration}Rate`];
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const getRate = (item: any) => {
    return item[`${duration}Rate`];
  };

  const getDurationLabel = () => {
    switch (duration) {
      case 'daily': return 'day';
      case 'weekly': return 'week';
      case 'monthly': return 'month';
      default: return 'day';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Rent Items
          </h1>
          <p className="text-gray-600 text-lg">
            Rent items from fellow students - save money and reduce waste
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-yellow-200 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search for items to rent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 pl-12 bg-white/90 backdrop-blur-sm border-2 border-yellow-200 rounded-2xl shadow-lg focus:ring-4 focus:ring-yellow-300 focus:border-transparent transition-all text-lg"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-yellow-600 text-xl" />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Duration Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">Duration:</span>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="rating">Rating</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredItems.length} items available for rent
          </p>
        </div>

        {/* Rental Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-yellow-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              {/* Item Image */}
              <div className="relative h-48 rounded-t-2xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                  <span className="text-4xl">📦</span>
                </div>
                {!item.available && (
                  <div className="absolute inset-0 bg-red-500/80 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">Not Available</span>
                  </div>
                )}
                <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                  <FaHeart className="text-red-500" />
                </button>
              </div>

              {/* Item Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>

                {/* Owner and Location */}
                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <FaUser />
                    <span>{item.owner}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaMapMarkerAlt />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-green-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <FaMoneyBillWave className="text-green-600" />
                        <span className="text-2xl font-bold text-green-600">₹{getRate(item)}</span>
                      </div>
                      <span className="text-sm text-gray-600">per {getDurationLabel()}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Deposit</div>
                      <div className="font-semibold text-gray-800">₹{item.deposit}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                    Rent Now
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                    <FaCalendar />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Want to Rent Out Your Items?</h2>
            <p className="text-xl mb-6">Earn money by renting your unused items to fellow students</p>
            <Link
              href="/sell"
              className="inline-block bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Renting Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
