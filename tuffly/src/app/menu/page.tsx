'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const snacks = [
  {
    id: 1,
    name: 'Kurkure',
    price: 20,
    description: 'Crunchy and spicy snack',
    category: 'Chips & Crisps',
    image: '/images/products/kurkure.jpg'
  },
  {
    id: 2,
    name: 'Oreo Biscuits',
    price: 30,
    description: 'Chocolate sandwich cookies',
    category: 'Biscuits',
    image: '/images/products/oreo.jpg'
  },
  {
    id: 3,
    name: 'Cup Noodles',
    price: 40,
    description: 'Instant noodles in a cup',
    category: 'Instant Food',
    image: '/images/products/cup-noodles.jpg'
  },
  {
    id: 4,
    name: 'Lay\'s Classic',
    price: 20,
    description: 'Classic salted potato chips',
    category: 'Chips & Crisps',
    image: '/images/products/lays.jpg'
  },
  {
    id: 5,
    name: 'Hide & Seek',
    price: 30,
    description: 'Chocolate cream biscuits',
    category: 'Biscuits',
    image: '/images/products/hide-seek.jpg'
  },
  {
    id: 6,
    name: 'Maggi',
    price: 14,
    description: '2-minute noodles',
    category: 'Instant Food',
    image: '/images/products/maggi.jpg'
  },
  {
    id: 7,
    name: 'Doritos',
    price: 20,
    description: 'Nacho cheese flavored chips',
    category: 'Chips & Crisps',
    image: '/images/products/doritos.jpg'
  },
  {
    id: 8,
    name: 'Good Day',
    price: 30,
    description: 'Butter cookies',
    category: 'Biscuits',
    image: '/images/products/good-day.jpg'
  },
  {
    id: 9,
    name: 'Yippee Noodles',
    price: 14,
    description: 'Masala flavored noodles',
    category: 'Instant Food',
    image: '/images/products/yippee.jpg'
  }
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(snacks.map(snack => snack.category)))];

  const filteredSnacks = selectedCategory === 'All'
    ? snacks
    : snacks.filter(snack => snack.category === selectedCategory);

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Our Menu
        </h1>
        <p className="text-gray-600">
          Browse through our selection of delicious snacks
        </p>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Snacks Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSnacks.map(snack => (
            <div
              key={snack.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={snack.image}
                  alt={snack.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{snack.name}</h3>
                  <span className="text-2xl font-bold text-indigo-600">
                    ₹{snack.price}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{snack.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{snack.category}</span>
                  <Link
                    href={`/menu?item=${snack.id}`}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Add to Cart
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
