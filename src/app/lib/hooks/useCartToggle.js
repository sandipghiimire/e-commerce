"use client";

import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useCartToggle() {
  const { user } = useAuth();
  const router = useRouter();

  const toggleCart = async (productId) => {
    if (!user) {
      router.push("/login");
      return null;
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Cart error");

      toast.success(data.added ? "Added to cart" : "Removed from cart");
      return data.cart; // this is the new array of productIds
    } catch (e) {
      toast.error(e.message);
      return null;
    }
  };

  return toggleCart;
}
