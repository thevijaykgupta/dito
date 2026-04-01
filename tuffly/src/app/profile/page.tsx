'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { FaArrowLeft, FaEdit, FaCog, FaHeart, FaHistory, FaWallet, FaGift, FaTrophy, FaShare, FaQrcode, FaCamera, FaClipboardList } from 'react-icons/fa';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Orders', value: '12', icon: FaHistory, color: 'bg-blue-500' },
    { label: 'Favorites', value: '8', icon: FaHeart, color: 'bg-red-500' },
    { label: 'Points', value: '1,250', icon: FaTrophy, color: 'bg-yellow-500' },
  ];

  const quickActions = [
    { icon: FaClipboardList, label: 'My Orders', href: '/orders', color: 'bg-indigo-500' },
    { icon: FaWallet, label: 'My Wallet', href: '/wallet', color: 'bg-green-500' },
    { icon: FaGift, label: 'Rewards', href: '/rewards', color: 'bg-purple-500' },
    { icon: FaQrcode, label: 'QR Code', href: '/qr', color: 'bg-blue-500' },
    { icon: FaCamera, label: 'Photo Search', href: '/photo-search', color: 'bg-pink-500' },
  ];

  const recentOrders = [
    { id: '1', item: 'Arduino Kit', status: 'Delivered', date: '2024-01-25', amount: '₹1,200' },
    { id: '2', item: 'Nike Socks', status: 'Shipped', date: '2024-01-24', amount: '₹240' },
    { id: '3', item: 'Energy Drinks', status: 'Processing', date: '2024-01-23', amount: '₹135' },
  ];

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
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 animate-fade-in">
          <div className="relative h-32 bg-gradient-to-r from-yellow-400 to-orange-500">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="absolute bottom-4 right-4">
              <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                <FaEdit />
          </button>
        </div>
      </div>
          
          <div className="relative px-6 pb-6">
            <div className="absolute -top-16 left-6">
              <div className="relative">
                <Image
                  src="/images/products/logo_new.jpg"
                  alt="Profile"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="pt-16">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{user?.name || 'User Name'}</h2>
                  <p className="text-gray-600">{user?.email || 'user@example.com'}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                      Gold Member
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Verified
                    </span>
                  </div>
                </div>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
                </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center space-x-3">
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <stat.icon className="text-white text-lg" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
                </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`${action.color} p-3 rounded-full`}>
                  <action.icon className="text-white text-xl" />
                </div>
                <span className="text-sm font-medium text-gray-800 text-center">{action.label}</span>
              </Link>
            ))}
          </div>
                </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b border-gray-200">
            {['overview', 'orders', 'favorites', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-yellow-600 border-b-2 border-yellow-600 bg-yellow-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
                </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h4>
                  <div className="space-y-3">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="font-medium text-gray-800">{order.item}</p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">{order.amount}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FaTrophy className="text-2xl" />
                        <div>
                          <p className="font-bold">First Order</p>
                          <p className="text-sm opacity-90">Completed your first purchase</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="text-center py-8">
                <FaHistory className="text-4xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">View all your orders</p>
                <Link href="/orders" className="text-yellow-600 hover:text-yellow-700 font-medium">
                  Go to Orders →
                </Link>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div className="text-center py-8">
                <FaHeart className="text-4xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Your favorite items</p>
                <Link href="/categories" className="text-yellow-600 hover:text-yellow-700 font-medium">
                  Browse Products →
                </Link>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FaCog className="text-gray-600" />
                    <span className="font-medium text-gray-800">Account Settings</span>
                  </div>
                  <FaArrowLeft className="text-gray-400 rotate-180" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FaShare className="text-gray-600" />
                    <span className="font-medium text-gray-800">Share Profile</span>
                  </div>
                  <FaArrowLeft className="text-gray-400 rotate-180" />
                </button>
                <Link href="/profile/payments" className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FaWallet className="text-gray-600" />
                    <span className="font-medium text-gray-800">Payment Settings</span>
                  </div>
                  <FaArrowLeft className="text-gray-400 rotate-180" />
                </Link>
                    <button
                  onClick={signOut}
                  className="w-full flex items-center justify-between p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                  <div className="flex items-center space-x-3">
                    <FaArrowLeft className="text-red-600" />
                    <span className="font-medium text-red-800">Sign Out</span>
                  </div>
                  <FaArrowLeft className="text-red-400 rotate-180" />
                  </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
