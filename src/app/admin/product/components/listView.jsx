"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit2, Loader2, Trash2, Trash2Icon } from "lucide-react";

export default function ListView() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchbrand = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/products");
            if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
            const data = await res.json();
            console.log(data)
            setProduct(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            toast.error("Failed to load brand");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchbrand();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="sr-only">Loading brand...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8">
                <p className="text-red-500 mb-4">Error: {error}</p>
                <button
                    onClick={fetchbrand}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    async function deleteData(id) {
        if (!confirm("Do you want to delete this user?")) return;
        try {
            const response = await fetch("http://localhost:3000/api/products", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            const data = await response.json();
            toast.success("Deleted successfully!");
            fetchbrand(id); // Refresh list after delete
        } catch (error) {
            console.log("Error deleting user!", error);
        }
    }


    return (
        <div className="rounded-lg overflow-hidden w-full">
            {/* Header */}
            <div className="grid grid-cols-8 border-separate border-spacing-y-3 mb-2">
                <h3 className="font-semibold text-black px-3 py-2 bg-white">SN</h3>
                <h3 className="font-semibold text-black px-3 py-2 bg-white">Image</h3>
                <h3 className="font-semibold text-black px-3 py-2 bg-white">Title</h3>
                <h3 className="font-semibold text-black px-3 py-2 bg-white">Price</h3>
                <h3 className="font-semibold text-black px-3 py-2 bg-white">Stock</h3>
                <h3 className="font-semibold text-black px-3 py-2 bg-white">Order</h3>
                <h3 className="font-semibold text-black px-3 py-2 bg-white">Status</h3>
                <h3 className="font-semibold text-black px-3 py-2 bg-white">Action</h3>
            </div>

            {/* Content */}
            {product?.map((items, index) => {
                return (
                    <div className="grid grid-cols-8 overflow-hidden">
                        <p className="bg-white px-6 py-2">{index + 1}</p>
                        {/* <p className="bg-white px-6 py-2">{items.image}</p> */}
                        <p className="bg-white">
                            {items.featureImage ? (
                                <img
                                    src={items.featureImage}
                                    alt={items.title}
                                    className="w-10 h-10 mt-3 rounded object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 bg-gray-200 rounded" />
                            )}
                        </p>
                        <p className="bg-white pr-5 py-2">{items.title}</p>
                        <div className="flex flex-row gap-3 px-2 py-2 bg-white">
                            {items?.sale > items?.saleprice && <p className="font-extralight text-sm text-slate-400 line-through">रु {items.sale}</p>}
                            <p className="">रु {items.saleprice}</p>
                        </div>
                        <p className="bg-white px-6 py-2">{items.stock}</p>
                        <p className="bg-white px-6 py-2">{items?.orders ?? 0}</p>
                        <p className="bg-white px-3 py-2">
                            <div className="flex">
                            {items?.stock - (items?.orders ?? 0) > 0 && <div className="bg-green-100 text-xs text-green-500 font-bold rounded-lg px-2 py-1">Available</div>}
                            {items?.stock - (items?.orders ?? 0) <= 0 && <div className="bg-red-100 text-xs text-red-500 font-bold rounded-lg px-2 py-1">Out of Stock</div>}
                            </div>
                        </p>
                        <div className="bg-white  py-2">
                            <button className="bg-blue-600 mr-3 px-4 py-2 text-white rounded-lg"><Edit2 className="w-5 h-5" /></button>
                            <button className="bg-red-600 mr-3 px-4 py-2 text-white rounded-lg" onClick={() => deleteData(items._id)}><Trash2Icon className="w-5 h-5" /></button>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}