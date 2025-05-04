"use client";
import { useState, useEffect } from "react";

export default function Photoes({ images }) {
    const [isSelected, setIsSelected] = useState("");

    useEffect(() => {
        if (images && images.length > 0) {
            setIsSelected(images[0]); // set default when images are available
        }
    }, [images]);

    if (!images || images.length === 0) return null;

    return (
        <div className="w-full flex flex-col gap-3">
            <div className="flex justify-center w-full">
                <img
                    src={isSelected}
                    alt="Selected"
                    className="object-cover h-[250px] md:h-[530px]"
                />
            </div>
            <div className="flex flex-wrap justify-center items-center gap-3">
                {images.map((image, indx) => (
                    <div
                        key={indx}
                        onClick={() => setIsSelected(image)}
                        className="w-[80px] ring-1 ring-gray-300 rounded p-2 cursor-pointer hover:border-blue-500"
                    >
                        <img
                            className="object-cover h-[80px]"
                            src={image}
                            alt={`Image ${indx}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
