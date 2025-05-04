import connectionDB from "../../../lib/db";
import categoriesSchema from "../../../lib/models/categories/categoriesSchema";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    await connectionDB();

    try {
        const { id } = await params; // ✅ No await here
        const product = await categoriesSchema.findById(id);
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