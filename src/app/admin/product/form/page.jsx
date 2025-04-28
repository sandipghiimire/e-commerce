"use client"
import { useState } from "react";
import Fields from "./components/formFields";
import ImageFields from "./components/image";
import Description from "./components/Description";

export default function page() {
    const [data, setData] = useState(null);
    const [featureImages, setFeatureImages] = useState(null);
    const [imageList, setImageList] = useState([]);

    const handleData = (key, value) => {
        setData((prevData) => {
            return {
                ...(prevData ?? {}),
                [key]: value,
            };
        });
    };

    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
        }}>
            <div className="flex justify-between p-5">
            <h1 className="font-semibold pb-5">
                This is form fields
            </h1>
            <button type="submit" className="bg-gray-200 px-3 py-2 rounded-lg">Create</button>
            </div>
            <div className="flex flex-col md:flex-row gap-5 pl-5 pr-5">
                <Fields data={data} handleData={handleData} />
                <div className="flex-1 flex flex-col gap-5">
                    <ImageFields
                        data={data}
                        featureImages={featureImages}
                        setFeatureImages={setFeatureImages}
                        imageList={imageList}
                        setImageList={setImageList}
                    />
                    <Description data={data} handleData={handleData} />
                </div>
            </div>
        </form>
    )
}