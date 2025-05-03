import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Slider from "react-slick";

export default function Collections() {
    const [features, setFeatures] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 500, // mobile screen (768px and below)
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const res = await fetch("/api/collection");
                const data = await res.json();
                const featuredcollection = data;
                setFeatures(featuredcollection);
            } catch (error) {
                toast.error("Failed to load featured products");
                console.error(error);
            }
        };
        fetchFeaturedProducts();
    }, []);

    return (
        <div className="w-screen overflow-hidden p-10">
            <h1 className=" flex p-5 text-2xl font-semibold justify-center">Our Collections</h1>
            <Slider {...settings}>
                {(features?.length <= 2 ? [...features, ...features, ...features] : features)?.map((collection, index) => (
                    <div key={index} className="px-2">
                        <div className="flex flex-col-reverse md:flex-row gap-6 bg-gradient-to-tr to-[#d9e2f1] from-[#cce7f5] p-7 w-full rounded-2xl">
                            <div className="flex flex-col gap-2 flex-1">
                                <h1 className="text-xl font-semibold">{collection?.name}</h1>
                                <p className="text-sm font-light max-w-96 line-clamp-2">{collection?.subtitle}</p>
                                <div className="flex flex-row gap-5">
                                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl">
                                        SHOP NOW
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center justify-center mt-4 md:mt-0">
                                <img
                                    className="h-[9rem] w-[9rem] object-cover rounded-xl"
                                    src={collection?.image}
                                    alt={collection?.name}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>


        </div>

    );
}
