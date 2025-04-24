"use client"

import { useEffect, useRef, useState } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        toggleSidebar();
    }, [pathname])

    useEffect(() => {
        function handleClickOutsideSidebar(event) {
            if (sidebarRef.current && !sidebarRef?.current?.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutsideSidebar);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideSidebar);
        }
    }, []);

    return <main className="flex">
        <div className="hidden md:block">
            <Sidebar />
        </div>
        <div
            ref={sidebarRef}
            className={`fixed md:hidden ease-in-out transistion-all duration-400
            ${isOpen ? "translate-x-0" : "-translate-x-[290px]"}`}>
            <Sidebar />
        </div>
        <section className="flex-1 flex flex-col">
            <Header toggleSidebar={toggleSidebar} />
            <section className="flex-1 bg-slate-100">{children}</section>
        </section>
    </main>
}