import { NextResponse } from "next/server";
import connectionDB from "../../lib/db";
import Product from "../../lib/models/products/productSchema";
import path from "path";
import { promises as fs } from "fs";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
    try {
        await connectionDB();

        const contentType = req.headers.get("content-type") || "";
        if (!contentType.includes("multipart/form-data")) {
            return NextResponse.json(
                { message: "Content-Type must be multipart/form-data" },
                { status: 400 }
            );
        }
        
        const formData = await req.formData();
        const title = formData.get("title");
        const description = formData.get("description");
        const categories = formData.get("categories");
        const brand = formData.get("brand");
        const stock = parseInt(formData.get("stock"));
        const sale = parseFloat(formData.get("sale") || 0);
        const saleprice = parseFloat(formData.get("saleprice") || 0);
        const isFeature = formData.get("isFeature") === "true";
        
        const featureImageFile = formData.get("featureImage");

        // Upload directory
        const uploadDir = path.join(process.cwd(), "public", "product-images");
        await fs.mkdir(uploadDir, { recursive: true });

        // Save feature image
        const featureImageName = `${uuidv4()}-${featureImageFile.name}`;
        const featureImagePath = path.join(uploadDir, featureImageName);
        await fs.writeFile(featureImagePath, Buffer.from(await featureImageFile.arrayBuffer()));

        // Save multiple images
        const imageFiles = formData.getAll("images");
        const imagePaths = [];

        for (const imageFile of imageFiles) {
            const imageName = `${uuidv4()}-${imageFile.name}`;
            const imagePath = path.join(uploadDir, imageName);
            await fs.writeFile(imagePath, Buffer.from(await imageFile.arrayBuffer()));
            imagePaths.push(`/product-images/${imageName}`);
        }

        const newProduct = await Product.create({
            title,
            description,
            categories,
            brand,
            stock,
            sale,
            saleprice,
            isFeature,
            featureImage: `/product-images/${featureImageName}`,
            images: JSON.stringify(imagePaths),
        });

        return NextResponse.json(newProduct, { status: 201 });

    } catch (error) {
        console.error("Product POST Error:", error);
        return NextResponse.json(
            { message: "Error creating product", error: error.message },
            { status: 500 }
        );
    }
}

export async function GET(req) {
    try {
        await connectionDB();
        const products = await Product.find()
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
        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
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
        await Product.findByIdAndDelete(id);
        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting product" },
            { status: 500 }
        );
    }
}