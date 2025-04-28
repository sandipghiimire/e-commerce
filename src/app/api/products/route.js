import { NextResponse } from "next/server";
import connectionDB from "../../lib/db";
import productSchema from "../../lib/models/products/productSchema";
import path from "path";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
    try {
        await connectionDB();
        const formData = await req.formData();

        const productData = {
            title: formData.get("title"),
            description: formData.get("description"),
            categories: formData.get("categories"),
            brand: formData.get("brand"),
            stock: parseInt(formData.get("stock")),
            price: parseFloat(formData.get("price")),
            sale: parseFloat(formData.get("sale") || 0),
            saleprice: parseFloat(formData.get("saleprice") || 0),
            images: []
        };

        const imageFiles = formData.getAll("images");
        for (const imageFile of imageFiles) {
            if (imageFile instanceof File) {
                const arrayBuffer = await imageFile.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                const fileName = `${uuidv4()}-${imageFile.name}`;
                const uploadDir = path.join(process.cwd(), "public", "product-images");
                await fs.mkdir(uploadDir, { recursive: true });
                const filePath = path.join(uploadDir, fileName);
                await fs.writeFile(filePath, buffer);
                productData.images.push(`/product-images/${fileName}`);
            }
        }

        const newProduct = await productSchema.create(productData);
        return NextResponse.json(newProduct, { status: 201 });

    } catch (error) {
        console.error("Product POST Error:", error);
        return NextResponse.json(
            { message: "Error creating product" },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        await connectionDB();
        const products = await ProductSchema.find()
            .populate('brand')
            .populate('categories');
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching products" },
            { status: 500 }
        );
    }
}

export async function PUT(req) {
    try {
        await connectionDB();
        const { id, ...updateData } = await req.json();
        const updatedProduct = await ProductSchema.findByIdAndUpdate(id, updateData, { new: true });
        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error updating product" },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    try {
        await connectionDB();
        const { id } = await req.json();
        await ProductSchema.findByIdAndDelete(id);
        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting product" },
            { status: 500 }
        );
    }
}