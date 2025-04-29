export default function ImageFields({
    existingFeatureImage,
    newFeatureImage,
    setNewFeatureImage,
    existingImages,
    newImages,
    setNewImages
  }) {
    return (
      <main className="flex-wrap bg-white p-5 rounded-lg">
        <h1 className="text-xl font-bold mb-4">Images</h1>
  
        {/* Feature Image Section */}
        <div className="flex flex-col gap-1 mb-4">
          <label className="text-slate-600">
            Feature Image <span className="text-red-600">*</span>
          </label>
          
          <div className="flex flex-wrap gap-3 mb-3">
            {existingFeatureImage && (
              <img
                className="h-20 object-cover rounded-lg shadow-sm"
                src={existingFeatureImage}
                alt="Existing Feature"
              />
            )}
            {newFeatureImage && (
              <img
                className="h-20 object-cover rounded-lg shadow-sm"
                src={URL.createObjectURL(newFeatureImage)}
                alt="New Feature Preview"
              />
            )}
          </div>
          
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                setNewFeatureImage(e.target.files[0]);
              }
            }}
            className="border px-4 py-2 rounded-lg focus:outline-none"
          />
        </div>
  
        {/* Additional Images Section */}
        <div className="flex flex-col gap-1">
          <label className="text-slate-600">
            Additional Images <span className="text-red-600">*</span>
          </label>
          
          <div className="flex flex-wrap gap-3 mb-3">
            {/* Safe array check */}
            {Array.isArray(existingImages) && existingImages.map((img, index) => (
              <img
                key={`existing-${index}`}
                className="w-20 h-20 object-cover rounded-lg shadow-sm"
                src={img}
                alt={`Existing ${index}`}
              />
            ))}
            {Array.isArray(newImages) && newImages.map((img, index) => (
              <img
                key={`new-${index}`}
                className="w-20 h-20 object-cover rounded-lg shadow-sm"
                src={URL.createObjectURL(img)}
                alt={`New ${index}`}
              />
            ))}
          </div>
          
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setNewImages((prev) => [...prev, ...files]);
            }}
            className="border px-4 py-2 rounded-lg focus:outline-none"
          />
        </div>
      </main>
    );
  }