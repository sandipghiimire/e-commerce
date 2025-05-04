"use client"
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { Rating } from "@mui/material";
import Photoes from "./components/Photoes";
import Details from "./components/Details";
import { useParams } from "next/navigation";
import Review from "./components/Review";
import RelatedProducts from "./components/RelatedProducts";
// import LoadingSpinner from "@/components/LoadingSpinner"; // Create or import a loading component

export default function ProductPage() {
    const params = useParams();
    const { id } = params;
    console.log(id)
    const [product, setProduct] = useState("");
    // const [featureImages, setFeatureImages] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await fetch(`/api/products/${id}`)
                const brandData = await data.json();
                setProduct(brandData);
                console.log(brandData?.title)
            } catch (error) {
                toast.error(error)
            }
        }
        fetchProduct();
    }, [])

    let allImages = [];

    try {
        allImages = [
            ...(product?.featureImage ? [product.featureImage] : []),
            ...(product?.images ? JSON.parse(product.images) : [])
        ];
    } catch (e) {
        console.error("Failed to parse images", e);
    }

    return (
        <main className="p-5 md:p-20">
            <section className="flex flex-col md:flex-row gap-8 md:gap-20">
                <Photoes images={allImages} />
                <Details details={product} />
            </section>
            <div>
                <div>
{/* <Review/> */}
<RelatedProducts categories={product?.categories?._id}/>
                </div>
            </div>

            <div>
                <div>

                </div>
            </div>
        </main>
    );
}