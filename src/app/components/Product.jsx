import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Rating } from "@mui/material";
import Link from "next/link";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products");
        const data = await res.json();
        console.log("Product Details",data)
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false); // ✅ stop loading whether success or fail
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <h1 className="text-2xl font-semibold p-3">Products List</h1>
      </div>

      {/* ✅ Loading Spinner or Text */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <span className="text-gray-600 text-lg animate-pulse">Loading products...</span>
        </div>
      ) : (
        <div className="w-full flex justify-center pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((item) => (
              <div
                key={item._id}
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
                  <Link href={`/products/${item?._id}`}>
                    <h3 className="font-semibold text-lg">{item?.title}</h3>
                  </Link>
                  <div>
                    <h2 className="text-green-600">
                      रु {item?.saleprice}
                      <span className="line-through text-sm text-red-600 ml-1">
                        रु {item?.sale}
                      </span>
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item?.description}
                  </p>
                  <div className="flex gap-3 items-center">
                    <Rating
                      name="product-rating"
                      defaultValue={2.5}
                      precision={0.5}
                      readOnly
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
      )}
    </div>
  );
}
