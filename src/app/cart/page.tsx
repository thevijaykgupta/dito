'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaTrash, FaHeart, FaGift, FaCreditCard, FaShieldAlt, FaTruck, FaUndo, FaShare, FaQrcode, FaTimes } from 'react-icons/fa';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  brand: string;
  inStock: boolean;
  maxQuantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.maxQuantity)) }
          : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      setCartItems(prev => prev.filter(item => item.id !== id));
      setSavedItems(prev => [...prev, item]);
    }
  };

  const moveToCart = (id: string) => {
    const item = savedItems.find(item => item.id === id);
    if (item) {
      setSavedItems(prev => prev.filter(item => item.id !== id));
      setCartItems(prev => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const removeFromSaved = (id: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const giftWrappingFee = giftWrapping ? 50 : 0;
  const total = subtotal + giftWrappingFee;

  const shareCart = () => {
    const cartText = cartItems.map(item => `${item.name} x${item.quantity}`).join(', ');
    if (navigator.share) {
      navigator.share({
        title: 'My Tuffly Cart',
        text: `Check out my cart: ${cartText}`,
        url: 'https://Tuffly.com/cart'
      });
    } else {
      navigator.clipboard.writeText(`My Tuffly Cart: ${cartText}`);
      alert('Cart details copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="p-2 text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <FaArrowLeft className="text-xl" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowQRModal(true)}
              className="p-2 text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <FaQrcode className="text-xl" />
            </button>
            <button
              onClick={shareCart}
              className="p-2 text-gray-600 hover:text-yellow-600 transition-colors"
            >
              <FaShare className="text-xl" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Cart Items */}
            {cartItems.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Cart Items ({cartItems.length})</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center">
                            <span className="text-red-600 text-xs font-bold">Out of Stock</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.brand}</p>
                        <p className="text-lg font-bold text-yellow-600">₹{item.price}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxQuantity}
                          className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-gray-800">₹{item.price * item.quantity}</p>
                        <p className="text-sm text-gray-500">₹{item.price} each</p>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Save for later"
                        >
                          <FaHeart className="text-sm" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                          title="Remove"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">Add some products to get started!</p>
                <Link
                  href="/categories"
                  className="inline-block bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            )}

            {/* Saved Items */}
            {savedItems.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Saved for Later ({savedItems.length})</h2>
                <div className="space-y-4">
                  {savedItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.brand}</p>
                        <p className="text-lg font-bold text-yellow-600">₹{item.price}</p>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => moveToCart(item.id)}
                          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm"
                        >
                          Move to Cart
                        </button>
                        <button
                          onClick={() => removeFromSaved(item.id)}
                          className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              
              {/* Gift Wrapping
              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={giftWrapping}
                    onChange={(e) => setGiftWrapping(e.target.checked)}
                    className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Gift Wrapping (+₹50)</span>
                  <FaGift className="text-yellow-500" />
                </label>
              </div> */}

              {/* Price Breakdown */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                {giftWrapping && (
                  <div className="flex justify-between text-sm">
                    <span>Gift Wrapping</span>
                    <span>₹{giftWrappingFee}</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                disabled={cartItems.length === 0}
                className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed mb-4"
              >
                Proceed to Checkout
              </button>

              {/* Security & Trust */}
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <FaShieldAlt className="text-green-500" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaTruck className="text-blue-500" />
                </div>
                <div className="flex items-center space-x-2">
                  <FaUndo className="text-orange-500" />
                  <span>Easy returns within 7 days</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4">Payment Methods</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FaCreditCard className="text-blue-500" />
                  <span className="text-sm">Credit/Debit Cards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm">UPI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-sm">Net Banking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-purple-500 rounded"></div>
                  <span className="text-sm">Digital Wallets</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Scan to Continue</h2>
            <div className="bg-gray-100 rounded-lg p-6 mb-4">
              <FaQrcode className="text-8xl text-gray-400 mx-auto" />
            </div>
            <p className="text-gray-600 mb-4">Scan this QR code to continue shopping on your mobile device</p>
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
