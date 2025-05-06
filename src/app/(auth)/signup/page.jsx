"use client"
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Page() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [number, setNumber] = useState("");
    const [image, setImage] = useState(null);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default"); // Your actual preset

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dkwka9d0g/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (data.secure_url) {
                setImage(data.secure_url);
                console.log("Image uploaded:", data.secure_url);
            } else {
                console.error("Cloudinary upload failed:", data);
                toast.error("Cloudinary upload failed.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Error uploading image.");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admins', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, number, password, image })
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Error creating the user!");
                return;
            }

            toast.success(data.message || "User Created Successfully!!");

            // Reset fields only on success
            setName("");
            setEmail("");
            setNumber("");
            setPassword("");
            setImage(null); // optional reset

        } catch (error) {
            toast.error(error.message || "Something went wrong!");
        }
    };



    return <main>
        <div className="h-screen bg-slate-100 flex flex-col justify-center items-center">
            <div className="flex flex-row gap-1 justify-center p-2">
                <img
                    className="h-10"
                    src="/logo-removebg-preview.png" alt="logo" />
                <p className="flex items-center text-2xl font-semibold">TRIGGER</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="bg-white shadow-lg md:min-w-[450px] w-full mx-auto max-w-md rounded-xl">
                    <div className="flex flex-col gap-3 justify-center items-center pt-3 pb-5">
                        <div className="pt-2 px-10 flex flex-col gap-2 w-full">
                            <p>Full Name <span className="text-red-600">*</span></p>
                            <input
                                className="px-3 py-1 ring-1 ring-gray-300"
                                placeholder="Enter your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                            />
                        </div>
                        <div className="pt-2 px-10 flex flex-col gap-2 w-full">
                            <p>Email <span className="text-red-600">*</span></p>
                            <input
                                className="px-3 py-1 ring-1 ring-gray-300"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                            />
                        </div>
                        <div className="pt-2 px-10 flex flex-col gap-2 w-full">
                            <p>Number <span className="text-red-600">*</span></p>
                            <input
                                className="px-3 py-1 ring-1 ring-gray-300"
                                placeholder="Enter your Number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                type="number"
                            />
                        </div>
                        <div className="pt-2 px-10 flex flex-col gap-2 w-full">
                            <p>Password <span className="text-red-600">*</span></p>
                            <input
                                className="px-3 py-1 ring-1 ring-gray-300"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                        </div>
                        <div className="pt-1 px-10 flex flex-col gap-2 w-full">
                            <p>Image</p>
                            <input className="ring-1 ring-gray-200 px-2 py-1" type="file" onChange={handleImageUpload} />
                            <div className="border-b border-balck w-[370px] mt-2" />
                        </div>
                    </div>
                    <div className="px-10">
                        <p className="flex flex-row">Already Have accoune?<Link href={'/login'}><p className="hover:text-blue-600">LogIn</p></Link></p>
                    </div>
                    <div className="pt-5 px-10 pb-5">
                        <button className="bg-blue-600 px-3 py-2 rounded-lg text-white w-full">Sign In</button>
                    </div>
                </div>
            </form>
        </div>
    </main>
}