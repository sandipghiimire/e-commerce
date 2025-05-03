import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Slider from "react-slick";

export default function Categories() {
    const [features, setFeatures] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6, // default for large screen
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1000, // screen < 1000px
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // screen < 768px
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480, // screen < 480px
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
                const res = await fetch("/api/categories");
                const data = await res.json();
                const featuredcategorie = data;
                setFeatures(featuredcategorie);
            } catch (error) {
                toast.error("Failed to load featured products");
                console.error(error);
            }
        };
        fetchFeaturedProducts();
    }, []);

    return (
        <div className="flex flex-col gap-8 w-screen overflow-hidden p-10 px-10">
            <div>
                <h1 className="text-2xl font-semibold flex justify-center">Shop By Category</h1>
            </div>
            <Slider {...settings}>
                {(features?.length <= 2 ? [...features, ...features, ...features] : features)?.map((categorie, index) => {
                    return (
                        <Link href={'/'}>
                            <div className="px-2">
                                <div className="flex flex-col gap-4 items-center justify-center">
                                    <div className="h-32 w-32 rounded-full p-5 overflow-hidden">
                                        <img src={categorie?.image} alt={categorie?.image} />
                                    </div>
                                    <h1 className="font-semibold">{categorie?.name}</h1>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </Slider>

        </div>

    );
}
