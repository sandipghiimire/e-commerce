'use client';
// pages/products/index.js
import React, { useState, useEffect } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 300000,
    rating: 0,
    sort: "featured"
  });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/products");
        const data = await response.json();
        
        // Add random ratings and review counts for UI purposes
        const productsWithDetails = data.map(product => ({
          ...product,
          rating: 4.2 + (Math.random() * 0.8), // Random rating between 4.2-5.0
          reviewCount: Math.floor(Math.random() * 100) + 10 // Random reviews between 10-110
        }));
        
        setProducts(productsWithDetails);
        setFilteredProducts(productsWithDetails);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (filters.category) {
      result = result.filter(product => 
        product.category === filters.category
      );
    }
    
    // Apply price filter
    result = result.filter(product => 
      product.saleprice >= filters.minPrice && 
      product.saleprice <= filters.maxPrice
    );
    
    // Apply rating filter
    if (filters.rating > 0) {
      result = result.filter(product => 
        product.rating >= filters.rating
      );
    }
    
    // Apply sorting
    switch (filters.sort) {
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
  }, [filters, products]);

  // Get unique categories
  const categories = [...new Set(products.map(product => product.category))];
  
  // Render stars for rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i <= Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-22">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover Our Products</h1>
              <p className="text-xl max-w-2xl mx-auto mb-10">
                Explore our curated collection of premium products designed to enhance your lifestyle
              </p>
              <div className="relative max-w-2xl mx-auto">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="w-full py-4 px-6 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-white/70"
                />
                <button className="absolute right-2 top-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Filters and Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Mobile Filters Button */}
          <div className="md:hidden flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Products</h2>
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg"
            >
              <Filter size={18} /> Filters
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className={`md:w-1/4 ${isMobileFiltersOpen ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto' : 'hidden md:block'}`}>
              {isMobileFiltersOpen && (
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button onClick={() => setIsMobileFiltersOpen(false)}>
                    <X size={24} />
                  </button>
                </div>
              )}
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-8">
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    <button 
                      className={`w-full text-left px-3 py-2 rounded-lg ${!filters.category ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                      onClick={() => setFilters({...filters, category: ""})}
                    >
                      All Categories
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`w-full text-left px-3 py-2 rounded-lg ${filters.category === category ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                        onClick={() => setFilters({...filters, category})}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-semibold mb-3">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">रु 0</span>
                      <span className="text-gray-600">रु 300000</span>
                    </div>
                    <input 
                      type="range" 
                      min="0"
                      max="300000"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between">
                      <span className="font-medium">रु 0 - रु {filters.maxPrice}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-semibold mb-3">Rating</h3>
                  <div className="space-y-2">
                    {[4, 3, 2].map((rating) => (
                      <button
                        key={rating}
                        className={`w-full text-left px-3 py-2 rounded-lg flex items-center ${filters.rating === rating ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
                        onClick={() => setFilters({...filters, rating: filters.rating === rating ? 0 : rating})}
                      >
                        <div className="flex mr-2">
                          {renderStars(rating)}
                        </div>
                        <span>& Up</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {isMobileFiltersOpen && (
                  <button 
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium"
                    onClick={() => setIsMobileFiltersOpen(false)}
                  >
                    Apply Filters
                  </button>
                )}
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="md:w-3/4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <p className="text-gray-600">
                  {isLoading ? "Loading products..." : `Showing ${filteredProducts.length} products`}
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <label className="mr-2 text-gray-600">Sort by:</label>
                    <div className="relative">
                      <select 
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8"
                        value={filters.sort}
                        onChange={(e) => setFilters({...filters, sort: e.target.value})}
                      >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                    </div>
                  </div>
                </div>
              </div>
              
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-48 mb-4"></div>
                      <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded-full w-full mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded-full w-5/6 mb-6"></div>
                      <div className="h-10 bg-gray-200 rounded-lg"></div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                  <div className="text-5xl mb-4">😕</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    We couldn't find any products matching your filters. Try adjusting your search criteria.
                  </p>
                  <button 
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                    onClick={() => setFilters({
                      category: "",
                      minPrice: 0,
                      maxPrice: 300000,
                      rating: 0,
                      sort: "featured"
                    })}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center gap-1">
                      <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                        1
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition-colors">
                        2
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition-colors">
                        3
                      </button>
                      <span className="px-3 py-2 text-gray-500">...</span>
                      <button className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition-colors">
                        8
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-white text-gray-700 hover:bg-gray-100 transition-colors">
                        Next
                      </button>
                    </nav>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;