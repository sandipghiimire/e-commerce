"use client"

import { useEffect } from "react";
import AuthoContextProvider, { useAuth } from "../../../context/AuthContext"
import AdminLayout from "./components/AdminLayout"
import { useRouter } from "next/navigation";
import { CircularProgress } from "@heroui/react";

export default function Layout({ children }) {
    return <AuthoContextProvider>
        <AdminChecking>{children}</AdminChecking>
    </AuthoContextProvider>
}

function AdminChecking({ children }) {
    return <AdminLayout>{children}</AdminLayout>
}