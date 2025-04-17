"use client"

import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

export default function Header() {
    const pathname = usePathname();

    return (
        <section className="bg-white px-3 py-5 shadow-sm">
            <h1 className="text-xl font-semibold">Dashboard</h1>
        </section>
    );
}
