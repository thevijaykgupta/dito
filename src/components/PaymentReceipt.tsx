'use client';

import React, { useState } from 'react';
import { FaDownload, FaPrint, FaEnvelope, FaCheckCircle, FaTimes, FaReceipt, FaQrcode } from 'react-icons/fa';

interface ReceiptItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface ReceiptData {
  receiptId: string;
  date: Date;
  buyer: {
    name: string;
    email: string;
    phone: string;
  };
  seller: {
    name: string;
    phone: string;
    room: string;
    hostel: string;
  };
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  transactionId: string;
  status: 'completed' | 'pending' | 'failed';
}

interface PaymentReceiptProps {
  isOpen: boolean;
  onClose: () => void;
  receiptData: ReceiptData;
}

export default function PaymentReceipt({ isOpen, onClose, receiptData }: PaymentReceiptProps) {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Simulate PDF generation and download
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a blob with receipt data
      const receiptText = `
        Tuffly - Payment Receipt
        Receipt ID: ${receiptData.receiptId}
        Date: ${formatDate(receiptData.date)}
        
        Buyer: ${receiptData.buyer.name}
        Email: ${receiptData.buyer.email}
        Phone: ${receiptData.buyer.phone}
        
        Seller: ${receiptData.seller.name}
        Phone: ${receiptData.seller.phone}
        Room: ${receiptData.seller.room}
        Hostel: ${receiptData.seller.hostel}
        
        Items:
        ${receiptData.items.map(item => 
          `${item.name} x${item.quantity} - ${formatCurrency(item.total)}`
        ).join('\n')}
        
        Subtotal: ${formatCurrency(receiptData.subtotal)}
        Tax: ${formatCurrency(receiptData.tax)}
        Total: ${formatCurrency(receiptData.total)}
        
        Payment Method: ${receiptData.paymentMethod}
        Transaction ID: ${receiptData.transactionId}
        Status: ${receiptData.status}
      `;
      
      const blob = new Blob([receiptText], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${receiptData.receiptId}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleEmailReceipt = async () => {
    try {
      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsEmailSent(true);
      
      // Reset after 3 seconds
      setTimeout(() => setIsEmailSent(false), 3000);
    } catch (error) {
      console.error('Email failed:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FaReceipt className="text-2xl text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">Payment Receipt</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {/* Receipt Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <FaCheckCircle className="text-4xl text-green-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Tuffly</h1>
                <p className="text-gray-600">Campus Marketplace</p>
              </div>
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full inline-block">
              Payment Successful
            </div>
          </div>

          {/* Receipt Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Receipt Information</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Receipt ID:</span> {receiptData.receiptId}</p>
                <p><span className="font-medium">Date:</span> {formatDate(receiptData.date)}</p>
                <p><span className="font-medium">Transaction ID:</span> {receiptData.transactionId}</p>
                <p><span className="font-medium">Payment Method:</span> {receiptData.paymentMethod}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Buyer Information</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">Name:</span> {receiptData.buyer.name}</p>
                <p><span className="font-medium">Email:</span> {receiptData.buyer.email}</p>
                <p><span className="font-medium">Phone:</span> {receiptData.buyer.phone}</p>
              </div>
            </div>
          </div>

          {/* Seller Information */}
          {receiptData.status === 'completed' && (
            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Seller Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><span className="font-medium">Name:</span> {receiptData.seller.name}</p>
                  <p><span className="font-medium">Phone:</span> {receiptData.seller.phone}</p>
                </div>
                <div>
                  <p><span className="font-medium">Room:</span> {receiptData.seller.room}</p>
                  <p><span className="font-medium">Hostel:</span> {receiptData.seller.hostel}</p>
                </div>
              </div>
            </div>
          )}

          {/* Items */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Items Purchased</h3>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Item</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Price</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-700">Qty</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {receiptData.items.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-sm text-gray-800">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 text-right">{formatCurrency(item.price)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 text-center">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800 text-right">{formatCurrency(item.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 pt-4">
            <div className="space-y-2 text-right">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{formatCurrency(receiptData.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (5%):</span>
                <span className="font-medium">{formatCurrency(receiptData.tax)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-800 border-t border-gray-200 pt-2">
                <span>Total:</span>
                <span>{formatCurrency(receiptData.total)}</span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="text-center mt-6 p-4 bg-gray-50 rounded-xl">
            <FaQrcode className="text-4xl text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Scan to verify receipt</p>
            <p className="text-xs text-gray-500 mt-1">{receiptData.receiptId}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <FaPrint />
              <span>Print Receipt</span>
            </button>
            
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 bg-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <FaDownload />
              <span>{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
            </button>
            
            <button
              onClick={handleEmailReceipt}
              disabled={isEmailSent}
              className="flex-1 bg-purple-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-purple-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <FaEnvelope />
              <span>{isEmailSent ? 'Email Sent!' : 'Email Receipt'}</span>
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Thank you for using Tuffly! Your receipt has been sent to {receiptData.buyer.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
