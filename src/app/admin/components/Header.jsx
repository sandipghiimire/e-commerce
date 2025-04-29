"use client"

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function Header({toggleSidebar}) {
    const pathname = usePathname();

    return (
        <section className="fixed w-full top-0 bg-white px-3 py-5 shadow-sm flex items-center gap-3">
            <div className="flex justify-center items-center md:hidden">
                <button onClick={toggleSidebar}>
                    <Menu />
                </button>
            </div>
            <h1 className="text-xl font-semibold">Dashboard</h1>
        </section>
    );
}
