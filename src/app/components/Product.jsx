"use client";

import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart, Star, ChevronDown, Filter, Search } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { useCartToggle } from "../lib/hooks/useCartToggle";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const toggleCart = useCartToggle();

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/products");
        const data = await response.json();
        
        // Add default rating and review count since API doesn't provide them
        const productsWithDefaults = data.map(product => ({
          ...product,
          rating: 4.2 + (Math.random() * 0.8), // Random rating between 4.2-5.0
          reviewCount: Math.floor(Math.random() * 100) + 10 // Random reviews between 10-110
        }));
        
        setProducts(productsWithDefaults);
        setFilteredProducts(productsWithDefaults);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Initialize cartIds from user.cart when user loads
  useEffect(() => {
    if (user?.cart) {
      setCartIds(user.cart);
    }
  }, [user]);

  const handleCartClick = async (productId) => {
    const newCart = await toggleCart(productId);
    if (newCart) {
      setCartIds(newCart);
    }
  };

  // Handle filtering and sorting
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.saleprice >= priceRange[0] && product.saleprice <= priceRange[1]
    );
    
    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.saleprice - b.saleprice);
        break;
      case "price-high":
        result.sort((a, b) => b.saleprice - a.saleprice);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured order (original order)
        break;
    }
    
    setFilteredProducts(result);
  }, [products, sortOption, priceRange, searchTerm]);

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
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Discover Our Products</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our curated collection of premium products designed to enhance your lifestyle
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-10 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Price Range</span>
          <span className="text-sm font-medium text-blue-600">
            रु {priceRange[0]} - रु {priceRange[1]}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="0"
            max="300000"
            step="100"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="300000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.length === 0 && !isLoading ? (
          <div className="col-span-full text-center py-16">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={36} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We couldn't find any products matching your filters. Try adjusting your search or filters.
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setPriceRange([0, 300000]);
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredProducts.map((item) => {
            const inCart = cartIds.includes(item._id);
            const discount = item.sale > item.saleprice 
              ? Math.round(((item.sale - item.saleprice) / item.sale) * 100)
              : 0;
            
            return (
              <div
                key={item._id}
                className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative">
                  <div className="bg-gray-100 h-60 flex items-center justify-center overflow-hidden">
                    {item.featureImage ? (
                      <img 
                        src={item.featureImage} 
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>
                  
                  {/* Discount Badge */}
                  {discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {discount}% OFF
                    </div>
                  )}
                  
                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-red-50 group-hover:opacity-100 transition-opacity">
                    <Heart className="text-gray-400 hover:text-red-500" size={20} />
                  </button>
                </div>
                
                {/* Product Info */}
                <div className="p-5">
                  <Link href={`/products/${item._id}`}>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.shortDescription}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {renderStars(item.rating)}
                    </div>
                    <span className="text-sm text-gray-500">({item.reviewCount})</span>
                  </div>
                  
                  {/* Pricing */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        रु {item.saleprice.toLocaleString()}
                      </h2>
                      {item.sale > item.saleprice && (
                        <span className="text-sm text-gray-500 line-through">
                          रु {item.sale.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleCartClick(item._id)}
                      className={`p-2.5 rounded-full transition ${
                        inCart
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      aria-label={inCart ? "Remove from cart" : "Add to cart"}
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                  
                  <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                    Buy Now
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            1
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            2
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            3
          </button>
          <span className="px-2 text-gray-500">...</span>
          <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            8
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}