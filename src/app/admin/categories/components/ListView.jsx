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
    <div className="rounded-lg shadow-sm overflow-hidden w-full">
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 items-center border-separate">
        <h3 className="font-semibold text-black px-3 py-2 bg-white">SN</h3>
        <h3 className="font-semibold text-black px-3 py-2 bg-white">Icon</h3>
        <h3 className="font-semibold text-black px-3 py-2 bg-white">Name</h3>
        <h3 className="font-semibold text-black px-3 py-2 bg-white">Action</h3>
      </div>

      {/* Content */}
      {categories?.map((items, index)=>{
        return (
            <div className="grid grid-cols-4 p-5">
                {index+1}
                <p>{items.image}</p>
                <p>{items.name}</p>
            </div>
        )
      })}
    </div>
  );
}