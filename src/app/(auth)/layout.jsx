"use client"

import AuthoContextProvider from "../../../context/AuthContext"

export default function Layout({children}){
    return <AuthoContextProvider>{children}</AuthoContextProvider>
}