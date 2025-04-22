"use client"

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth } from "../../../../lib/firestore/firebase";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function page() {
    const {user} = useAuth();
    const router = useRouter();
    useEffect(()=>{
        if(user){
            router.push('/dashboard')
        }
    },[user])
    return (
        <main className="w-full flex justify-center items-center h-screen bg-slate-200">
            <section className="flex flex-col gap-3">
                <div className="flex justify-center">
                    <img src="/logo-removebg-preview.png" className="h-12" alt="logo" />
                    <h1 className="flex items-center text-3xl font-bold m-2">TRIGGER</h1>
                </div>
                <div className="flex flex-col gap-3 bg-white md:p-10 p-7 rounded-lg md:min-w-[450px] w-full">
                    <h1 className="font-bold text-xl">Login With Email</h1>
                    <form action="" className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            id="email"
                            className="w-full p-2 border border-gray-400 rounded-lg"
                        />
                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            id="password"
                            className="w-full p-2 border border-gray-400 rounded-lg"
                        />
                        <button className="bg-blue-600 py-2 rounded-lg text-white">Login</button>
                    </form>
                    <div className="flex justify-between">
                        <Link href={'/signup'}>
                            <button className="font-light text-blue-700">
                                New? Create Account
                            </button>
                        </Link>
                        <Link href={'/forget-password'}>
                            <button className="font-light text-blue-700">
                                Forget Password?
                            </button>
                        </Link>
                    </div>
                    <hr />
                    <SignInWithGoogleComponent />
                </div>
            </section>
        </main>
    )
}

function SignInWithGoogleComponent() {
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const user = await signInWithPopup(auth, new GoogleAuthProvider())
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };
    return <button onClick={handleLogin} value={isLoading} className="bg-white py-2 rounded-lg text-blue-600 ring-1 hover:text-white hover:bg-blue-400">
        Sigh In With Google
    </button>
}