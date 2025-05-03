import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return <div className="grid grid-cols-3 p-10 px-20 bg-blue-100">
        <div className="flex flex-col">
            <h1 className="text-xl font-semibold">E-Commerce</h1>
            <div className="p-5 flex flex-col gap-3">
                <Link href={'/'} className="hover:text-blue-600">Home</Link>
                <Link href={'/about'} className="hover:text-blue-600">About</Link>
                <Link href={'/contact'} className="hover:text-blue-600">Contact</Link>
            </div>
        </div>
        <div>
            <h1 className="text-xl font-semibold">Follow Us</h1>
            <div className="grid grid-cols-2 p-5">
                <Link href={'https://www.facebook.com'}><Facebook  className="hover:text-blue-600"/></Link>
                <Link href={'https://www.instagram.com'}><Instagram className="hover:text-blue-600"/></Link>
            </div>
        </div>
        <div>
        <h1 className="text-xl font-semibold">Policy</h1>
        </div>
    </div>
}