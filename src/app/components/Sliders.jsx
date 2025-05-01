import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Slider from "react-slick";

export default function SimpleSlider() {
    const [features, setFeatures] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const res = await fetch("/api/products");
                const data = await res.json();
                const featuredItems = data.filter((item) => item.isFeature === true);
                setFeatures(featuredItems);
            } catch (error) {
                toast.error("Failed to load featured products");
                console.error(error);
            }
        };
        fetchFeaturedProducts();
    }, []);

    return (
        <div className="w-screen overflow-hidden">
            <Slider {...settings}>
                {features?.map((items) => {
                    return (
                        <div>
                            <div className="flex gap-6 bg-gray-50 p-10 md:py-20 md:px-24 w-full">
                                <div className="flex-1 flex flex-col gap-5">
                                    <h2 className="text-gray-600">LATEST FAVORIATE</h2>
                                    <h1 className="text-4xl font-semibold">{items?.title}</h1>
                                    <h1 className="text-sm font-light max-w-96 line-clamp-2">{items?.description}</h1>
                                    <div className="flex flex-row gap-5">
                                    <button className="px-3 py-3 bg-blue-600 text-white rounded-xl">BUY NOW</button>
                                    <button className="px-3 py-3 bg-white text-blue-600 ring-2 ring-blue-600 rounded-xl">ADD TO CART</button>
                                    <button className="px-3 py-3 bg-white text-red-600"><Heart size={23}/></button>
                                    </div>
                                </div>
                                <div>
                                    <img className="h-[25rem] rounded-lg" src={items?.featureImage} alt=""/>
                                </div>
                            </div> 
                        </div>
                    )
                })}
            </Slider>
        </div>

    );
}
