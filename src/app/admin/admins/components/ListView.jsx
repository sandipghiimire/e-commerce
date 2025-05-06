"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Edit2, Loader2, Trash2, Trash2Icon } from "lucide-react";

export default function ListView() {
    const [admins, setadmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchadmins = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admins");
            if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
            const data = await res.json();
            console.log(data)
            setadmins(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            toast.error("Failed to load admins");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchadmins();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="sr-only">Loading admins...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8">
                <p className="text-red-500 mb-4">Error: {error}</p>
                <button
                    onClick={fetchadmins}
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
            const response = await fetch("/api/admins", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            const data = await response.json();
            toast.success("Deleted successfully!");
            fetchadmins(id); // Refresh list after delete
        } catch (error) {
            console.log("Error deleting user!", error);
        }
    }


    return (
        <div className="rounded-lg overflow-hidden w-full">
            <div className="overflow-x-auto">
                <table className="w-full">
                    {/* Header */}
                    <thead className="bg-gray-50">
                        <tr className="border-b border-gray-300">
                            <th className="px-4 py-3 font-semibold text-black text-left">SN</th>
                            <th className="px-4 py-3 font-semibold text-black text-left">Icon</th>
                            <th className="px-4 py-3 font-semibold text-black text-left">Name</th>
                            <th className="px-4 py-3 font-semibold text-black text-left">Action</th>
                        </tr>
                    </thead>

                    {/* Scrollable Body */}
                    <tbody className="divide-y divide-gray-100">
                        {admins?.map((items, index) => (
                            <tr key={items._id} className="hover:bg-gray-50 transition-colors">
                                {/* SN */}
                                <td className="px-4 py-3">{index + 1}</td>

                                {/* Image */}
                                <td className="px-4 py-2">
                                    <div className="flex items-center">
                                        {items.image ? (
                                            <img
                                                src={items.image}
                                                alt={items.name}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-200 rounded-full" />
                                        )}
                                    </div>
                                </td>

                                {/* Name + Email */}
                                <td className="px-4 py-2">
                                    <h1 className="font-medium">{items.name}</h1>
                                    <p className="text-sm text-gray-500 italic">{items.email}</p>
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <button
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                            aria-label="Edit"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                            onClick={() => deleteData(items._id)}
                                            aria-label="Delete"
                                        >
                                            <Trash2Icon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}