"use client"
import { useState } from "react";
import Fields from "./components/formFields";
import ImageFields from "./components/image";
import Description from "./components/Description";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [data, setData] = useState({
        title: "",
        description: "",
        categories: "",
        brand: "",
        stock: 0,
        sale: 0,
        saleprice: 0
    });
    const [featureImages, setFeatureImages] = useState(null);
    const [imageList, setImageList] = useState([]);

    const handleData = (key, value) => {
        setData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("categories", data.categories);
        formData.append("brand", data.brand);
        formData.append("stock", data.stock);
        formData.append("sale", data.sale);
        formData.append("saleprice", data.saleprice);

        // Feature Image
        if (featureImages) {
            formData.append("featureImage", featureImages);
        } else {
            toast.error("Feature Image is required");
            return;
        }

        // Multiple Images
        if (imageList.length > 0) {
            imageList.forEach((image) => {
                formData.append("images", image);
            });
        } else {
            toast.error("At least one image is required");
            return;
        }

        try {
            const res = await fetch('/api/products', {
                method: "POST",
                body: formData,
            });

            const result = await res.json();

            if (res.ok) {
                console.log("✅ Product Created Successfully", result);
                toast.success("Product Created Successfully");
                router.push("/admin/product");
                // Reset form
                setData({
                    title: "",
                    description: "",
                    categories: "",
                    brand: "",
                    stock: 0,
                    sale: 0,
                    saleprice: 0
                });
                setFeatureImages(null);
                setImageList([]);
            } else {
                toast.error(result.message || "Error creating product.");
                console.error("❌ Error:", result.message);
            }
        } catch (error) {
            console.error(error?.message);
            toast.error(error?.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex justify-between p-5">
                <h1 className="font-semibold pb-5">This is form fields</h1>
                <button type="submit" className="bg-gray-200 px-3 py-2 rounded-lg">Create</button>
            </div>
            <div className="flex flex-col md:flex-row gap-5 pl-5 pr-5">
                <Fields data={data} handleData={handleData} />
                <div className="flex-1 flex flex-col gap-5">
                    <ImageFields
                        featureImages={featureImages}
                        setFeatureImages={setFeatureImages}
                        imageList={imageList}
                        setImageList={setImageList}
                    />
                    <Description data={data} handleData={handleData} />
                </div>
            </div>
        </form>
    );
}