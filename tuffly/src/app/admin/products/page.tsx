'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  hostel: string;
  condition: number;
  academicYear?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Kurkure',
      price: 20,
      description: 'Crunchy and spicy snack',
      category: 'Chips & Crisps',
      image: '/images/products/kurkure.jpg',
      hostel: 'Cauvery',
      condition: 5
    }
  ]);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const hostels = [
    'Chamundi block: First year U.G. students & RV University students',
    'Cauvery Annex block: First year U.G. students',
    'Cauvery block: Second & Third year U.G. students',
    'Sir M. Visweswaraya block : Final year U.G. and P.G. students'
  ];

  const academicYearOptions = [
    '1st Year', '2nd Year', '3rd Year', '4th Year', 'PG', 'Other'
  ];

  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: products.length + 1
    };
    setProducts([...products, newProduct]);
    setShowAddModal(false);
    setImagePreview(null);
  };

  const handleEditProduct = async (product: Product) => {
    setProducts(products.map(p => p.id === product.id ? product : p));
    setEditingProduct(null);
    setImagePreview(null);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const filename = `${Date.now()}-${file.name}`;
      const imagePath = `/images/products/${filename}`;
      
      const imageInput = document.querySelector('input[name="image"]') as HTMLInputElement;
      if (imageInput) {
        imageInput.value = imagePath;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const updateEditingProductField = (key: keyof Product, value: any) => {
    setEditingProduct(prev => prev ? { ...prev, [key]: value } : null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Products</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add New Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-2xl">🍿</span>
                      )}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">₹{product.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded">
        Please keep your price genuine to sell your stuff early and avoid it becoming trash!
      </div>

      {(showAddModal || editingProduct) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-medium mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const product = {
                name: formData.get('name') as string,
                price: Number(formData.get('price')),
                description: formData.get('description') as string,
                category: formData.get('category') as string,
                image: imagePreview || formData.get('image') as string,
                hostel: formData.get('hostel') as string,
                condition: Number(formData.get('condition')),
                academicYear: formData.get('academicYear') as string,
              };
              
              if (editingProduct) {
                handleEditProduct({ ...product, id: editingProduct.id });
              } else {
                handleAddProduct(product);
              }
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingProduct?.name}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={editingProduct?.price}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingProduct?.description}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    name="category"
                    defaultValue={editingProduct?.category}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  >
                    <option value="Chips & Crisps">Chips & Crisps</option>
                    <option value="Biscuits">Biscuits</option>
                    <option value="Instant Food">Instant Food</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hostel</label>
                  <select
                    value={editingProduct?.hostel || ''}
                    onChange={e => updateEditingProductField('hostel', e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-4"
                    required
                  >
                    <option value="">Select Hostel</option>
                    {hostels.map(h => (
                      <option key={h} value={h}>{h}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Condition</label>
                  <select
                    value={editingProduct?.condition || ''}
                    onChange={e => updateEditingProductField('condition', Number(e.target.value))}
                    className="w-full border rounded px-3 py-2 mb-4"
                    required
                  >
                    <option value="">Select Condition</option>
                    <option value="5">5 - Very Good / Unused</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Used</option>
                    <option value="1">1 - Very Used</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Academic Year</label>
                  <select
                    value={editingProduct?.academicYear || ''}
                    onChange={e => updateEditingProductField('academicYear', e.target.value)}
                    className="w-full border rounded px-3 py-2 mb-4"
                    required
                  >
                    <option value="">Select Academic Year</option>
                    {academicYearOptions.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Image</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100"
                    />
                    {uploading && (
                      <div className="text-sm text-gray-500">Uploading...</div>
                    )}
                  </div>
                  <input
                    type="hidden"
                    name="image"
                    value={imagePreview || editingProduct?.image || ''}
                  />
                  {(imagePreview || editingProduct?.image) && (
                    <div className="mt-2">
                      <Image
                        src={imagePreview || editingProduct?.image || ''}
                        alt="Preview"
                        width={200}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                    setImagePreview(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  {editingProduct ? 'Save Changes' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
