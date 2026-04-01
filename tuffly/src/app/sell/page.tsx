'use client';

import React from 'react';
import ProductForm from '../components/ProductForm';

export default function SellPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductForm />
        </div>
      </main>
    </div>
  );
} 
