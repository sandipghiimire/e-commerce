"use client";
import { CircularProgress } from "@mui/material";
import AuthoContextProvider, { useAuth } from "../../../context/AuthContext";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Link from "next/link";

export default function Layout({ children }) {
    return (
        <main>
            <Header />
            <AuthoContextProvider>
                <UserCheck>
                    <section>{children}</section>
                </UserCheck>
            </AuthoContextProvider>
            <Footer />
        </main>
    );
}

function UserCheck({ children }) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <CircularProgress />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="h-screen w-full flex justify-center items-center">
                <div className="text-center">
                    <h1 className="mb-4 text-xl font-semibold">You are not Logged In!</h1>
                    <Link href="/login">
                        <button className="bg-blue-600 px-4 py-1.5 rounded-full font-bold text-white text-sm">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
