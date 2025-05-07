"use client"

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Header({ toggleSidebar }) {

    const [userdata, setUserdata] = useState({
        name: "",
        email: "",
        phone: "",
        isAdmin: false,
    })

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const res = await fetch("/api/currentuser", {
                credentials: "include"
            });
            const data = await res.json();

            if (res.status === 401 || !data.data) {
                router.push("/login");
                return;
            }

            setUserdata({
                name: data.data.name,
                email: data.data.email,
                phone: data.data.phone,
                isAdmin: data.data.isAdmin // 👈 store admin flag
            })

            console.log("Name", data.data.name)
        } catch (err) {
            console.error("Error fetching user:", err)
            router.push("/login");
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="fixed w-full top-0 bg-white px-6 py-4 shadow-sm flex items-center justify-between z-50">
            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-gray-100 rounded-full"
                    aria-label="Toggle sidebar"
                >
                    <Menu className="h-6 w-6 text-gray-600" />
                </button>
            </div>

            {/* Dashboard Title & User Info */}
            <div className="flex justify-between items-center w-full">
                {/* Left Side - Title */}
                <div className="ml-4 md:ml-0">
                    <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                </div>

                {/* Right Side - User Profile */}
                {userdata && (
                    <div className="flex items-center gap-4 pr-72">
                        <div className="hidden md:flex flex-col items-end">
                            <h1 className="font-medium text-gray-700">{userdata.name}</h1>
                            <p className="text-sm text-gray-500">{userdata.email}</p>
                        </div>

                        {/* User Avatar */}
                        <div className="relative">
                            {userdata.image ? (
                                <img
                                    src={userdata?.image}
                                    alt={userdata?.name}
                                    className="h-10 w-10 rounded-full object-cover border-2 border-gray-200"
                                />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-gray-500">
                                        {userdata.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
