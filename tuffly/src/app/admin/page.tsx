'use client';

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AdminProtection from '@/components/AdminProtection'
import { useData } from '@/context/DataContext'
import { useAuth } from '@/context/AuthContext'
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Shield, 
  Settings, 
  BarChart3,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Download,
  TrendingUp,
  Tag,
  Ban,
  Unlock,
  UserCheck,
  UserX
} from 'lucide-react'
import { useMaintenance } from '@/context/MaintenanceContext';

interface PromoCode {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  maxUses: number;
  currentUses: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  createdAt: Date;
}

export default function AdminDashboard() {
  const { products, features, getStatistics, updateProduct, deleteProduct, toggleFeature } = useData();
  const { user } = useAuth();
  const { isConfessionBoardEnabled, setConfessionBoardEnabled } = useMaintenance();

  const [activeTab, setActiveTab] = useState('overview')
  const [showPromoModal, setShowPromoModal] = useState(false)
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([])

  // Real-time statistics
  const statistics = getStatistics();
  const realTimeStats = {
    totalUsers: statistics.totalUsers,
    activeListings: statistics.totalProducts,
    totalSales: statistics.totalSales,
    commissionEarned: Math.floor(statistics.totalSales * 0.05), // 5% commission
    pendingApprovals: products.filter(p => !p.isAvailable).length,
  }

  // Mock users data (in real app, this would come from user management system)
  const users = [
    { id: 1, name: 'John Doe', email: 'john@student.com', hostel: 'Cauvery', status: 'active', verified: true, listings: products.filter(p => p.seller.id === '1').length },
    { id: 2, name: 'Jane Smith', email: 'jane@student.com', hostel: 'Krishna', status: 'active', verified: false, listings: products.filter(p => p.seller.id === '2').length },
    { id: 3, name: 'Mike Johnson', email: 'mike@student.com', hostel: 'Diamond Jubilee', status: 'active', verified: true, listings: products.filter(p => p.seller.id === '3').length },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'promocodes', label: 'Promo Codes', icon: Tag },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  // Promo Code Management
  const addPromoCode = (promoData: Omit<PromoCode, 'id' | 'createdAt' | 'currentUses'>) => {
    const newPromo: PromoCode = {
      ...promoData,
      id: Date.now().toString(),
      createdAt: new Date(),
      currentUses: 0
    };
    setPromoCodes(prev => [newPromo, ...prev]);
    setShowPromoModal(false);
  };

  const deletePromoCode = (id: string) => {
    setPromoCodes(prev => prev.filter(promo => promo.id !== id));
  };

  const togglePromoCode = (id: string) => {
    setPromoCodes(prev => prev.map(promo => 
      promo.id === id ? { ...promo, isActive: !promo.isActive } : promo
    ));
  };

  // User Management
  const handleUserAction = (userId: number, action: string) => {
    console.log(`Action ${action} on user ${userId}`);
    // In real app, this would update user status in database
    if (action === 'verify') {
      alert(`User ${userId} has been verified! Their future listings will be auto-approved.`);
    } else if (action === 'ban') {
      alert(`User ${userId} has been banned.`);
    } else if (action === 'unban') {
      alert(`User ${userId} has been unbanned.`);
    }
  }

  // Product Management
  const handleProductAction = (productId: string, action: string) => {
    if (action === 'approve') {
      updateProduct(productId, { isAvailable: true, requiresApproval: false });
      alert('Product approved and now visible to public!');
    } else if (action === 'reject') {
      deleteProduct(productId);
      alert('Product rejected and removed from system.');
    }
  }

  // Feature Toggle
  const handleFeatureToggle = (featureId: string) => {
    toggleFeature(featureId);
  }

  // Export Data
  const exportData = (type: string) => {
    const data = type === 'products' ? products : [];
    const csv = convertToCSV(data);
    downloadCSV(csv, `${type}_export_${new Date().toISOString().split('T')[0]}.csv`);
  }

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => JSON.stringify(row[header])).join(','))
    ].join('\n');
    return csvContent;
  }

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <AdminProtection>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-white">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-blue-600 to-yellow-600 bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Complete control over Tuffly marketplace</p>
            <p className="text-sm text-gray-500">Welcome back, {user?.name || 'Admin'}</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-gray-800">{realTimeStats.totalUsers}</p>
                  <p className="text-green-600 text-xs">+{Math.floor(Math.random() * 10) + 1} this week</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Listings</p>
                  <p className="text-3xl font-bold text-gray-800">{realTimeStats.activeListings}</p>
                  <p className="text-blue-600 text-xs">+{Math.floor(Math.random() * 5) + 1} new today</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="text-yellow-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Sales</p>
                  <p className="text-3xl font-bold text-gray-800">₹{realTimeStats.totalSales.toLocaleString()}</p>
                  <p className="text-green-600 text-xs">+{Math.floor(Math.random() * 15) + 5}% this month</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending Approvals</p>
                  <p className="text-3xl font-bold text-gray-800">{realTimeStats.pendingApprovals}</p>
                  <p className="text-orange-600 text-xs">Requires attention</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="text-orange-600" size={24} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-2 bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-yellow-500 to-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Recent Activity */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {products.slice(0, 5).map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                              <ShoppingBag className="text-yellow-600" size={20} />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{product.title}</p>
                              <p className="text-sm text-gray-600">Added by {product.seller.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-800">₹{product.price}</p>
                            <p className="text-xs text-gray-500">{product.category}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                      <div className="space-y-3">
                        <button
                          onClick={() => setActiveTab('products')}
                          className="w-full flex items-center justify-between p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                        >
                          <span className="font-medium text-gray-800">Review Pending Products</span>
                          <AlertTriangle className="text-yellow-600" size={20} />
                        </button>
                        <button
                          onClick={() => setActiveTab('users')}
                          className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          <span className="font-medium text-gray-800">Manage Users</span>
                          <Users className="text-blue-600" size={20} />
                        </button>
                        <button
                          onClick={() => setActiveTab('promocodes')}
                          className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          <span className="font-medium text-gray-800">Add Promo Codes</span>
                          <Tag className="text-green-600" size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">System Status</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="font-medium text-gray-800">Marketplace</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-green-600">Online</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium text-gray-800">Confession Board</span>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${isConfessionBoardEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className={`text-sm ${isConfessionBoardEnabled ? 'text-green-600' : 'text-red-600'}`}>
                              {isConfessionBoardEnabled ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <span className="font-medium text-gray-800">Payment System</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-green-600">Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">User Management</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">User</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Hostel</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Verified</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Listings</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-sm font-medium text-blue-600">{user.name.charAt(0)}</span>
                                </div>
                                <span className="font-medium text-gray-800">{user.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-gray-600">{user.email}</td>
                            <td className="py-3 px-4 text-gray-600">{user.hostel}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              {user.verified ? (
                                <CheckCircle className="text-green-500" size={20} />
                              ) : (
                                <XCircle className="text-red-500" size={20} />
                              )}
                            </td>
                            <td className="py-3 px-4 text-gray-600">{user.listings}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center space-x-2">
                                {!user.verified && (
                                  <button
                                    onClick={() => handleUserAction(user.id, 'verify')}
                                    className="p-1 text-green-600 hover:bg-green-100 rounded"
                                    title="Verify User"
                                  >
                                    <UserCheck size={16} />
                                  </button>
                                )}
                                <button
                                  onClick={() => handleUserAction(user.id, 'ban')}
                                  className="p-1 text-red-600 hover:bg-red-100 rounded"
                                  title="Ban User"
                                >
                                  <Ban size={16} />
                                </button>
                                <button
                                  onClick={() => handleUserAction(user.id, 'unban')}
                                  className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                  title="Unban User"
                                >
                                  <Unlock size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Products Tab */}
              {activeTab === 'products' && (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Product Moderation</h3>
                  <div className="space-y-4">
                    {products.filter(p => !p.isAvailable).length === 0 ? (
                      <div className="text-center py-8">
                        <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
                        <p className="text-gray-600">No pending approvals!</p>
                      </div>
                    ) : (
                      products.filter(p => !p.isAvailable).map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                <ShoppingBag className="text-gray-400" size={24} />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">{product.title}</h4>
                                <p className="text-sm text-gray-600">{product.description}</p>
                                <p className="text-sm text-gray-500">By {product.seller.name} • {product.category}</p>
                                <p className="text-lg font-bold text-yellow-600">₹{product.price}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleProductAction(product.id, 'approve')}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                              >
                                <CheckCircle size={16} />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => handleProductAction(product.id, 'reject')}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                              >
                                <XCircle size={16} />
                                <span>Reject</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Promo Codes Tab */}
              {activeTab === 'promocodes' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-800">Promo Code Management</h3>
                      <button
                        onClick={() => setShowPromoModal(true)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2"
                      >
                        <Plus size={16} />
                        <span>Add Promo Code</span>
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {promoCodes.map((promo) => (
                        <div key={promo.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{promo.code}</h4>
                            <button
                              onClick={() => togglePromoCode(promo.id)}
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                promo.isActive 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {promo.isActive ? 'Active' : 'Inactive'}
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {promo.discount}{promo.type === 'percentage' ? '%' : '₹'} off
                          </p>
                          <p className="text-xs text-gray-500 mb-3">
                            Uses: {promo.currentUses}/{promo.maxUses}
                          </p>
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => deletePromoCode(promo.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={16} />
                            </button>
                            <span className="text-xs text-gray-500">
                              {new Date(promo.validUntil).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  {/* Feature Toggles */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Feature Toggles</h3>
                    <div className="space-y-4">
                      {features.map((feature) => (
                        <div key={feature.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <h4 className="font-semibold text-gray-800">{feature.name}</h4>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                            <span className="text-xs text-gray-500">{feature.category}</span>
                          </div>
                          <button
                            onClick={() => handleFeatureToggle(feature.id)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              feature.isEnabled ? 'bg-yellow-500' : 'bg-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                feature.isEnabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Confession Board Toggle */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Confession Board</h3>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-800">Confession Board</h4>
                        <p className="text-sm text-gray-600">Enable or disable the confession board feature</p>
                      </div>
                      <button
                        onClick={() => setConfessionBoardEnabled(!isConfessionBoardEnabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          isConfessionBoardEnabled ? 'bg-yellow-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isConfessionBoardEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Data Export */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Data Export</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => exportData('products')}
                        className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <span className="font-medium text-gray-800">Export Products Data</span>
                        <Download className="text-blue-600" size={20} />
                      </button>
                      <button
                        onClick={() => exportData('users')}
                        className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                      >
                        <span className="font-medium text-gray-800">Export Users Data</span>
                        <Download className="text-green-600" size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Promo Code Modal */}
        <AnimatePresence>
          {showPromoModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
              >
                <PromoCodeForm
                  onSubmit={addPromoCode}
                  onCancel={() => setShowPromoModal(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminProtection>
  )
}

// Promo Code Form Component
function PromoCodeForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    type: 'percentage' as 'percentage' | 'fixed',
    maxUses: '',
    validFrom: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      discount: parseFloat(formData.discount),
      maxUses: parseInt(formData.maxUses),
      validFrom: new Date(formData.validFrom),
      validUntil: new Date(formData.validUntil)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Promo Code</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
        <input
          type="text"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          placeholder="WELCOME10"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
          <input
            type="number"
            value={formData.discount}
            onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="10"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as 'percentage' | 'fixed' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Max Uses</label>
        <input
          type="number"
          value={formData.maxUses}
          onChange={(e) => setFormData({ ...formData, maxUses: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          placeholder="100"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Valid From</label>
          <input
            type="date"
            value={formData.validFrom}
            onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Valid Until</label>
          <input
            type="date"
            value={formData.validUntil}
            onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
          className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
        />
        <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Active</label>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          Create Promo Code
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
} 