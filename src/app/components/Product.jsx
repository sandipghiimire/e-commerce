"use client";

import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Rating } from "@mui/material";
import Link from "next/link";
import WishlistButton from "./WishlistButton";
import { useAuth } from "../../../context/AuthContext";
import { useCartToggle } from "../lib/hooks/useCartToggle";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const { user } = useAuth();
  const toggleCart = useCartToggle();

  // fetch products
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products", err));
  }, []);

  // initialize cartIds from user.cart when user loads
  useEffect(() => {
    if (user?.cart) {
      setCartIds(user.cart);
    }
  }, [user]);

  const handleCartClick = async (productId) => {
    const newCart = await toggleCart(productId);
    if (newCart) {
      setCartIds(newCart);
    }
  };

  return (
    <div className="mt-10">
      <div className="flex justify-center">
        <h1 className="text-2xl font-semibold p-3">Products List</h1>
      </div>
      <div className="w-full flex justify-center pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => {
            const inCart = cartIds.includes(item._id);
            return (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-lg p-4 transition duration-300 w-72"
              >
                <div className="relative flex items-center justify-center">
                  <img
                    src={item.featureImage}
                    alt={item.title}
                    className="h-40 object-contain"
                  />
                  <WishlistButton productId={item._id} />
                </div>
                <div className="mt-4 space-y-2">
                  <Link href={`/products/${item._id}`}>
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                  <div>
                    <h2 className="text-green-600">
                      रु {item.saleprice}{" "}
                      <span className="line-through text-sm text-red-600">
                        रु {item.sale}
                      </span>
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.shortDescription}
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
                    <button
                      onClick={() => handleCartClick(item._id)}
                      className={`p-2 rounded-lg transition ${
                        inCart
                          ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      aria-label={inCart ? "Remove from cart" : "Add to cart"}
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
