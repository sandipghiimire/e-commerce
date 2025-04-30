"use client"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

export default function Form() {
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("subtitle", subtitle);
      // send array as JSON string; backend should parse accordingly
      formData.append("products", JSON.stringify(selectedProducts));
      if (image) {
        formData.append("image", image);
      }

      const res = await fetch("/api/collection", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        console.log("✅ Collection created:", result);
        toast.success("Collection Created Successfully!!");
        setImage(null);
        setName("");
        setSubtitle("");
        setProducts([]);
        setSelectedProducts([]);
      } else {
        toast.error(result.message || "Please fill all required fields.");
        console.error("❌ Error:", result.message);
      }
    } catch (err) {
      toast.error("An error occurred while creating collection");
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const productData = await res.json();
        setProducts(productData);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-white rounded-lg p-5 w-full md:w-[400px]">
      <h1 className="font-semibold pb-2 flex justify-center items-center">Create Collection</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-slate-600">
            Image <span className="text-red-600">*</span>
          </label>
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files?.[0] || null)}
            className="border px-4 py-2 rounded-lg focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-slate-600">
            Collection Title <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Collection Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-slate-600">
            Sub Title <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter sub-title"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="border px-4 py-2 rounded-lg w-full focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-slate-600">
            Products <span className="text-red-600">*</span>
          </label>
          <select
            multiple
            value={selectedProducts}
            onChange={(e) => {
              const selected = Array.from(e.target.selectedOptions).map(opt => opt.value);
              setSelectedProducts(selected);
            }}
            className="border px-4 py-3 rounded-lg outline-none h-32"
          >
            {products.map((product) => (
              <option value={product._id} key={product._id}>
                {product.title}
              </option>
            ))}
          </select>
        </div>

        {/* Display selected products */}
        {selectedProducts.length > 0 && (
          <div className="flex flex-col gap-1">
            <h2 className="text-slate-600 font-medium">Selected Products:</h2>
            <ul className="list-disc list-inside">
              {selectedProducts.map(id => {
                const prod = products.find(p => p._id === id);
                return <li key={id}>{prod ? prod.title : id}</li>;
              })}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="flex justify-center items-center px-2 py-2 bg-blue-600 w-full rounded-lg text-white font-semibold"
        >
          Create
        </button>
      </form>
    </div>
  );
}
