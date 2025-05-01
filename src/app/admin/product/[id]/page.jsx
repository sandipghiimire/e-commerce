"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Fields from "../[id]/components/formFields";
import ImageFields from "../[id]/components/image";
import Description from "../[id]/components/Description";

export default function Page({ params }) {
  const { id } = params;
  const router = useRouter();
  const [data, setData] = useState({
    title: "",
    description: "",
    categories: "",
    brand: "",
    stock: 0,
    sale: 0,
    saleprice: 0,
    isFeature: false,
  });
  const [existingFeatureImage, setExistingFeatureImage] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [newFeatureImage, setNewFeatureImage] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const result = await res.json();
        
        if (res.ok) {
          setData({
            title: result.title,
            description: result.description,
            categories: result.categories?._id || "",
            brand: result.brand?._id || "",
            stock: result.stock,
            sale: result.sale,
            saleprice: result.saleprice,
            isFeature: result.isFeature,
          });
          setExistingFeatureImage(result.featureImage || "");
          setExistingImages(Array.isArray(result.images) ? result.images : []);
        } else {
          toast.error(result.message || "Product not found");
          router.push("/products");
        }
      } catch (error) {
        toast.error("Error loading product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  const handleData = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    
    // Append text data
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Handle feature image
    if (newFeatureImage) {
      formData.append("featureImage", newFeatureImage);
    } else {
      formData.append("existingFeatureImage", existingFeatureImage);
    }

    // Handle additional images
    newImages.forEach((img) => formData.append("images", img));
    formData.append("existingImages", JSON.stringify(existingImages));

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await res.json();
      
      if (res.ok) {
        toast.success("Product updated successfully");
        router.push("/admin/product");
      } else {
        throw new Error(result.message || "Update failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between p-5">
        <h1 className="font-semibold text-xl">Update Product</h1>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-5 px-5">
        <Fields data={data} handleData={handleData} />
        <div className="flex-1 flex flex-col gap-5">
          <ImageFields
            existingFeatureImage={existingFeatureImage}
            newFeatureImage={newFeatureImage}
            setNewFeatureImage={setNewFeatureImage}
            existingImages={existingImages}
            newImages={newImages}
            setNewImages={setNewImages}
          />
          <Description data={data} handleData={handleData} />
        </div>
      </div>
    </form>
  );
}