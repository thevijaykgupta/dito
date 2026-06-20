'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaTruck, FaCheckCircle, FaClock, FaBox, FaStar } from 'react-icons/fa';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    brand: string;
  }>;
  total: number;
  trackingNumber?: string;
}

export default function OrdersPage() {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      items: [
        {
          id: '1',
          name: 'Chips',
          image: '/images/products/chips.jpg',
          price: 20,
          quantity: 2,
          brand: 'Lay\'s'
        },
        {
          id: '2',
          name: 'Arduino',
          image: '/images/products/arduino.jpg',
          price: 1200,
          quantity: 1,
          brand: 'Arduino'
        }
      ],
      total: 1240,
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-002',
      date: '2024-01-20',
      status: 'shipped',
      items: [
        {
          id: '3',
          name: 'Socks',
          image: '/images/products/socks.jpg',
          price: 80,
          quantity: 3,
          brand: 'Nike'
        }
      ],
      total: 240,
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-003',
      date: '2024-01-25',
      status: 'confirmed',
      items: [
        {
          id: '4',
          name: 'Crocs',
          image: '/images/products/crocs.jpg',
          price: 1200,
          quantity: 1,
          brand: 'Crocs'
        }
      ],
      total: 1200
    }
  ]);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'confirmed':
        return <FaCheckCircle className="text-blue-500" />;
      case 'shipped':
        return <FaTruck className="text-purple-500" />;
      case 'delivered':
        return <FaBox className="text-green-500" />;
      case 'cancelled':
        return <FaCheckCircle className="text-red-500" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No orders yet</h1>
          <p className="text-gray-600 mb-8">Start shopping to see your orders here!</p>
          <Link 
            href="/categories"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Order Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.brand}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-bold text-gray-800">Total: ₹{order.total}</p>
                      {order.trackingNumber && (
                        <p className="text-sm text-gray-500">Tracking: {order.trackingNumber}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {order.status === 'delivered' && (
                        <button className="flex items-center space-x-1 px-3 py-2 text-yellow-600 hover:text-yellow-700 transition-colors">
                          <FaStar />
                          <span className="text-sm">Rate</span>
                        </button>
                      )}
                      <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              href="/categories"
              className="p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">🛍️</div>
              <p className="font-medium text-gray-800">Shop More</p>
            </Link>
            <Link 
              href="/help"
              className="p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">❓</div>
              <p className="font-medium text-gray-800">Need Help?</p>
            </Link>
            <Link 
              href="/profile"
              className="p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors text-center"
            >
              <div className="text-2xl mb-2">👤</div>
              <p className="font-medium text-gray-800">My Profile</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
