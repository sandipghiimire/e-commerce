// components/ProductCard.js
import React from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";

const ProductCard = ({ product }) => {
  const discount = product.sale > product.saleprice 
    ? Math.round(((product.sale - product.saleprice) / product.sale) * 100)
    : 0;
  
  // Render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={`${
            i <= Math.floor(rating)
              ? "text-amber-400 fill-amber-400"
              : i - 0.5 <= rating
              ? "text-amber-400 fill-amber-400"
              : "text-gray-300"
          }`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
      <Link href={`/products/${product._id}`}>
        <div className="relative">
          <div className="bg-gray-100 h-60 flex items-center justify-center p-4">
            {product.featureImage ? (
              <img 
                src={product.featureImage} 
                alt={product.title}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-400">
                Product Image
              </div>
            )}
          </div>
          
          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              {discount}% OFF
            </div>
          )}
          
          <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-red-50">
            <Heart className="text-gray-400 hover:text-red-500" size={20} />
          </button>
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
          {product.shortDescription}
        </p>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              रु {product.saleprice.toLocaleString()}
            </h2>
            {product.sale > product.saleprice && (
              <span className="text-sm text-gray-500 line-through">
                रु {product.sale.toLocaleString()}
              </span>
            )}
          </div>
          
          <button className="p-2.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
            <ShoppingCart size={20} />
          </button>
        </div>
        
        <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;