'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  specifications: string[];
}

export default function SellerDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0,
    specifications: []
  });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price) {
      const product: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        description: newProduct.description || '',
        price: newProduct.price,
        category: newProduct.category || '',
        image: newProduct.image || '',
        stock: newProduct.stock || 0,
        specifications: newProduct.specifications || []
      };
      setProducts([...products, product]);
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        category: '',
        image: '',
        stock: 0,
        specifications: []
      });
      setIsAddingProduct(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-400">Seller Dashboard</h1>
          <button
            onClick={() => setIsAddingProduct(true)}
            className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors duration-300"
          >
            Add New Product
          </button>
        </div>

        {/* Add Product Modal */}
        {isAddingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-blue-800 rounded-2xl p-8 max-w-2xl w-full">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6">Add New Product</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-yellow-200 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-blue-900 text-white border border-yellow-400/30 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-yellow-200 mb-2">Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-blue-900 text-white border border-yellow-400/30 focus:border-yellow-400 focus:outline-none h-32"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-yellow-200 mb-2">Price (₹)</label>
                    <input
                      type="number"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                      className="w-full px-4 py-2 rounded-lg bg-blue-900 text-white border border-yellow-400/30 focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-yellow-200 mb-2">Stock</label>
                    <input
                      type="number"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                      className="w-full px-4 py-2 rounded-lg bg-blue-900 text-white border border-yellow-400/30 focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-yellow-200 mb-2">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-blue-900 text-white border border-yellow-400/30 focus:border-yellow-400 focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="arduino">Arduino Boards</option>
                    <option value="sensors">Sensors</option>
                    <option value="components">Components</option>
                    <option value="tools">Tools</option>
                  </select>
                </div>
                <div>
                  <label className="block text-yellow-200 mb-2">Image URL</label>
                  <input
                    type="text"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-blue-900 text-white border border-yellow-400/30 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setIsAddingProduct(false)}
                    className="px-6 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProduct}
                    className="px-6 py-2 rounded-lg bg-yellow-400 text-blue-900 font-bold hover:bg-yellow-500 transition-colors duration-300"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-blue-800/50 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/20">
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}
              <h3 className="text-xl font-bold text-yellow-400 mb-2">{product.name}</h3>
              <p className="text-yellow-200/70 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-400 font-bold">₹{product.price}</span>
                <span className="text-yellow-200/70">Stock: {product.stock}</span>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button className="px-4 py-2 rounded-lg bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30 transition-colors duration-300">
                  Edit
                </button>
                <button className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors duration-300">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-yellow-200/70 text-lg">No products added yet. Click "Add New Product" to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
} 
