'use client';

import React, { useState } from 'react';
import { categories as allCategories } from '../../../data/categories';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState(allCategories.map(cat => ({
    name: cat.name,
    image: cat.image || '',
  })));
  const [newCategory, setNewCategory] = useState({ name: '', icon: '', image: '' });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAdd = () => {
    if (!newCategory.name) return;
    setCategories([...categories, newCategory]);
    setNewCategory({ name: '', icon: '', image: '' });
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    const cat = categories[index];
    setNewCategory({
      name: typeof cat.name === 'string' ? cat.name : '',
      icon: 'icon' in cat ? (cat as any).icon || '' : '',
      image: cat.image || '',
    });
  };

  const handleSave = () => {
    if (editingIndex === null) return;
    const updated = [...categories];
    updated[editingIndex] = newCategory;
    setCategories(updated);
    setEditingIndex(null);
    setNewCategory({ name: '', icon: '', image: '' });
  };

  const handleDelete = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={e => setNewCategory({ ...newCategory, name: e.target.value })}
          className="border px-3 py-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Icon (emoji)"
          value={newCategory.icon}
          onChange={e => setNewCategory({ ...newCategory, icon: e.target.value })}
          className="border px-3 py-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newCategory.image}
          onChange={e => setNewCategory({ ...newCategory, image: e.target.value })}
          className="border px-3 py-2 rounded mr-2"
        />
        {editingIndex === null ? (
          <button onClick={handleAdd} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
        ) : (
          <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
        )}
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Icon</th>
            <th className="p-2">Name</th>
            <th className="p-2">Image</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, i) => (
            <tr key={i} className="border-t">
              <td className="p-2 text-center text-xl">{(cat as any).icon || ''}</td>
              <td className="p-2">{cat.name}</td>
              <td className="p-2">
                {cat.image && <img src={cat.image} alt={cat.name} className="w-12 h-12 object-cover rounded" />}
              </td>
              <td className="p-2">
                <button onClick={() => handleEdit(i)} className="text-blue-600 mr-2">Edit</button>
                <button onClick={() => handleDelete(i)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
