"use client"
import { Button } from "@mui/material";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function Details({ details }) {
    return (
        <div className="w-full flex flex-col gap-3">
            <div className="flex flex-row gap-3">
                <Category categories={details?.categories?._id} />
                <Brand brands={details?.brand?._id} />
            </div>
            <h1 className="font-semibold text-xl md:text-4xl">{details?.title}</h1>
            <h1 className="text-gray-600 text-sm line-clamp-3">{details?.shortDescription}</h1>
            <h1 className="text-green-600 text-lg">रु {details?.saleprice}{" "}
                <span className="line-through text-sm text-red-600">रु {details?.sale}</span>
            </h1>
            <div className="flex flex-row gap-3">
                <button className="bg-blue-600 px-4 py-2 rounded-lg text-white">Buy Now</button>
                <button className="bg-white px-4 py-2 rounded-lg text-blue-600 ring-2 ring-slate-200">Add to Cart</button>
                <div className="flex justify-center items-center ring-2 ring-red-400 px-3 py-2 rounded-lg text-red-600">
                    <Heart size={20} />
                </div>

            </div>
            <div className="mt-2 flex">
                {details?.stock > 0 ? (
                    <p className="text-green-600"></p>
                ) : (
                    <p className="text-red-600 text-xs rounded-lg bg-red-300 px-2 py-1">Out of Stock</p>
                )}
            </div>
            <div className="flex flex-col gap-3 py-5">
                <div
                    className="text-gray-600 line-clamp-13"
                    dangerouslySetInnerHTML={{ __html: details?.description ?? "" }}></div>
            </div>
        </div>
    )
}

function Category({ categories }) {
    const [categori, setCategory] = useState({});
    useEffect(() => {
        const data = async () => {
            try {
                const res = await fetch(`/api/categories/${categories}`);
                const cateData = await res.json();
                setCategory(cateData);
            } catch (error) {
                toast.error("Failed to fetch category");
            }
        };
        if (categories) data();
    }, [categories]);

    return (
        <div>
            <Link href={`/categories/${categori?._id}`}>
                <div className="flex items-center gap-1 ring-1 ring-gray-200 bg-blue-50 px-3 py-1 rounded-full">
                    <img className="h-4 w-4" src={categori?.image} alt="" />
                    <h4 className="text-xs font-semibold">{categori?.name}</h4>
                </div>
            </Link>
        </div>
    )
}

function Brand({ brands }) {
    const [brnad, setBrand] = useState({});
    useEffect(() => {
        const data = async () => {
            try {
                const res = await fetch(`/api/brand/${brands}`);
                const brandData = await res.json();
                setBrand(brandData);
            } catch (error) {
                toast.error("Failed to fetch category");
            }
        };
        if (brands) data();
    }, [brands]);

    return (
        <Link href={`/brands/${brnad?._id}`}>
        <div className="flex items-center gap-1 ring-gray-200 bg-blue-50 px-3 py-1 rounded-full">
            <img className="h-4 w-4" src={brnad?.image} alt="" />
            <h4 className="text-xs font-semibold">{brnad?.name}</h4>
        </div>
        </Link>
    )
}