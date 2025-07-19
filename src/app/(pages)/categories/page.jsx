"use client"
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";

export default function RelatedProducts() {
    const [related, setRelated] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                setIsLoading(true);
                const res = await fetch("/api/products");
                
                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }
                
                const data = await res.json();
                setRelated(data.slice(0, 4)); // Show only 4 related products
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch related products");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRelatedProducts();
    }, []);

    if (isLoading) {
        return (
            <div className="mt-12 pt-23">
                <h2 className="text-2xl font-bold mb-6 px-4">You Might Also Like</h2>
                <div className="flex justify-center w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 w-full">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm p-4">
                                <div className="animate-pulse">
                                    <div className="bg-gray-200 rounded-xl aspect-square w-full" />
                                    <div className="pt-4 space-y-3">
                                        <div className="h-5 bg-gray-200 rounded w-3/4" />
                                        <div className="h-4 bg-gray-200 rounded w-1/2" />
                                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                                        <div className="h-10 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="mt-12 pt-23">
            <h2 className="text-2xl font-bold mb-6 px-4">You Might Also Like</h2>

            {related.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <p>No related products found</p>
                </div>
            ) : (
                <div className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                        {related.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-xl shadow-sm hover:shadow-md p-4 transition-all duration-300"
                            >
                                {/* Product Image */}
                                <div className="relative aspect-square rounded-lg overflow-hidden group">
                                    <Image
                                        src={item?.featureImage || '/placeholder-product.jpg'}
                                        alt={item?.title || "Product image"}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />

                                    {/* Wishlist Button */}
                                    <button 
                                        className="absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm bg-white/30 hover:bg-white/50 transition-colors"
                                        aria-label="Add to wishlist"
                                    >
                                        <Heart size={20} className="text-pink-600" />
                                    </button>
                                </div>

                                {/* Product Details */}
                                <div className="pt-4 space-y-3">
                                    <Link href={`/products/${item?._id}`}>
                                        <h3 className="font-medium text-lg hover:text-blue-600 transition-colors line-clamp-2 min-h-[56px]">
                                            {item?.title}
                                        </h3>
                                    </Link>

                                    {/* Price Section */}
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-xl font-bold text-green-600">
                                            रु {item?.saleprice}
                                        </span>
                                        {item?.sale && (
                                            <span className="line-through text-gray-400">
                                                रु {item?.sale}
                                            </span>
                                        )}
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2">
                                        <Rating
                                            value={item?.rating || 0}
                                            precision={0.5}
                                            readOnly
                                            size="small"
                                            className="text-amber-500"
                                            name={`rating-${item._id}`}
                                        />
                                        <span className="text-sm text-gray-500">
                                            ({item?.reviews?.length || 0} reviews)
                                        </span>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-2">
                                        <button 
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                                            onClick={() => toast.success("Added to cart")}
                                        >
                                            Add to Cart
                                        </button>
                                        <button 
                                            className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                                            aria-label="Quick add to cart"
                                            onClick={() => toast.success("Added to cart")}
                                        >
                                            <ShoppingCart size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}