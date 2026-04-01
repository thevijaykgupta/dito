'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaSearch, FaRocket, FaStar, FaUsers, FaShieldAlt, FaBook, FaLaptop, FaChair, FaBicycle, FaTshirt, FaHeart } from 'react-icons/fa';
import ProductShowcase from '@/components/ProductShowcase';
import { categories } from '@/data/categories';
import { useData } from '@/context/DataContext';
import { useEmotion } from '@/context/EmotionContext';

export default function Home() {
  const { getApprovedProducts, getStatistics } = useData();
  const { themeColors, currentEmotion, suggestions } = useEmotion();
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());

  const toggleWishlist = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const newWishlisted = new Set(wishlistedItems);
    if (newWishlisted.has(productId)) {
      newWishlisted.delete(productId);
    } else {
      newWishlisted.add(productId);
    }
    setWishlistedItems(newWishlisted);
  };

  const products = getApprovedProducts();
  const displayedCategories = categories.filter(
  (category) => category.slug !== 'others' && products.some((product) => product.category === category.slug)
  // const displayedCategories = categories.filter(category => {
  //   if (category.slug === 'others') return false;
  //   return products.some(product => product.category === category.slug);
  // }
);
 
 //dummy products for testing - remove when backend is ready
      const dummyProducts = [
      {
        id: '1',
        title: 'Engineering Mechanics Book',
        price: 150,
        description: 'Good condition, 2nd year book',
        images: ['/images/sample1.jpg'],
        category: 'books',
        seller: { name: 'Rahul' }
      },
      {
        id: '2',
        title: 'Cycle for Sale',
        price: 2000,
        description: 'Barely used',
        images: ['/images/sample2.jpg'],
        category: 'bikes',
        seller: { name: 'Aman' }
      }
    ];

  const filteredProducts = products.length === 0 
  ? dummyProducts 
  : (selectedCategoryFilter === 'all' 
      ? products 
      : products.filter(product => product.category === selectedCategoryFilter)
    );

  const statistics = getStatistics();

  const features = [
    {
      icon: FaShieldAlt,
      title: "Secure Payments",
      description: "Safe and encrypted payment processing"
    },
    {
      icon: FaUsers,
      title: "Campus Community",
      description: "Connect with fellow students safely"
    },
    {
      icon: FaStar,
      title: "Verified Sellers",
      description: "All sellers are verified campus students"
    }
  ];

    
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-white font-sans relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-100 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-100 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-green-100 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-yellow-100 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Hero Section */}
      <div className="relative text-gray-900 overflow-hidden bg-gradient-to-br from-yellow-50 via-blue-50 to-white">
        <div className="absolute inset-0 bg-white/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 text-center bg-gradient-to-r from-yellow-50 via-white to-yellow-50 rounded-3xl shadow-lg">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >

            {/* Main Title */}
            <motion.h1 
              className="text-6xl md:text-7xl tracking-tight font-display mb-4 flex flex-col items-center bg-gradient-to-r from-yellow-600 via-blue-600 to-yellow-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {/* Welcome to */}
                Buy, Sell & Rent
              </motion.span>
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-blue-600 to-yellow-600 shimmer-text drop-shadow-glow"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.08, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.6 }}
              >
                {/* Tuffly */}
                Within Your Campus — Instantly
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-700 font-cursive"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
            {/* //Your Campus Marketplace - Buy, Sell, and Rent Everything               */}
            Join 500+ students. Sell items in under 24 hours.
            </motion.p>

              <p className="text-sm text-gray-500 mt-2">
                🔒 Only verified students • No spam • Safe campus transactions
              </p>

            {/* Search Bar */}
            <motion.div 
              className="mt-8 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for items, books, electronics..."
                  className="w-full pl-6 pr-12 py-4 text-lg text-gray-700 bg-white/95 backdrop-blur-md rounded-full shadow-glass focus:outline-none focus:ring-4 focus:ring-yellow-200 transition-all duration-300 border-2 border-yellow-200"
                  style={{
                    boxShadow: '0 8px 32px rgba(0,0,0,0.07)',
                  }}
                />
                <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-2xl text-blue-400" />
              </div>
            </motion.div>

                  <p className="mt-4 text-gray-600 text-sm">
                👇 What do you want to do today?
              </p>

            <div className="mt-6 flex justify-center gap-4 flex-wrap">
              <button className="px-8 py-4 text-lg font-bold rounded-full bg-yellow-400 hover:bg-yellow-500 text-black shadow-xl hover:scale-105 active:scale-95 transition-all duration-300">
                Start Exploring
              </button>

              <button className="px-8 py-4 text-lg font-semibold rounded-full border border-gray-400 text-gray-800 hover:bg-gray-200 transition-all duration-300">
                Post an Item
              </button>
            </div>


            <div className="flex justify-center gap-6 mt-4 text-sm text-gray-600 flex-wrap">
              <span>🔥 120+ items added today</span>
              <span>👥 500+ students</span>
              <span>⚡ Avg sale: 24 hrs</span>
              <span className="text-green-600">🟢 12 people browsing now</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Browse Categories Section */}
      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900">Browse Categories</h2>
              <p className="text-gray-600 mt-2">
                Choose what you’re looking for 👇
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <button onClick={() => setShowAllCategories(!showAllCategories)} className="bg-yellow-400 text-slate-900 font-bold px-6 py-2 rounded-full hover:bg-yellow-300 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95">
                {showAllCategories ? 'Show Less' : '🔥 Explore All'} <span>→</span>
              </button>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {[
              { name: 'TeamUp', icon: FaUsers, itemCount: '500+ members', bgGradient: 'from-green-600 to-green-700', iconColor: 'text-green-300', hoverGradient: 'from-green-500 to-green-600', accentColor: 'from-green-400/20 to-green-500/20' },
              { name: 'Get Guidance', icon: FaShieldAlt, itemCount: '300+ guides', bgGradient: 'from-red-600 to-red-700', iconColor: 'text-red-300', hoverGradient: 'from-red-500 to-red-600', accentColor: 'from-red-400/20 to-red-500/20' },
              { name: 'Books & Notes', icon: FaBook, itemCount: '1,240+ items', bgGradient: 'from-blue-600 to-blue-700', iconColor: 'text-blue-300', hoverGradient: 'from-blue-500 to-blue-600', accentColor: 'from-blue-400/20 to-blue-500/20' },
              { name: 'Electronics', icon: FaLaptop, itemCount: '870+ items', bgGradient: 'from-purple-600 to-purple-700', iconColor: 'text-purple-300', hoverGradient: 'from-purple-500 to-purple-600', accentColor: 'from-purple-400/20 to-purple-500/20' },
              { name: 'Furniture', icon: FaChair, itemCount: '450+ items', bgGradient: 'from-pink-600 to-pink-700', iconColor: 'text-pink-300', hoverGradient: 'from-pink-500 to-pink-600', accentColor: 'from-pink-400/20 to-pink-500/20' },
              { name: 'Bikes', icon: FaBicycle, itemCount: '360+ items', bgGradient: 'from-orange-600 to-orange-700', iconColor: 'text-orange-300', hoverGradient: 'from-orange-500 to-orange-600', accentColor: 'from-orange-400/20 to-orange-500/20' },
              { name: 'Fashion', icon: FaTshirt, itemCount: '2,100+ items', bgGradient: 'from-cyan-600 to-cyan-700', iconColor: 'text-cyan-300', hoverGradient: 'from-cyan-500 to-cyan-600', accentColor: 'from-cyan-400/20 to-cyan-500/20' },
              ...(showAllCategories ? [
                { name: 'Sports', icon: FaBicycle, itemCount: '890+ items', bgGradient: 'from-red-600 to-red-700', iconColor: 'text-red-300', hoverGradient: 'from-red-500 to-red-600', accentColor: 'from-red-400/20 to-red-500/20' },
                { name: 'Accessories', icon: FaStar, itemCount: '1,560+ items', bgGradient: 'from-indigo-600 to-indigo-700', iconColor: 'text-indigo-300', hoverGradient: 'from-indigo-500 to-indigo-600', accentColor: 'from-indigo-400/20 to-indigo-500/20' },
                { name: 'Home Essentials', icon: FaChair, itemCount: '2,340+ items', bgGradient: 'from-emerald-600 to-emerald-700', iconColor: 'text-emerald-300', hoverGradient: 'from-emerald-500 to-emerald-600', accentColor: 'from-emerald-400/20 to-emerald-500/20' },
                { name: 'Collectibles', icon: FaStar, itemCount: '560+ items', bgGradient: 'from-amber-600 to-amber-700', iconColor: 'text-amber-300', hoverGradient: 'from-amber-500 to-amber-600', accentColor: 'from-amber-400/20 to-amber-500/20' },
                { name: 'Others', icon: FaRocket, itemCount: '1,000+ items', bgGradient: 'from-gray-600 to-gray-700', iconColor: 'text-gray-300', hoverGradient: 'from-gray-500 to-gray-600', accentColor: 'from-gray-400/20 to-gray-500/20' }
              ] : []),
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/categories?cat=${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                
                
                    {/*  <div className={`relative h-48 md:h-56 bg-gradient-to-br ${category.bgGradient} rounded-3xl shadow-2xl overflow-hidden group-hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group-hover:${category.hoverGradient} group-hover:-translate-y-2 border border-yellow-400/30 group-hover:border-yellow-400/80`}> */}
                    <div
                      className={`relative h-48 md:h-56 bg-gradient-to-br ${category.bgGradient}
                      rounded-3xl shadow-2xl overflow-hidden flex flex-col items-center justify-center
                      cursor-pointer transition-all duration-300
                      group-hover:-translate-y-3 hover:scale-105
                      border border-yellow-400/30 group-hover:border-yellow-400/80
                      ${category.name === 'TeamUp' || category.name === 'Get Guidance'
                        ? 'scale-105 ring-2 ring-yellow-400'
                        : ''}`}
                    >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/20 rounded-3xl" />
                    
                    {/* Animated gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.accentColor} group-hover:from-yellow-400/30 group-hover:to-yellow-500/30 transition-all duration-300 rounded-3xl`} />
                    
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" style={{
                      boxShadow: 'inset 0 0 30px rgba(250, 204, 21, 0.2)'
                    }} />
                    
                    {/* Icon container with premium styling */}
                    <div className="relative z-10 mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl group-hover:shadow-2xl">
                        <div className={`text-5xl md:text-6xl ${category.iconColor} group-hover:text-yellow-300 transition-colors duration-300 drop-shadow-lg`}>
                          <category.icon />
                        </div>
                      </div>
                    </div>
                    
                    {/* Category Name */}
                    <h3 className="text-white font-bold text-center text-sm md:text-base group-hover:text-yellow-300 transition-colors duration-300 relative z-10 px-2 drop-shadow-lg">
                      {category.name}
                    </h3>
                    
                    {/* Item Count */}
                    <p className="text-gray-200 text-xs md:text-sm mt-2 group-hover:text-yellow-200 transition-colors duration-300 relative z-10 drop-shadow-lg">
                      {category.itemCount}
                    </p>
                    <p className="text-yellow-300 text-xs mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      Explore →
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

            <div className="max-w-4xl mx-auto mt-10 text-center text-sm text-gray-600">
            🔥 Rahul just sold a cycle • Ananya found a teammate • 5 new items added today
          </div>

      {/* All Items Section with Category Filtering */}
      <section className="py-16 bg-gradient-to-b from-white/5 via-white/10 to-white/5 backdrop-blur-sm border-y-2 border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12 relative"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              🔥 Trending in Your Campus
            </h2>
            <p className="text-gray-700 text-lg">Explore everything in our community marketplace</p>
            <div className="absolute inset-0 top-0 h-24 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-3xl blur-2xl" />
          </motion.div>

          <div className="mt-4 flex justify-center gap-4">
            <button className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
              🔥 Explore All Deals
            </button>

            <button className="border border-gray-300 px-5 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
              Post Item
            </button>
          </div>

          {/* Category Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12 p-6 rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-md border-2 border-white/30 shadow-xl"
          >
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 backdrop-blur-lg border-2 shadow-lg ${
                selectedCategoryFilter === 'all'
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 border-yellow-400 shadow-yellow-400/50 scale-105'
                  : 'bg-white/20 text-gray-900 border-white/40 hover:border-yellow-300/80 hover:bg-white/30'
              }`}
            >
              All Items
            </button>
            {displayedCategories.map((category) => (
              <button
                key={category.slug}
                onClick={() => setSelectedCategoryFilter(category.slug)}
                className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 backdrop-blur-lg border-2 shadow-lg ${
                  selectedCategoryFilter === category.slug
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 border-yellow-400 shadow-yellow-400/50 scale-105'
                    : 'bg-white/20 text-gray-900 border-white/40 hover:border-yellow-300/80 hover:bg-white/30'
                }`}
              >
                {category.name}
              </button>
            ))}
          </motion.div>

          {/* Products Grid with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-white/30 via-white/10 to-white/5 backdrop-blur-xl border-2 border-white/40 hover:border-yellow-300/80 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-yellow-400/20 group-hover:-translate-y-3 hover:from-white/40 hover:via-white/20 hover:to-white/10">
                      {/* Premium glass background effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-white/5 pointer-events-none rounded-2xl" />
                      
                      {/* Premium Hover glow with yellow shine */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" style={{
                        boxShadow: 'inset 0 0 30px rgba(250, 204, 21, 0.25)'
                      }} />
                      
                      {/* Product Image */}
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        {product.images && product.images[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FaBook className="text-4xl text-yellow-300/30" />
                          </div>
                        )}
                        
                        {/* Price Badge with enhanced styling */}
                        <div className="absolute bottom-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-slate-900 px-4 py-2 rounded-xl font-bold shadow-xl backdrop-blur-sm border border-yellow-200 group-hover:scale-110 transition-transform duration-300">
                          ₹{product.price}
                        </div>
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm border border-blue-400">
                          {categories.find(c => c.slug === product.category)?.name || 'Other'}
                        </div>
                        
                        {/* Wishlist Heart Button */}
                        <button
                          onClick={(e) => toggleWishlist(e, product.id)}
                          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/40 backdrop-blur-md border-2 border-white/60 flex items-center justify-center hover:bg-red-500/80 hover:border-red-400 transition-all duration-300 shadow-lg group-hover:scale-110 z-10"
                        >
                          <FaHeart
                            className={`text-lg transition-all duration-300 ${
                              wishlistedItems.has(product.id)
                                ? 'text-red-500 fill-red-500'
                                : 'text-white/60 hover:text-red-400'
                            }`}
                          />
                        </button>
                      </div>
                      
                      {/* Product Info */}
                      <div className="relative z-10 p-4 bg-gradient-to-b from-white/10 to-white/5">
                        <h3 className="font-bold text-gray-900 text-sm group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2 drop-shadow-md">
                          {product.title}
                        </h3>
                        
                        <p className="text-gray-700 text-xs mt-2 line-clamp-2 drop-shadow-sm">
                          {product.description}
                        </p>
                        
                        {/* User Info */}
                        <div className="mt-3 pt-3 border-t border-white/20 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-400 flex items-center justify-center text-slate-900 text-xs font-bold shadow-lg">
                            {product.seller?.name?.charAt(0).toUpperCase() || 'S'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-800 text-xs font-medium truncate drop-shadow-sm">
                              {product.seller?.name || 'Seller'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="col-span-full text-center py-16"
              >
                <p className="text-gray-700 text-lg font-semibold mb-4">🚀 Be the first to post in this category!</p>
                <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all duration-300">
                  Post an Item
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Platform Statistics</h2>
            <p className="text-gray-700">Real-time data from our campus community</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Card 1 */}
            <motion.div 
              className="aspect-square bg-blue-50 rounded-2xl p-6 shadow-2xl border border-blue-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-yellow-100/20 pointer-events-none rounded-2xl" />
              <div className="flex flex-col items-center justify-center gap-3 relative z-10 text-center">
                <div className="w-14 h-14 bg-blue-200 rounded-xl flex items-center justify-center shadow-md">
                  <FaUsers className="text-blue-700" size={24} />
                </div>
                <p className="text-gray-900 text-sm font-medium">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.totalUsers}</p>
                <p className="text-green-600 text-xs font-medium">+{Math.floor(Math.random() * 15) + 5}% this month</p>
              </div>
            </motion.div>
            {/* Card 2 */}
            <motion.div 
              className="aspect-square bg-blue-50 rounded-2xl p-6 shadow-2xl border border-blue-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/40 to-blue-100/20 pointer-events-none rounded-2xl" />
              <div className="flex flex-col items-center justify-center gap-3 relative z-10 text-center">
                <div className="w-14 h-14 bg-yellow-200 rounded-xl flex items-center justify-center shadow-md">
                  <FaRocket className="text-yellow-700" size={24} />
                </div>
                <p className="text-gray-900 text-sm font-medium">Active Listings</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.totalProducts}</p>
                <p className="text-blue-600 text-xs font-medium">+{Math.floor(Math.random() * 10) + 1} new today</p>
              </div>
            </motion.div>
            {/* Card 3 */}
            <motion.div 
              className="aspect-square bg-blue-50 rounded-2xl p-6 shadow-2xl border border-blue-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-100/40 to-blue-100/20 pointer-events-none rounded-2xl" />
              <div className="flex flex-col items-center justify-center gap-3 relative z-10 text-center">
                <div className="w-14 h-14 bg-green-200 rounded-xl flex items-center justify-center shadow-md">
                  <FaStar className="text-green-700" size={24} />
                </div>
                <p className="text-gray-900 text-sm font-medium">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">₹{statistics.totalSales.toLocaleString()}</p>
                <p className="text-green-600 text-xs font-medium">+{Math.floor(Math.random() * 12) + 3}% this week</p>
              </div>
            </motion.div>
            {/* Card 4 */}
            <motion.div 
              className="aspect-square bg-blue-50 rounded-2xl p-6 shadow-2xl border border-blue-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-100/40 to-blue-100/20 pointer-events-none rounded-2xl" />
              <div className="flex flex-col items-center justify-center gap-3 relative z-10 text-center">
                <div className="w-14 h-14 bg-purple-200 rounded-xl flex items-center justify-center shadow-md">
                  <FaShieldAlt className="text-purple-700" size={24} />
                </div>
                <p className="text-gray-900 text-sm font-medium">New Listings</p>
                <p className="text-2xl font-bold text-gray-900">{statistics.newListingsThisWeek}</p>
                <p className="text-purple-600 text-xs font-medium">This week</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

            <section className="py-16 bg-gradient-to-br from-yellow-50 to-white">
  <div className="max-w-6xl mx-auto px-4 text-center">
    
    <h2 className="text-3xl font-bold mb-8">
      💬 What Students Are Saying
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
      
      {/* Card 1 */}
      <div className="p-6 rounded-2xl bg-white shadow-xl border hover:scale-105 hover:shadow-2xl transition-all duration-300">
        <p className="text-gray-700 italic">
          “Sold my cycle within 2 hours. Super smooth experience!”
        </p>
        <h4 className="mt-4 font-bold text-gray-900">Rahul, Hostel B</h4>
      </div>

      {/* Card 2 */}
      <div className="p-6 rounded-2xl bg-white shadow-xl border hover:scale-105 hover:shadow-2xl transition-all duration-300">
        <p className="text-gray-700 italic">
          “Found my project teammate here. Game changer!”
        </p>
        <h4 className="mt-4 font-bold text-gray-900">Ananya, CSE</h4>
      </div>

      {/* Card 3 */}
      <div className="p-6 rounded-2xl bg-white shadow-xl border hover:scale-105 hover:shadow-2xl transition-all duration-300">
        <p className="text-gray-700 italic">
          “Way better than WhatsApp groups honestly.”
        </p>
        <h4 className="mt-4 font-bold text-gray-900">Amit, ECE</h4>
      </div>

    </div>
  </div>
</section>

      <section className="py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Tuffly?</h2>
            <p className="text-gray-700 text-lg">The ultimate campus marketplace experience</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-blue-50 shadow-2xl border border-blue-200 text-center group hover:scale-105 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-yellow-100/20 pointer-events-none rounded-2xl" />
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 bg-blue-200 shadow-md"
                >
                  <feature.icon className="text-blue-700 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Categories & Products */}
      <main className="py-12 bg-gradient-to-br from-oc-blue-6/80 via-oc-yellow-5/80 to-oc-cyan-5/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {displayedCategories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductShowcase category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      {/* 🔥 Sticky Sell Button */}
      <Link href="/sell">
      <button
        className="fixed bottom-20 right-4 md:right-6 z-50 bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-3 md:px-6 md:py-4 rounded-full shadow-2xl font-bold flex items-center gap-2 hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse"
        style={{
          boxShadow: '0 10px 30px rgba(250, 204, 21, 0.5)'
        }}
      >
        <span className="text-xl">＋</span>
        Sell Item
      </button>
    </Link>
    </div>
  );
} 