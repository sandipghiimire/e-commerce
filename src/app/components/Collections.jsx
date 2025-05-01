import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Slider from "react-slick";

export default function Collections() {
    const [features, setFeatures] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
    };

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const res = await fetch("/api/collection");
                const data = await res.json();
                const featuredItems = data;
                setFeatures(featuredItems);
            } catch (error) {
                toast.error("Failed to load featured products");
                console.error(error);
            }
        };
        fetchFeaturedProducts();
    }, []);

    return (
        <div className="w-screen overflow-hidden p-10">
            <Slider {...settings}>
                {features?.map((items) => {
                    return (
                        <div className="px-5">
                            <div className="flex gap-6 bg-gradient-to-tr to-[#d9e2f1] from-[#cce7f5] p-10 md:py-20 md:px-24 w-full rounded-2xl">
                                <div className="flex-1 flex flex-col gap-5">
                                    <h2 className="text-gray-600">LATEST FAVORIATE</h2>
                                    <h1 className="text-4xl font-semibold">{items?.name}</h1>
                                    <h1 className="text-sm font-light max-w-96 line-clamp-2">{items?.subtitle}</h1>
                                    <div className="flex flex-row gap-5">
                                    <button className="px-3 py-3 bg-blue-600 text-white rounded-xl">SHOP NOW</button>
                                    
                                    </div>
                                </div>
                               
                            </div> 
                        </div>
                    )
                })}
            </Slider>
        </div>

    );
}
