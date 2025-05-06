"use client"

import { Heart } from "lucide-react"

export default function WishlistButton({ productId }) {

    const handleClick = () => {
        
    }

    return <button
    onClick={handleClick}
        className="absolute top-2 right-2 bg-pink-100 p-2 rounded-full cursor-pointer">
        <Heart size={18} className="text-pink-600" />
    </button>
}