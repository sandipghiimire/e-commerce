export default function ImageFields({ setImageList, imageList, setFeatureImages, featureImages }) {
    return (
        <main className="flex-wrap bg-white p-5 rounded-lg">
            <h1>Image</h1>
            <div className="flex flex-col gap-1">
                <label className="text-slate-600">
                    Feature Image <span className="text-red-600">*</span>
                </label>
                <div className="felx justify-center">
                    {featureImages && <img
                        className="h-20 object-cover rounded-lg shadow-sm"
                        src={URL.createObjectURL(featureImages)}
                        alt=""
                    />}
                </div>
                <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        if (e.target.files.length > 0) {
                            setFeatureImages(e.target.files[0])
                        }
                    }}
                    className="border px-4 py-2 rounded-lg focus:outline-none"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="text-slate-600">
                    Images <span className="text-red-600">*</span>
                </label>
                {imageList.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                    {imageList?.map((items) => {
                        return (
                            <img
                            className="w-20 object-cover rounded-lg shadow-sm"
                            src={URL.createObjectURL(items)}
                            alt="product image"
                        />
                        )
                    })}
                </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={e => {
                        const newFiles = [];
                        for(let i = 0; i<e.target.files.length; i++) {
                            newFiles.push(e.target.files[i]);
                        }
                            setImageList(newFiles)
                    }}
                    className="border px-4 py-2 rounded-lg focus:outline-none"
                />
            </div>
        </main>
    )
}