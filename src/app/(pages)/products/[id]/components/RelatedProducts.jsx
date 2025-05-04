"use client";
import { Rating } from "@mui/material";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function RelatedProducts({ categories }) {
    const [related, setRelated] = useState([]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();

                // Ensure data is an array
                if (Array.isArray(data)) {
                    // Filter products based on categories
                    const filteredProducts = data.filter(
                        (product) => product.categories === categories
                    );

                    setRelated(filteredProducts);
                } else {
                    toast.error("Invalid product data format");
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch related products");
            }
        };

        if (categories) {
            fetchRelatedProducts();
        }
    }, [categories]);

    return (
        <main>
            <h2 className="text-xl font-semibold mb-4">Related Products</h2>
            {related.length === 0 ? (
                <p>No related products found.</p>
            ) : (
                <div>
                    <div className="w-full flex">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {related?.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-xl shadow-lg hover:shadow-lg p-4 transition duration-300 w-72"
                                >
                                    <div className="relative flex items-center justify-center">
                                        <img
                                            src={item?.featureImage}
                                            alt={item?.title}
                                            className="h-40 object-contain"
                                        />
                                        <div className="absolute top-2 right-2 bg-pink-100 p-2 rounded-full cursor-pointer">
                                            <Heart size={18} className="text-pink-600" />
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-2">
                                        <Link href={`/products/${item?._id}`}><h3 className="font-semibold text-lg">{item?.title}</h3></Link>
                                        <div>
                                            <h2 className="text-green-600">रु {item?.saleprice}{" "}
                                                <span className="line-through text-sm text-red-600">रु {item?.sale}</span>
                                            </h2>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {item?.description}
                                        </p>
                                        <div className='flex gap-3 items-center'>
                                            <Rating
                                                // size="small"
                                                name="product-rating"
                                                defalutVlaue={2.5}
                                                precision={0.5}
                                                readonly
                                            />
                                            <h1 className="text-gray-300 text-lg">(0)</h1>
                                        </div>
                                        <div className="flex items-center gap-2 pt-2">
                                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                                                Buy Now
                                            </button>
                                            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded-lg">
                                                <ShoppingCart size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
