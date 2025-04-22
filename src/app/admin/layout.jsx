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
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user && !isLoading) {
            router.push('/login')
        }
    }, [user, isLoading]);

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <CircularProgress />
            </div>
        )
    }

    if(!user){
        return(
            <div className="h-screen w-screen flex justify-center items-center">
            <h1>Login first!!</h1>
        </div>
        )
    }

    return <AdminLayout>{children}</AdminLayout>
}