"use client";
import Link from "next/link";
import { useState } from "react";
import { Heart, Menu, Search, ShoppingCart, UserCircle2, X } from "lucide-react"; // or use any icon library
import Logout from "./LogOut";
import AuthoContextProvider from "../../../context/AuthContext";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const menuList = [
        { name: "Home", link: "/" },
        { name: "About", link: "/about" },
        { name: "Contact", link: "/contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-opacity-60 backdrop-blur-2xl px-6 md:px-20 py-4 flex items-center justify-between shadow-md bg-white">
            <Link href={'/'}><div className="flex justify-center items-center gap-1">
                <img className="h-9" src="/logo-removebg-preview.png" alt="logo" />
                <h1 className="font-semibold hidden md:block">TRIGGER</h1></div></Link>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-4">
                {menuList.map((item, index) => (
                    <Link key={index} href={item.link}>
                        <button className="hover:bg-blue-600 hover:text-white px-5 py-2 rounded-lg">
                            {item.name}
                        </button>
                    </Link>
                ))}
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                <Link href={'/'}>
                    <button title="Search Products" className="h-5 w-5 flex justify-center items-center rounded-full hover:bg-gray-50">
                        <Search size={20} />
                    </button>
                </Link>
                <Link href={'/cart'}>
                    <button title="My Cart" className="h-5 w-5 flex justify-center items-center rounded-full hover:bg-gray-50">
                        <ShoppingCart size={20} />
                    </button>
                </Link>
                <Link href={'/wishlist'}>
                    <button title="Wishlist" className="h-5 w-5 flex justify-center items-center rounded-full hover:bg-gray-50">
                        <Heart size={20} />
                    </button>
                </Link>
                <Link href={'/account'}>
                    <button title="My Account" className="h-5 w-5 flex justify-center items-center rounded-full hover:bg-gray-50">
                        <UserCircle2 size={20} />
                    </button>
                </Link>
                <AuthoContextProvider> 
                    <Logout />
                </AuthoContextProvider>
            </div>

            {/* Mobile Login Button */}
            <div className="md:hidden flex items-center gap-3">
                <Link href="/login">
                    <button className="bg-blue-600 px-4 py-1.5 rounded-full font-bold text-white text-sm">
                        Login
                    </button>
                </Link>
                <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>



            {/* Mobile menu */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-start px-6 py-4 md:hidden z-50">
                    {menuList.map((item, index) => (
                        <Link key={index} href={item.link} onClick={() => setIsOpen(false)}>
                            <span className="py-2 text-gray-700 block">{item.name}</span>
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}
