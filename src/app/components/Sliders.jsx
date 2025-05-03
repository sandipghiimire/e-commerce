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
                            <div className="flex flex-col-reverse md:flex-row gap-6 bg-gray-50 p-6 md:p-10 md:py-20 md:px-24 w-full rounded-xl">
                                {/* Left Side - Text Section */}
                                <div className="flex-1 flex flex-col gap-4 md:text-left">
                                    <h2 className="text-gray-600 text-sm uppercase hidden md:block">LATEST FAVORITE</h2>
                                    <h1 className="text-3xl md:text-4xl font-semibold">{items?.title}</h1>
                                    <p className="text-sm font-light max-w-md mx-auto md:mx-0 line-clamp-2">{items?.description}</p>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap justify-start gap-3 mt-4">
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl">BUY NOW</button>
                                        <button className="px-4 py-2 bg-white text-blue-600 ring-2 ring-blue-600 rounded-xl">ADD TO CART</button>
                                        <button className="px-4 py-2 bg-white text-red-600 border border-gray-200 rounded-xl">
                                            <Heart size={23} />
                                        </button>
                                    </div>
                                </div>

                                {/* Right Side - Image */}
                                <div className="flex justify-center items-center mt-6 md:mt-0">
                                    <img
                                        className="h-60 md:h-[25rem] xl:h-[25rem] w-auto object-cover rounded-lg"
                                        src={items?.featureImage}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>

                    )
                })}
            </Slider>
        </div>

    );
}
