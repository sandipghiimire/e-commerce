"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function ListView() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const data = await res.json();
      setCategories(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <span className="sr-only">Loading categories...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button
          onClick={fetchCategories}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden w-full">
      {/* Header */}
      <div className="p-4 grid grid-cols-3 gap-4 items-center bg-slate-200">
        <h3 className="font-semibold text-black">Icon</h3>
        <h3 className="font-semibold text-black">Name</h3>
        <h3 className="font-semibold text-black">Slug</h3>
      </div>

      {/* Content */}
      <div className="divide-y divide-gray-100">
        {categories.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No categories found
          </div>
        ) : (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="grid grid-cols-3 gap-4 items-center p-4 hover:bg-gray-100 transition-colors"
            >
              {/* Image with error handling */}
              <div className="flex items-center">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-10 h-10 rounded-lg object-cover border"
                    onError={(e) => {
                      e.target.src = '/placeholder.svg';
                      e.target.classList.add('bg-gray-100');
                    }}
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No image</span>
                  </div>
                )}
              </div>

              <p className="font-medium text-gray-800 truncate">{cat.name}</p>
              <p className="text-sm text-gray-500 truncate">{cat.slug}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}