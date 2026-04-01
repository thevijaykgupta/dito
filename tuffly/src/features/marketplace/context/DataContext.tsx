'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/app/types';
import { detectCategoryFromTitle } from '../services/categoryDetection';

interface FeatureToggle {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  category: 'general' | 'commerce' | 'social' | 'admin';
}

interface DataContextType {
  products: Product[];
  features: FeatureToggle[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'views' | 'likes'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleFeature: (featureId: string) => void;
  getProductsByCategory: (category: string) => Product[];
  getProductsBySeller: (sellerId: string) => Product[];
  searchProducts: (query: string) => Product[];
  getApprovedProducts: () => Product[];
  getStatistics: () => {
    totalProducts: number;
    totalUsers: number;
    totalSales: number;
    newListingsThisWeek: number;
  };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [features, setFeatures] = useState<FeatureToggle[]>([]);

  useEffect(() => {
    const defaultFeatures: FeatureToggle[] = [
      { id: 'rental', name: 'Rental System', description: 'Allow users to rent items instead of buying', isEnabled: true, category: 'commerce' },
      { id: 'offers', name: 'Offer System', description: 'Enable users to make offers on products', isEnabled: true, category: 'commerce' },
      { id: 'chat', name: 'Live Chat', description: 'Real-time messaging between users', isEnabled: true, category: 'social' },
      { id: 'notifications', name: 'Push Notifications', description: 'Real-time notifications for users', isEnabled: true, category: 'general' },
      { id: 'analytics', name: 'Analytics Dashboard', description: 'Admin analytics and insights', isEnabled: true, category: 'admin' },
    ];
    setFeatures(defaultFeatures);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/listings', { cache: 'no-store' });
        if (!response.ok) return;
        const payload = await response.json();
        const nextProducts = (payload.listings || []).map((item: Product) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }));
        setProducts(nextProducts);
      } catch (error) {
        console.error('Failed to load listings:', error);
      }
    };
    void loadProducts();
  }, []);

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'views' | 'likes'>) => {
    const category = detectCategoryFromTitle(productData.title) || productData.category;
    const newProduct: Product = {
      ...productData,
      category,
      id: Date.now().toString(),
      createdAt: new Date(),
      views: 0,
      likes: 0,
      isAvailable: productData.seller.isVerified || false,
      requiresApproval: !productData.seller.isVerified,
      listingStatus: 'active',
    };
    setProducts((prev) => [newProduct, ...prev]);
    void fetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((product) => (product.id === id ? { ...product, ...updates } : product)));
    void fetch(`/api/listings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    void fetch(`/api/listings/${id}`, { method: 'DELETE' });
  };

  const toggleFeature = (featureId: string) => {
    if (!isAdmin) return;
    setFeatures((prev) => prev.map((feature) => (feature.id === featureId ? { ...feature, isEnabled: !feature.isEnabled } : feature)));
  };

  const getApprovedProducts = () => products.filter((product) => product.isAvailable);
  const getProductsByCategory = (category: string) =>
    getApprovedProducts().filter((product) => product.category.toLowerCase() === category.toLowerCase());
  const getProductsBySeller = (sellerId: string) => products.filter((product) => product.seller.id === sellerId);
  const searchProducts = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return getApprovedProducts().filter(
      (product) =>
        product.title.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getStatistics = () => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const newListingsThisWeek = products.filter((product) => product.createdAt >= oneWeekAgo).length;
    const totalSales = products.reduce((sum, product) => sum + product.price, 0);
    return {
      totalProducts: products.length,
      totalUsers: Math.max(products.length * 2, 50),
      totalSales,
      newListingsThisWeek,
    };
  };

  return (
    <DataContext.Provider
      value={{
        products,
        features,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleFeature,
        getProductsByCategory,
        getProductsBySeller,
        searchProducts,
        getStatistics,
        getApprovedProducts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
