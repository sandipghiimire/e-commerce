"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChevronLeft, ChevronRight, Edit2, Loader2, Trash2, Trash2Icon } from "lucide-react";
import Link from "next/link";

export default function ListView() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(7);

    const fetchbrand = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/products");
            if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
            const data = await res.json();
            // console.log(data)
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
    

    // Pagination calculations
    const totalPages = Math.ceil(product.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = product.slice(startIndex, endIndex);

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

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
            const response = await fetch("/api/products", {
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
        <div className="overflow-x-auto w-full">
            <table className="w-full border-separate border-spacing-y-3 rounded-xl">
                {/* Header */}
                <thead>
                    <tr>
                        <th className="font-semibold text-black px-3 py-2 bg-white">SN</th>
                        <th className="font-semibold text-black px-3 py-2 bg-white text-left">Image</th>
                        <th className="font-semibold text-black px-3 py-2 bg-white text-left">Title</th>
                        <th className="font-semibold text-black px-3 py-2 bg-white text-left">Price</th>
                        <th className="font-semibold text-black px-3 py-2 bg-white text-left">Stock</th>
                        <th className="font-semibold text-black px-3 py-2 bg-white text-left">Order</th>
                        <th className="font-semibold text-black px-3 py-2 bg-white text-left">Status</th>
                        <th className="font-semibold text-black px-3 py-2 bg-white text-left">Action</th>
                    </tr>
                </thead>

                {/* Content */}
                <tbody>
                    {currentProducts?.map((items, index) => (
                        <tr key={items._id} className="overflow-hidden">
                            <td className="bg-white px-6 py-2">{index + 1}</td>
                            <td className="bg-white px-3 py-2">
                                {items.featureImage ? (
                                    <img
                                        src={items.featureImage}
                                        alt={items.title}
                                        className="w-10 h-10 mt-3 rounded object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 bg-gray-200 rounded" />
                                )}
                            </td>
                            <td className="bg-white pr-5 py-2 whitespace-nowrap">
                                {items.title}
                                {items?.isFeature && (
                                    <span className="ml-2 inline-block bg-purple-900 text-white text-xs px-2 py-1 rounded">
                                        Feature
                                    </span>
                                )}
                            </td>

                            <td className="bg-white px-3 py-2">
                                <div className="flex gap-3 items-center">
                                    {items?.sale > items?.saleprice && (
                                        <p className="font-extralight text-sm text-slate-400 line-through whitespace-nowrap">
                                            रु {items.sale}
                                        </p>
                                    )}
                                    <p className="whitespace-nowrap">रु {items.saleprice}</p>
                                </div>
                            </td>
                            <td className="bg-white px-6 py-2">{items.stock}</td>
                            <td className="bg-white px-6 py-2">{items?.orders ?? 0}</td>
                            <td className="bg-white px-3 py-2">
                                <div className="flex">
                                    {items?.stock - (items?.orders ?? 0) > 0 ? (
                                        <span className="bg-green-100 text-xs text-green-500 font-bold rounded-lg px-2 py-1 whitespace-nowrap">
                                            Available
                                        </span>
                                    ) : (
                                        <span className="bg-red-100 text-xs text-red-500 font-bold rounded-lg px-2 py-1 whitespace-nowrap">
                                            Out of Stock
                                        </span>
                                    )}
                                </div>
                            </td>
                            <td className="bg-white px-3 py-2">
                                <div className="flex">
                                    <button className="bg-blue-600 mr-3 px-4 py-2 text-white rounded-lg">
                                        <Link href={`/admin/product/${items._id}`}><Edit2 className="w-5 h-5" /></Link>
                                    </button>
                                    <button
                                        className="bg-red-600 px-4 py-2 text-white rounded-lg"
                                        onClick={() => deleteData(items._id)}
                                    >
                                        <Trash2Icon className="w-5 h-5" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4 px-4">
                <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="bg-gray-200 px-3 py-2 rounded-lg flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                </button>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                    </span>
                    <select
                        name="perpage"
                        id="perpage"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2"
                    >
                        <option value="7">7 per page</option>
                        <option value="14">14 per page</option>
                        <option value="50">50 per page</option>
                        <option value="100">100 per page</option>
                        <option value="500">500 per page</option>
                    </select>
                </div>

                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="bg-gray-200 px-3 py-2 rounded-lg flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}