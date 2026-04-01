import React from 'react';

type Product = {
  title: string;
  brand: string;
  description: string;
  price: number;
  condition: string;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => (
  <div className="p-4">
    <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
    <p className="text-sm text-gray-500 mb-2">{product.brand}</p>
    <p className="text-gray-600 mb-2">{product.description}</p>
    <div className="flex justify-between items-center">
      <span className="text-lg font-bold text-blue-600">₹{product.price}</span>
      <span className="text-sm text-gray-500">{product.condition}</span>
    </div>
  </div>
);

export default ProductCard; 
