"use client"

import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../lib/firestore/firebase";

const AuthContext = createContext();

export default function AuthoContextProvider({ children }) {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        })
        return () => unsub();
    }, [])

    return <AuthContext.Provider
        value={{
            user,
            isLoading: user === undefined,
        }}
    >
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);