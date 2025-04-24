import { NextResponse } from "next/server";
import categoriesSchema from "../../lib/models/categories/categoriesSchema";
import connectionDB from "../../lib/db";
import path from "path";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
    try {
        await connectionDB();

        // 1. parse the multipart/form data
        const formData = await req.formData();
        const name = formData.get("name");
        const slug = formData.get("slug");
        const imageFile = formData.get("image"); // Web File object

        // 2. validate
        if (
            typeof name !== "string" ||
            typeof slug !== "string" ||
            !(imageFile instanceof File)
        ) {
            return NextResponse.json(
                { message: "Name, slug and image file are all required" },
                { status: 400 }
            );
        }

        // 3. write file to disk
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const fileName = `${uuidv4()}-${imageFile.name}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        // ensure directory exists
        await fs.mkdir(uploadDir, { recursive: true });
        const filePath = path.join(uploadDir, fileName);
        await fs.writeFile(filePath, buffer);

        // 4. save to Mongo
        const imageUrl = `/uploads/${fileName}`;
        const newCategory = await categoriesSchema.create({ name, slug, image: imageUrl });

        return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/categories:", error);
        return NextResponse.json(
            { message: "Something went wrong saving your category" },
            { status: 500 }
        );
    }
}




export async function GET(req) {
    try {
        await connectionDB(); // DB सँग connect गर्नुहोस्
        const categories = await categoriesSchema.find(); // सबै categories खोज्नुहोस्
        return NextResponse.json(categories, { status: 200 });
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 });
    }
}
