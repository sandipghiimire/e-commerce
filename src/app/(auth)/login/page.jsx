"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import toast from "react-hot-toast";
import { auth } from "../../../../lib/firestore/firebase";
import { useAuth } from "../../../../context/AuthContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.message || "Login failed");
            }

            toast.success("Login successful!");
            router.push("/account");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (user) {
        router.push("/account");
        return null;
    }

    return (
        <main className="w-full flex justify-center items-center h-screen bg-slate-200">
            <section className="flex flex-col gap-3">
                <div className="flex justify-center">
                    <img src="/logo-removebg-preview.png" className="h-12" alt="logo" />
                    <h1 className="flex items-center text-3xl font-bold m-2">TRIGGER</h1>
                </div>
                <div className="flex flex-col gap-3 bg-white md:p-10 p-7 rounded-lg md:min-w-[450px] w-full">
                    <h1 className="font-bold text-xl">Login With Email</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded-lg mb-2"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded-lg mb-4"
                            required
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 py-2 rounded-lg text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Processing..." : "Login"}
                        </button>
                    </form>
                    <div className="flex justify-between">
                        <Link href="/signup" className="font-light text-blue-700 hover:underline">
                            New? Create Account
                        </Link>
                        <Link href="/forget-password" className="font-light text-blue-700 hover:underline">
                            Forget Password?
                        </Link>
                    </div>
                    <hr />
                    <GoogleSignInButton />
                </div>
            </section>
        </main>
    );
}

function GoogleSignInButton() {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            const res = await fetch("/api/google-auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    token: await result.user.getIdToken()
                })
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Google login failed");

            toast.success("Login successful!");
            router.push("/account");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="bg-white py-2 rounded-lg text-blue-600 ring-1 hover:text-white hover:bg-blue-400 disabled:opacity-50"
        >
            {loading ? "Signing in..." : "Sign In With Google"}
        </button>
    );
}