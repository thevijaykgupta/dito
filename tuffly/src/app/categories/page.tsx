'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { categories as allCategories } from '../../data/categories';
import { useData } from '../../context/DataContext';
import { FaSearch, FaFilter, FaShoppingCart, FaHeart, FaArrowLeft, FaEye, FaShare, FaStar, FaCheck, FaTimes, FaTrash, FaDownload, FaQrcode } from 'react-icons/fa';
import Image from 'next/image';
import type { Product } from '../types';

export default function CategoriesPage() {
  const router = useRouter();
  const { getApprovedProducts } = useData();
  const contextProducts = getApprovedProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  // Convert context products to the format expected by this component
  const allProducts: Product[] = contextProducts.map(product => ({
    ...product,
  }));

  // Handle back navigation
  const handleBackNavigation = () => {
    // Check if we're in a specific category view
    if (selectedCategory !== 'all') {
      setSelectedCategory('all');
      setSearchQuery('');
      setPriceRange([0, 5000]);
      setSortBy('name');
      setShowFilters(false);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Go back to previous page or home
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push('/');
      }
    }
  };

  // Handle category selection with proper navigation
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Scroll to products section
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle logo click to go home
  const handleLogoClick = () => {
    router.push('/');
  };

  useEffect(() => {
    let filtered = allProducts;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, priceRange, sortBy, allProducts]);

  const addToCart = (product: Product) => {
    // Here you would typically add to cart context
    alert(`${product.title} added to cart!`);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleCompare = (productId: string) => {
    setCompareList(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else if (prev.length < 3) {
        return [...prev, productId];
      } else {
        alert('You can compare up to 3 products at a time');
        return prev;
      }
    });
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const bulkAddToCart = () => {
    if (selectedProducts.length === 0) {
      alert('Please select products first');
      return;
    }
    alert(`${selectedProducts.length} products added to cart!`);
    setSelectedProducts([]);
  };

  const bulkAddToWishlist = () => {
    if (selectedProducts.length === 0) {
      alert('Please select products first');
      return;
    }
    setWishlist(prev => Array.from(new Set([...prev, ...selectedProducts])));
    alert(`${selectedProducts.length} products added to wishlist!`);
    setSelectedProducts([]);
  };

  const shareProduct = (product: Product) => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out ${product.title} on Tuffly!`,
        url: `https://Tuffly.com/product/${product.id}`
      });
    } else {
      navigator.clipboard.writeText(`https://Tuffly.com/product/${product.id}`);
      alert('Product link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackNavigation}
              className="p-2 text-gray-600 hover:text-yellow-600 transition-colors hover:bg-yellow-50 rounded-lg nav-button-hover"
              title={selectedCategory !== 'all' ? 'Clear filters' : 'Go back'}
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleLogoClick}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity nav-button-hover"
              >
                <img
                  src="/images/products/logo_whitee.png"
                  alt="Tuffly Logo"
                  className="w-12 h-12 rounded-xl shadow-lg border-2 border-yellow-200"
                />
                <h1 className="text-3xl font-bold text-gray-800">
                  {selectedCategory !== 'all' ? `${selectedCategory} Products` : 'Categories'}
                </h1>
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowQRModal(true)}
              className="p-2 text-gray-600 hover:text-yellow-600 transition-colors hover:bg-yellow-50 rounded-lg nav-button-hover"
              title="QR Code"
            >
              <FaQrcode className="text-xl" />
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 text-gray-600 hover:text-yellow-600 transition-colors hover:bg-yellow-50 rounded-lg nav-button-hover"
              title="Filters"
            >
              <FaFilter className="text-xl" />
            </button>
            <Link 
              href="/cart"
              className="relative p-2 text-gray-600 hover:text-yellow-600 transition-colors hover:bg-yellow-50 rounded-lg nav-button-hover"
              title="Shopping Cart"
            >
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="mb-6 bg-yellow-100 border border-yellow-300 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-yellow-800 font-medium">
                {selectedProducts.length} product(s) selected
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={bulkAddToCart}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                >
                  Add to Cart
                </button>
                <button
                  onClick={bulkAddToWishlist}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Add to Wishlist
                </button>
                <button
                  onClick={() => setSelectedProducts([])}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Compare Bar */}
        {compareList.length > 0 && (
          <div className="mb-6 bg-blue-100 border border-blue-300 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-blue-800 font-medium">
                {compareList.length} product(s) in compare list
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  Compare Now
                </button>
                <button
                  onClick={() => setCompareList([])}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, brands, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            >
              List
            </button>
          </div>
          <div className="text-sm text-gray-600">
            {filteredProducts.length} products found
          </div>
          </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-6 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {(() => {
                    const categories = Array.from(new Set(contextProducts.map(p => p.category)));
                    return categories.map((category) => (
                      <option
                        key={category}
                        value={category.toLowerCase().replace(/\s+/g, '-')}
                      >
                        {category}
                      </option>
                    ));
                  })()}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-20 px-2 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Min"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-20 px-2 py-2 border border-gray-300 rounded-lg text-sm"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium mb-2">Availability</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                  <option value="all">All Items</option>
                  <option value="in-stock">In Stock Only</option>
                  <option value="out-of-stock">Out of Stock</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-10">
          {(() => {
            // Generate categories dynamically from real products
            const categoryMap = new Map<string, { count: number; image: string }>();
            
            contextProducts.forEach(product => {
              const category = product.category;
              if (!categoryMap.has(category)) {
                categoryMap.set(category, { 
                  count: 0, 
                  image: product.images[0] || '/images/products/logo_blackk.png' 
                });
              }
              categoryMap.get(category)!.count++;
            });

            return Array.from(categoryMap.entries()).map(([category, data]) => (
              <button 
                key={category} 
                className="flex flex-col items-center bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 p-4 cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 category-card-hover"
                onClick={() => handleCategorySelect(category.toLowerCase().replace(/\s+/g, '-'))}
              >
                <img
                  src={data.image}
                  alt={category}
                  className="w-20 h-20 object-cover rounded-full border mb-2"
                  onError={e => { e.currentTarget.src = '/images/products/logo_blackk.png'; }}
                />
                <div className="font-semibold text-lg text-gray-800 text-center mb-1">{category}</div>
                <div className="text-gray-500 text-sm">{data.count} items</div>
              </button>
            ));
          })()}
        </div>

        {/* Products Grid/List */}
        <div id="products-section" className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
          {Array.isArray(filteredProducts) && filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                viewMode === 'list' ? 'flex' : ''
              } ${selectedProducts.includes(product.id) ? 'ring-2 ring-yellow-500' : ''}`}
            >
              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => toggleProductSelection(product.id)}
                  className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
                />
              </div>
              {/* Product Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-32 h-32 flex-shrink-0' : 'w-full h-48'}`} style={{ position: 'relative', minWidth: viewMode === 'list' ? 128 : '100%', minHeight: viewMode === 'list' ? 128 : 192 }}>
                <Image
                  src={product.images[0] || '/images/products/logo_blackk.png'}
                  alt={product.title}
                  fill
                  className="object-cover w-full h-full rounded-lg"
                  onError={e => { e.currentTarget.src = '/images/products/logo_blackk.png'; }}
                />
                {!product.isAvailable && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold">Out of Stock</span>
                  </div>
                )}
              </div>
              {/* Product Info */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 truncate">{product.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">{product.seller.name}</p>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-yellow-600">₹{product.price}</span>
                </div>
                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.isAvailable}
                      className="flex-1 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed text-sm"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        wishlist.includes(product.id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-red-100'
                      }`}
                    >
                      <FaHeart className="text-sm" />
                    </button>
                    <button
                      onClick={() => toggleCompare(product.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        compareList.includes(product.id) 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-blue-100'
                      }`}
                    >
                      <FaEye className="text-sm" />
                    </button>
                    <button
                      onClick={() => shareProduct(product)}
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <FaShare className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Compare Modal */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Compare Products</h2>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {compareList.map(productId => {
                const product = allProducts.find(p => p.id === productId);
                if (!product) return null;
                
                return (
                  <div key={productId} className="border rounded-lg p-4">
                    <img
                      src={product.images[0] || '/images/products/logo_blackk.png'}
                      alt={product.title}
                      width={100}
                      height={100}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                      onError={e => { e.currentTarget.src = '/images/products/logo_blackk.png'; }}
                    />
                    <h3 className="font-semibold mb-2">{product.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.seller.name}</p>
                    <p className="font-bold text-yellow-600 mb-2">₹{product.price}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Scan QR Code</h2>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              <FaQrcode className="text-8xl text-gray-400 mx-auto" />
            </div>
            <p className="text-gray-600 mb-4">Scan this QR code to open Tuffly on your mobile device</p>
            <button
              onClick={() => setShowQRModal(false)}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 
