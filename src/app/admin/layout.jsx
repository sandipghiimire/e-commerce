"use client"

import Header from "./components/Header"
import Sidebar from "./components/Sidebar"

export default function Layout({ children }) {
    return <main className="flex">
        <Sidebar />
        <section className="flex-1 flex flex-col">
            <Header/>
            <section className="flex-1 bg-slate-100">{children}</section>
        </section>
    </main>
}