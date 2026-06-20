'use client';

import React from 'react';

export default function AdminOrdersPage() {
  // Placeholder orders data
  const orders = [
    { id: 'ORD001', user: 'John Doe', product: 'Arduino Uno', amount: 1200, status: 'Completed', date: '2024-06-18' },
    { id: 'ORD002', user: 'Jane Smith', product: 'Notebook', amount: 150, status: 'Pending', date: '2024-06-17' },
    { id: 'ORD003', user: 'Vijay Gupta', product: 'Ultrasonic Sensor', amount: 800, status: 'Cancelled', date: '2024-06-16' },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Order ID</th>
            <th className="p-2">User</th>
            <th className="p-2">Product</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-t">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.user}</td>
              <td className="p-2">{order.product}</td>
              <td className="p-2">₹{order.amount}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
