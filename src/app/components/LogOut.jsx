"use client"

import { signOut } from "firebase/auth";
import { LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { auth } from "../../../lib/firestore/firebase";
import { useAuth } from "../../../context/AuthContext";

export default function Logout() {
    const {user} = useAuth();
    if(!user) {
        return <></>
    }
    
    return <>
        <button
            onClick={async () => {
                if(!confirm("Do you want to Logout?")) return;
                try {
                    await toast.promise(signOut(auth), {
                        error: (e) => e?.message,
                        loading: 'Signing out',
                        success: 'Signed out Successfully!!'
                    },{
                        position: "bottom-right",
                    })
                } catch (error) {
                    toast.error(error?.message);
                }
            }}
            className="h-5 w-5 flex justify-center items-center rounded-full hover:bg-gray-50"> <LogOut size={20} /></button>
    </>
}