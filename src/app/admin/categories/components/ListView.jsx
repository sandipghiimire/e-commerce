"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit2, Loader2, Trash2, Trash2Icon } from "lucide-react";

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
            console.log(data)
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

    const handleDelete = async (id) => {
        if (!confirm("Delete this category?")) return;

        const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
        const json = await res.json();

        if (res.ok) {
            // remove from state or re-fetch
            toast.success("Delete Successfully!")
            console.log(json.message);
        } else {
            toast.error("Delete Filed")
            console.error("Delete failed:", json.message);
        }
    };


    return (
        <div className="rounded-lg overflow-hidden w-full">
            {/* Header */}
            <div className="grid grid-cols-4 border-separate border-spacing-y-3 mb-2">
                <h3 className="font-semibold text-black px-3 py-2 bg-white">SN</h3>
                <h3 className="font-semibold text-black px-3 py-2 bg-white">Icon</h3>
                <h3 className="font-semibold text-black px-3 py-2 bg-white">Name</h3>
                <h3 className="font-semibold text-black px-3 py-2 bg-white">Action</h3>
            </div>

            {/* Content */}
            {categories?.map((items, index) => {
                return (
                    <div className="grid grid-cols-4 overflow-hidden">
                        <p className="bg-white px-6 py-2">{index + 1}</p>
                        {/* <p className="bg-white px-6 py-2">{items.image}</p> */}
                        <p className="bg-white">
                            {items.image ? (
                                <img
                                    src={items.image}
                                    alt={items.name}
                                    className="w-15 h-15 rounded object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded" />
                            )}
                        </p>
                        <p className="bg-white px-6 py-2">{items.name}</p>
                        <div className="bg-white  py-2">
                            <button className="bg-blue-600 mr-3 px-4 py-2 text-white rounded-lg"><Edit2 className="w-5 h-5" /></button>
                            <button className="bg-red-600 mr-3 px-4 py-2 text-white rounded-lg" onClick={handleDelete}><Trash2Icon className="w-5 h-5" /></button>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}