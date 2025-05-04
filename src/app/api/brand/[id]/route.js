import connectionDB from "../../../lib/db";
import brandSchema from "../../../lib/models/brand/brandSchema"
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    await connectionDB();

    try {
        const { id } = await params;
        const product = await brandSchema.findById(id);
        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json( product ); 
    } catch (error) {
        return NextResponse.json(
            { error: "Error fetching brand", details: error.message },
            { status: 500 }
        );
    }
}