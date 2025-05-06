"use client"
import { useState } from "react"
import toast from "react-hot-toast"

export default function Form() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [number, setNumber] = useState("")
    const [image, setImage] = useState(null)
    const [isAdmin, setIsAdmin] = useState(false)

    const handleImageUpload = async (event) => {
        const file = event.target.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "ml_default")

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dkwka9d0g/image/upload", {
                method: "POST",
                body: formData,
            })

            const data = await res.json()
            if (data.secure_url) {
                setImage(data.secure_url)
            } else {
                toast.error("Image upload failed")
            }
        } catch (error) {
            toast.error("Error uploading image")
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/admins', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, number, password, image, isAdmin })
            })

            const data = await response.json()

            if (!response.ok) {
                toast.error(data.message || "Error creating user")
                return
            }

            toast.success(data.message || "User created successfully")
            
            // Reset form
            setName("")
            setEmail("")
            setNumber("")
            setPassword("")
            setImage(null)
            setIsAdmin(false)

        } catch (error) {
            toast.error(error.message || "Something went wrong")
        }
    }

    return (
        <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Create {isAdmin ? 'Admin' : 'User'}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Profile Image
                    </label>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden">
                                {image && (
                                    <img 
                                        src={image} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-sm cursor-pointer">
                                <input 
                                    type="file" 
                                    onChange={handleImageUpload} 
                                    className="hidden"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                            </label>
                        </div>
                        <span className="text-sm text-gray-500">
                            Click to upload image
                        </span>
                    </div>
                </div>

                {/* Name Input */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Enter full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        required
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="tel"
                        required
                        placeholder="Enter phone number"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        required
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                </div>

                {/* Role Selector */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        User Role <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={isAdmin ? "admin" : "user"}
                        onChange={(e) => setIsAdmin(e.target.value === "admin")}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                    >
                        <option value="user">Standard User</option>
                        <option value="admin">Administrator</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
                >
                    Create User
                </button>
            </form>
        </div>
    )
}