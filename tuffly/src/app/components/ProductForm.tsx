'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { categories } from '@/data/categories';
import Image from 'next/image';
import { FaUpload, FaTrash, FaPlus, FaFileAlt, FaImage, FaVideo } from 'react-icons/fa';

const hostels = [
  "Cauvery",
  "Krishna",
  "Diamond Jubilee",
  "M Vishveshvaraya",
  "Cauvery Annex",
  "Krishna Annex",
  "Krishna Garden",
  "Millenium"
];
const wings = ["A", "B", "C", "D"];
const conditions = [
  { value: 'brand-new', label: 'Brand New' },
  { value: 'like-new', label: 'Like New' },
  { value: 'lightly-used', label: 'Lightly Used' },
  { value: 'well-used', label: 'Well Used' },
  { value: 'heavily-used', label: 'Heavily Used' },
];

interface AdditionalMaterial {
  id: string;
  type: 'ppt' | 'report' | 'poster' | 'other';
  title: string;
  description: string;
  file?: File;
}

export default function ProductForm() {
  const router = useRouter();
  const { addProduct } = useData();
  const { user } = useAuth();
  
  // Basic product info
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0].slug);
  const [condition, setCondition] = useState(conditions[0].value);
  
  // Listing type
  const [listingType, setListingType] = useState<'sell' | 'rent'>('sell');
  
  // Pricing
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [securityDeposit, setSecurityDeposit] = useState('');
  
  // Location
  const [hostel, setHostel] = useState(hostels[0]);
  const [wing, setWing] = useState(wings[0]);
  const [room, setRoom] = useState('');
  
  // Media
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  // Additional materials
  const [additionalMaterials, setAdditionalMaterials] = useState<AdditionalMaterial[]>([]);
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [newMaterial, setNewMaterial] = useState<Partial<AdditionalMaterial>>({
    type: 'ppt',
    title: '',
    description: ''
  });

  const mapCondition = (cond: string): 'new' | 'used' | 'refurbished' => {
    if (cond === 'brand-new' || cond === 'like-new') return 'new';
    if (cond === 'lightly-used' || cond === 'well-used' || cond === 'heavily-used') return 'used';
    return 'used';
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  };

  const addMaterial = () => {
    if (newMaterial.title && newMaterial.type) {
      const material: AdditionalMaterial = {
        id: Date.now().toString(),
        type: newMaterial.type as 'ppt' | 'report' | 'poster' | 'other',
        title: newMaterial.title,
        description: newMaterial.description || ''
      };
      setAdditionalMaterials([...additionalMaterials, material]);
      setNewMaterial({ type: 'ppt', title: '', description: '' });
      setShowMaterialForm(false);
    }
  };

  const removeMaterial = (id: string) => {
    setAdditionalMaterials(additionalMaterials.filter(m => m.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !category || !room) {
      alert('Please fill in all required fields.');
      return;
    }

    // Validate security deposit for lending projects
    if (listingType === 'rent' && category === 'lending-projects' && !securityDeposit) {
      alert('Security deposit is required for lending projects.');
      return;
    }

    const imageUrls = imagePreviews.length > 0 ? imagePreviews : ['/images/products/placeholder.png'];
    const newProduct = {
      title,
      description,
      price: parseFloat(price),
      mrp: mrp ? parseFloat(mrp) : undefined,
      securityDeposit: securityDeposit ? parseFloat(securityDeposit) : undefined,
      category,
      brand: '',
      condition: mapCondition(condition),
      images: imageUrls,
      listingType,
      additionalMaterials: additionalMaterials.map(m => ({
        type: m.type,
        title: m.title,
        description: m.description
      })),
      seller: user ? {
        id: user.id,
        name: user.name,
        profilePicture: user.profilePicture || '',
        isVerified: user.isVerified || false,
      } : {
        id: 'default-seller',
        name: 'Default Seller',
        profilePicture: '',
        isVerified: false,
      },
      location: `${user?.hostel} - ${wing} Wing - Room ${room}`,
      floor: '',
      isRentable: listingType === 'rent',
      isAvailable: false, // Requires admin approval unless user is verified
      requiresApproval: !user?.isVerified,
      createdAt: new Date(),
    };
    addProduct(newProduct);
    alert('Product submitted successfully! It will be reviewed by admin before going live.');
    router.push('/');
  };

   const formInputStyle = "w-full p-3 bg-slate-700 rounded-lg text-gray-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500";
  const formLabelStyle = "block text-sm font-medium text-slate-700 mb-1";

  const isLendingProject = category === 'lending-projects';

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-4 sm:p-8 bg-slate-800 rounded-xl shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">List Your Item</h2>
      
      {/* Listing Type Selection */}
      <div className="bg-slate-700 p-4 rounded-lg">
        <label className={formLabelStyle}>Listing Type</label>
        <div className="flex gap-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="listingType"
              value="sell"
              checked={listingType === 'sell'}
              onChange={(e) => setListingType(e.target.value as 'sell' | 'rent')}
              className="text-purple-500"
            />
            <span className="text-gray-100">Sell</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="listingType"
              value="rent"
              checked={listingType === 'rent'}
              onChange={(e) => setListingType(e.target.value as 'sell' | 'rent')}
              className="text-purple-500"
            />
            <span className="text-gray-100">Rent</span>
          </label>
        </div>
      </div>

      {/* Basic Product Info */}
      <div>
        <label htmlFor="title" className={formLabelStyle}>Title</label>
        <input 
          id="title" 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="e.g., Study Lamp" 
          className={formInputStyle} 
          required 
        />
      </div>

      <div>
        <label htmlFor="description" className={formLabelStyle}>Description</label>
        <textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Describe your item..." 
          className={formInputStyle} 
          rows={4}
        ></textarea>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label htmlFor="category" className={formLabelStyle}>Category</label>
          <select 
            id="category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className={formInputStyle}
          >
            {categories.map(cat => (
              <option key={cat.slug} value={cat.slug}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="condition" className={formLabelStyle}>Condition</label>
          <select 
            id="condition" 
            value={condition} 
            onChange={(e) => setCondition(e.target.value)} 
            className={formInputStyle}
          >
            {conditions.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Pricing Section */}
      <fieldset className="p-4 border border-slate-700 rounded-lg">
        <legend className="text-lg font-semibold text-gray-900 px-2">Pricing</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-2">
          <div>
            <label htmlFor="price" className={formLabelStyle}>
              {listingType === 'sell' ? 'Selling Price (₹)' : 'Rental Price (₹/day)'}
            </label>
            <input 
              id="price" 
              type="number" 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              placeholder={listingType === 'sell' ? "e.g., 300" : "e.g., 50"} 
              className={formInputStyle} 
              required 
            />
          </div>
      <div>
            <label htmlFor="mrp" className={formLabelStyle}>MRP (₹)</label>
            <input 
              id="mrp" 
              type="number" 
              value={mrp} 
              onChange={(e) => setMrp(e.target.value)} 
              placeholder="e.g., 500" 
              className={formInputStyle} 
            />
          </div>
        </div>
        
        {/* Security Deposit for Lending Projects */}
        {listingType === 'rent' && isLendingProject && (
          <div className="mt-4">
            <label htmlFor="securityDeposit" className={formLabelStyle}>Security Deposit (₹) *</label>
            <input 
              id="securityDeposit" 
              type="number" 
              value={securityDeposit} 
              onChange={(e) => setSecurityDeposit(e.target.value)} 
              placeholder="e.g., 1000" 
              className={formInputStyle} 
              required
            />
            <p className="text-xs text-gray-400 mt-1">* Required for lending projects</p>
      </div>
        )}
      </fieldset>
      
      {/* Location */}
      <fieldset className="p-4 border border-slate-700 rounded-lg">
        <legend className="text-lg font-semibold text-gray-900 px-2">Location</legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-2">
          <div>
            <label htmlFor="hostel" className={formLabelStyle}>Hostel</label>
            <select 
              id="hostel" 
              value={hostel} 
              onChange={(e) => setHostel(e.target.value)} 
              className={formInputStyle}
            >
              {hostels.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="wing" className={formLabelStyle}>Wing</label>
            <select 
              id="wing" 
              value={wing} 
              onChange={(e) => setWing(e.target.value)} 
              className={formInputStyle}
            >
              {wings.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="room" className={formLabelStyle}>Room No.</label>
            <input 
              id="room" 
              type="text" 
              value={room} 
              onChange={(e) => setRoom(e.target.value)} 
              placeholder="e.g., 101" 
              className={formInputStyle} 
              required 
            />
          </div>
        </div>
      </fieldset>
      
      {/* Product Images */}
      <div>
        <label className={formLabelStyle}>Product Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {imagePreviews.map((src, idx) => (
            <div key={idx} className="relative w-20 h-20">
              <Image src={src} alt={`Preview ${idx + 1}`} fill className="object-cover rounded-lg border" />
            </div>
          ))}
        </div>
      </div>

      {/* Additional Materials */}
      <fieldset className="p-4 border border-slate-700 rounded-lg">
        <legend className="text-lg font-semibold text-gray-900 px-2 flex items-center gap-2">
          <FaFileAlt className="text-purple-500" />
          Additional Materials (PPT, Reports, Posters)
        </legend>
        
        {additionalMaterials.length > 0 && (
          <div className="space-y-2 mb-4">
            {additionalMaterials.map((material) => (
              <div key={material.id} className="flex items-center justify-between p-3 bg-slate-600 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-100">{material.title}</span>
                  <span className="ml-2 text-xs text-gray-400">({material.type})</span>
                  {material.description && (
                    <p className="text-xs text-gray-400 mt-1">{material.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeMaterial(material.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <FaTrash size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {showMaterialForm ? (
          <div className="space-y-3 p-3 bg-slate-600 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-300">Type</label>
                <select
                  value={newMaterial.type}
                  onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value as any})}
                  className="w-full p-2 bg-slate-700 rounded text-gray-100 text-sm"
                >
                  <option value="ppt">PPT</option>
                  <option value="report">Report</option>
                  <option value="poster">Poster</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-300">Title</label>
                <input
                  type="text"
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                  placeholder="Material title"
                  className="w-full p-2 bg-slate-700 rounded text-gray-100 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-300">Description (Optional)</label>
              <input
                type="text"
                value={newMaterial.description}
                onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
                placeholder="Brief description"
                className="w-full p-2 bg-slate-700 rounded text-gray-100 text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={addMaterial}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
              >
                Add Material
              </button>
              <button
                type="button"
                onClick={() => setShowMaterialForm(false)}
                className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowMaterialForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <FaPlus size={14} />
            Add Material
          </button>
        )}
      </fieldset>
      
      {/* Approval Notice */}
      {!user?.isVerified && (
        <div className="p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
          <p className="text-yellow-300 text-sm">
            <strong>Note:</strong> Your listing will be reviewed by admin before going live. 
            Verified users can have their listings published immediately.
          </p>
        </div>
      )}
      
      <button 
        type="submit" 
        className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg hover:opacity-90 transition-transform hover:scale-105 shadow-lg text-base sm:text-lg"
      >
        {listingType === 'sell' ? 'List for Sale' : 'List for Rent'}
      </button>
    </form>
  );
}
