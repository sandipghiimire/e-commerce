"use client"
import { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

export default function List() {
    const params = useParams();
    const { id } = params;
    console.log(id)
    const [related, setRelated] = useState([]);
    const [brand, setBrand] = useState("");

    useEffect(() => {
        const data = async () => {
            try {
                const res = await fetch(`/api/brand/${id}`)
                const data = await res.json();
                setBrand(data)
            } catch (error) {
                toast.error(error)
            }
        }
        data();
    }, [])

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();

                if (Array.isArray(data)) {
                    const filteredProducts = data.filter(
                        (product) => product?.brand === id
                    );

                    console.log("This is brands", filteredProducts)

                    setRelated(filteredProducts);
                } else {
                    toast.error("Invalid product data format");
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch related products");
            }
        };

        if (id) {
            fetchRelatedProducts();
        }
    }, [id]);
    return <main className="mt-12">
        <h2 className="text-2xl font-bold mb-6 px-4">{brand.name}</h2>

        {related.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
                <p>No related products found</p>
            </div>
        ) : (
            <div className="flex justify-center w-full">
                <div className="flex pb-4 px-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
                    {related?.map((item) => (
                        <div
                            key={item.id}
                            className="flex-shrink-0 w-[280px] sm:w-full bg-white rounded-xl shadow-sm hover:shadow-md p-4 transition-all duration-300 mr-4 sm:mr-0"
                        >
                            {/* Product Image */}
                            <div className="relative aspect-square rounded-lg group">
                                <img
                                    src={item?.featureImage || '/placeholder-product.jpg'}
                                    alt={item?.title}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 280px, 50vw"
                                />

                                {/* Wishlist Button */}
                                <button className="absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm bg-white/30 hover:bg-white/50 transition-colors">
                                    <Heart size={20} className="text-pink-600" />
                                </button>
                            </div>

                            {/* Product Details */}
                            <div className="pt-4 space-y-3">
                                <Link href={`/products/${item?._id}`}>
                                    <h3 className="font-medium text-lg hover:text-blue-600 transition-colors">
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
                                    />
                                    <span className="text-sm text-gray-500">
                                        ({item?.reviews?.length || 0} reviews)
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-2">
                                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                                        Add to Cart
                                    </button>
                                    <button className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                                        <ShoppingCart size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </main>
}