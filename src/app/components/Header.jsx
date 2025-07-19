"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Heart, Menu, Search, ShoppingCart, UserCircle2, X, ChevronDown, LogOut } from "lucide-react";
import Logout from "./LogOut";
import AuthoContextProvider from "../../../context/AuthContext";
import { useAuth } from "../../../context/AuthContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAuth();
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const menuList = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "Categories", link: "/categories", submenu: [
      { name: "Electronics", link: "/categories/electronics" },
      { name: "Clothing", link: "/categories/clothing" },
      { name: "Home & Kitchen", link: "/categories/home" },
      { name: "Beauty", link: "/categories/beauty" },
    ]},
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white shadow-lg py-2" 
          : "bg-gradient-to-r from-blue-900 to-indigo-900 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={'/'} className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <div className="bg-white w-8 h-8 rounded-md flex items-center justify-center">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">T</span>
                </div>
              </div>
              <h1 className={`font-bold text-xl ${scrolled ? "text-gray-900" : "text-white"}`}>
                TRIGGER
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuList.map((item, index) => (
              <div key={index} className="relative group">
                <Link href={item.link}>
                  <button className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    scrolled 
                      ? "text-gray-700 hover:bg-gray-100" 
                      : "text-white hover:bg-white/10"
                  }`}>
                    {item.name}
                    {item.submenu && <ChevronDown size={16} className="ml-1 inline" />}
                  </button>
                </Link>
                
                {item.submenu && (
                  <div className="absolute left-0 mt-1 w-48 bg-white shadow-xl rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link key={subIndex} href={subItem.link}>
                        <div className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                          {subItem.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Search & Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search Bar */}
            <div className={`relative transition-all duration-300 ${isSearchOpen ? "w-64" : "w-10"}`}>
              <div 
                ref={searchRef}
                className={`flex items-center rounded-full overflow-hidden ${
                  scrolled ? "bg-gray-100" : "bg-white/20"
                } ${isSearchOpen ? "border border-blue-500" : ""}`}
              >
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className={`p-2 ${isSearchOpen ? "text-blue-500" : scrolled ? "text-gray-500" : "text-white"}`}
                >
                  <Search size={20} />
                </button>
                {isSearchOpen && (
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full bg-transparent border-none focus:outline-none py-2 px-0 text-gray-700 placeholder-gray-500"
                    autoFocus
                  />
                )}
              </div>
            </div>
            
            {/* Action Icons */}
            <div className="flex items-center gap-4">
              <Link href={'/cart'}>
                <button 
                  title="My Cart" 
                  className={`p-2 rounded-full relative ${
                    scrolled 
                      ? "text-gray-700 hover:bg-gray-100" 
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </button>
              </Link>
              
              <Link href={'/wishlist'}>
                <button 
                  title="Wishlist" 
                  className={`p-2 rounded-full ${
                    scrolled 
                      ? "text-gray-700 hover:bg-gray-100" 
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <Heart size={20} />
                </button>
              </Link>
              
              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center gap-2 ${
                    scrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                  <span className="hidden lg:block font-medium">
                    {user ? user.name.split(' ')[0] : "Account"}
                  </span>
                  <ChevronDown size={16} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-lg py-2 z-50">
                    {user ? (
                      <>
                        <div className="px-4 py-3 border-b">
                          <p className="text-sm font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        </div>
                        <Link href="/account">
                          <div className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                            My Account
                          </div>
                        </Link>
                        <Link href="/orders">
                          <div className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                            My Orders
                          </div>
                        </Link>
                        <Link href="/settings">
                          <div className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                            Settings
                          </div>
                        </Link>
                        <div className="border-t mt-2 pt-2">
                          <AuthoContextProvider>
                            <div className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
                              <Logout />
                            </div>
                          </AuthoContextProvider>
                        </div>
                      </>
                    ) : (
                      <>
                        <Link href="/login">
                          <div className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                            Sign In
                          </div>
                        </Link>
                        <Link href="/register">
                          <div className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                            Create Account
                          </div>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 ${scrolled ? "text-gray-700" : "text-white"}`}
            >
              <Search size={20} />
            </button>
            
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${scrolled ? "text-gray-700" : "text-white"}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-3 pl-10 pr-4 rounded-lg bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute top-full left-0 right-0 z-50">
          <div className="px-4 py-3 border-b">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                <div>
                  <p className="font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" className="flex-1">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium">
                    Sign In
                  </button>
                </Link>
                <Link href="/register" className="flex-1">
                  <button className="w-full border border-gray-300 py-2 px-4 rounded-lg font-medium">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="py-2">
            {menuList.map((item, index) => (
              <div key={index} className="border-b border-gray-100">
                <Link href={item.link} onClick={() => setIsOpen(false)}>
                  <div className="block py-3 px-4 text-gray-700 hover:bg-blue-50">
                    {item.name}
                  </div>
                </Link>
                
                {item.submenu && (
                  <div className="bg-gray-50 pl-8">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link key={subIndex} href={subItem.link} onClick={() => setIsOpen(false)}>
                        <div className="block py-2 px-4 text-gray-600 hover:bg-blue-100 border-t border-gray-100">
                          {subItem.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="px-4 py-3 border-t">
              <div className="grid grid-cols-4 gap-2">
                <Link href="/account" onClick={() => setIsOpen(false)}>
                  <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                    <UserCircle2 size={20} />
                    <span className="text-xs mt-1">Account</span>
                  </button>
                </Link>
                <Link href="/cart" onClick={() => setIsOpen(false)}>
                  <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 relative">
                    <ShoppingCart size={20} />
                    <span className="absolute top-0 right-5 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      3
                    </span>
                    <span className="text-xs mt-1">Cart</span>
                  </button>
                </Link>
                <Link href="/wishlist" onClick={() => setIsOpen(false)}>
                  <button className="flex flex-col items-center text-gray-600 hover:text-blue-600">
                    <Heart size={20} />
                    <span className="text-xs mt-1">Wishlist</span>
                  </button>
                </Link>
                {user && (
                  <AuthoContextProvider>
                    <button className="flex flex-col items-center text-gray-600 hover:text-red-600">
                      <LogOut size={20} />
                      <span className="text-xs mt-1">Logout</span>
                    </button>
                  </AuthoContextProvider>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}