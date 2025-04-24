"use client"
import { useState } from "react"
import toast from "react-hot-toast";

export default function Form() {
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [image, setImages] = useState(null);

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("slug", slug);
            formData.append("image", image);

            const res = await fetch("/api/categories", {
                method: "POST",
                body: formData,
            });

            const result = await res.json();
            if (res.ok) {
                console.log("✅ Category created:", result);
                toast.success("Categories Created Successfully!!")
                setImages(null)
                setName(null)
                setSlug(null)
            } else {
                toast.error("Fill all the fields.")
                console.error("❌ Error:", result.message);
            }
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    return <div className="bg-white rounded-lg p-5 w-ful md:w-[400px]">
        <h1 className="font-semibold pb-2 flex justify-center items-center">Create Categories</h1>
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="flex flex-col gap-5"
        >
            <div className="flex flex-col gap-1">
                <label className="text-slate-600">
                    Image <span className="text-red-600">*</span>
                </label>
                {image && (
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-md"
                    />
                )}
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) setImage(file);
                    }}
                    className="border px-4 py-2 rounded-lg focus:outline-none"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-slate-600">
                    Name <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter category name"
                    id="category-name"
                    name="category-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border px-4 py-2 rounded-lg w-full focus:outline-none"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-slate-600">
                    Slug <span className="text-red-600">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Enter category slug"
                    id="category-slug"
                    name="category-slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="border px-4 py-2 rounded-lg w-full focus:outline-none"
                />
            </div>
            <button className="flex justify-center items-center px-2 py-2 bg-blue-600 w-full rounded-lg text-white font-semibold">Create</button>
        </form>
    </div>
}