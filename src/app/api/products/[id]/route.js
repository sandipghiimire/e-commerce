import connectionDB from '../../../lib/db';
import Product from '../../../lib/models/products/productSchema';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
    await connectionDB();

    try {
        const { id } = await params;
        const formData = await request.formData();

        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
            categories: formData.get("categories"),
            brand: formData.get("brand"),
            stock: Number(formData.get("stock")),
            sale: Number(formData.get("sale")),
            saleprice: Number(formData.get("saleprice")),
        };

        const updatedProduct = await Product.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!updatedProduct) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Product updated", product: updatedProduct });
    } catch (error) {
        return NextResponse.json(
            { error: "Error updating product", details: error.message },
            { status: 500 }
        );
    }
}


export async function GET(request, { params }) {
    await connectionDB();

    try {
        const { id } = await params; // ✅ No await here
        const product = await Product.findById(id)
            .populate('brand')
            .populate('categories');

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json( product ); // ✅ Return as an object
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching product", details: error.message },
            { status: 500 }
        );
    }
}
