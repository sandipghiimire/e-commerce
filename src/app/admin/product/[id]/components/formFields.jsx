"use client"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

export default function Fields({ data, handleData }) {
    const [brands, setBrands] = useState([]);
    const [categoriess, setCategories] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await fetch("/api/brand");
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const brandData = await res.json();
                setBrands(brandData)
            } catch (error) {
                toast.error(error.message); // Show actual error message
            }
        };

        fetchBrands();
    }, []);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const brandData = await res.json();
                setCategories(brandData)
            } catch (error) {
                toast.error(error.message); // Show actual error message
            }
        };

        fetchCategories();
    }, []);

    return (
        <section className="flex-1 bg-white rounded-lg p-5 w-full space-y-4">
            <h1 className="font-bold text-xl">Basic Details</h1>
            <div className="flex flex-col gap-1">
                <h1>Product Name <span className="text-red-600">*</span></h1>
                <input
                    type="text"
                    value={data?.title ?? ""}
                    onChange={(e) => handleData("title", e.target.value)}
                    placeholder="Enter product name"
                    className="border ring-slate-200 px-4 py-3 rounded-lg"
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <h1>Product Description <span className="text-red-600">*</span></h1>
                <input
                    type="text"
                    value={data?.description ?? ""}
                    onChange={(e) => handleData("description", e.target.value)}
                    placeholder="Enter Product Description"
                    className="border px-4 py-3 rounded-lg outline-none"
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <h1>Category <span className="text-red-600">*</span></h1>
                <select
                    value={data?.categories ?? ""}
                    onChange={(e) => handleData("categories", e.target.value)}
                    className="border px-4 py-3 rounded-lg outline-none"
                >
                    <option value="">Select Category</option>
                    {categoriess.map((category) => (
                        <option value={category._id} key={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <h1>Brand <span className="text-red-600">*</span></h1>
                <select
                    value={data?.brand ?? ""}
                    onChange={(e) => handleData("brand", e.target.value)}
                    className="border px-4 py-3 rounded-lg outline-none"
                >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                        <option value={brand._id} key={brand._id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
            </div>


            <div className="flex flex-col gap-1">
                <h1>Stock<span className="text-red-600">*</span></h1>
                <input
                    type="number"
                    value={data?.stock ?? ""}
                    onChange={(e) => handleData("stock", e.target.value)}
                    placeholder="Enter Number Of Stock"
                    className="border px-4 py-3 rounded-lg outline-none"
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <h1>Sale<span className="text-red-600">*</span></h1>
                <input
                    type="number"
                    value={data?.sale ?? ""}
                    onChange={(e) => handleData("sale", e.target.value)}
                    placeholder="Enter Price"
                    className="border px-4 py-3 rounded-lg outline-none"
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <h1>Sale Price<span className="text-red-600">*</span></h1>
                <input
                    type="number"
                    value={data?.saleprice ?? ""}
                    onChange={(e) => handleData("saleprice", e.target.value)}
                    placeholder="Enter Sale Price"
                    className="border px-4 py-3 rounded-lg outline-none"
                    required
                />
            </div>

            <div>
                <p>Is Feature <span className="text-red-600">*</span></p>
                <select
                    value={data?.isFeature === true ? "true" : "false"}
                    onChange={(e) => handleData("isFeature", e.target.value === "true")}
                    name="isFeature"
                    id="isFeature"
                    className="border px-4 py-3 rounded-lg outline-none w-full"
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>

        </section>
    )
}