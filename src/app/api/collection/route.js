import { NextResponse } from "next/server";
import Collection from "../../lib/models/collections/collectionsSchema";
import Product from "../../lib/models/products/productSchema"; // ✅ must import to register schema
import connectionDB from "../../lib/db";
import path from "path";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
    try {
      await connectionDB();
  
      const formData = await req.formData();
      const name = formData.get("name");
      const subtitle = formData.get("subtitle");
      const productsRaw = formData.get("products");
      const imageFile = formData.get("image");
  
      if (
        typeof name !== "string" ||
        typeof subtitle !== "string" ||
        typeof productsRaw !== "string" ||
        !(imageFile instanceof File)
      ) {
        return NextResponse.json(
          { message: "All fields are required including at least one product and image" },
          { status: 400 }
        );
      }
  
      let products = [];
      try {
        products = JSON.parse(productsRaw);
        if (!Array.isArray(products)) {
          throw new Error("Products must be an array");
        }
      } catch (err) {
        return NextResponse.json({ message: "Invalid product list" }, { status: 400 });
      }
  
      // Save image to /public/uploads
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const fileName = `${uuidv4()}-${imageFile.name}`;
      const uploadDir = path.join(process.cwd(), "public", "uploads");
  
      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
  
      const imageUrl = `/uploads/${fileName}`;
  
      // Create collection
      const newCollection = await Collection.create({
        name,
        subtitle,
        image: imageUrl,
        products, // ✅ now properly an array of ObjectIds
      });
  
      return NextResponse.json(newCollection, { status: 201 });
    } catch (error) {
      console.error("POST Error /api/collection:", error);
      return NextResponse.json({ message: "Failed to create collection" }, { status: 500 });
    }
  }
export async function GET(req) {
    try {
        await connectionDB();
        const categories = await Collection.find().populate('products'); // now Product schema is registered
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 });
    }
}



export async function DELETE(req) {
    try {
        await connectionDB();
        const { id } = await req.json();
        const response = await Collection.findByIdAndDelete(id);
        return NextResponse.json({ message: "User deleted successfully!" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error while deleting the data!!", error }, { status: 400 })
    }
}

// Example: (Next.js route handler)
export async function PUT(req) {
    const { id, name, image } = await req.json();
    await CategoryModel.findByIdAndUpdate(id, { name, image });
    return Response.json({ success: true });
}
