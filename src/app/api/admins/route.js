import { NextResponse } from "next/server";
import connectionDB from "../../lib/db";
import adminSchema from "../../lib/models/admins/adminSchema";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        await connectionDB();

        // Add isAdmin to the destructured fields
        const { name, email, number, password, image, isAdmin } = await req.json();

        if (!name || !email || !number || !password) {
            return NextResponse.json({ ok: false, message: "All fields are required." }, { status: 400 });
        }

        const existEmail = await adminSchema.findOne({ email });
        if (existEmail) {
            return NextResponse.json({ ok: false, message: "Email already exists." }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new adminSchema({
            name,
            email,
            password: hashedPassword,
            number,
            image,
            isAdmin // Add the isAdmin field to the user document
        });

        await user.save();

        return NextResponse.json({
            ok: true,
            message: `User ${isAdmin ? 'Admin' : ''} created successfully!`
        }, { status: 201 });

    } catch (error) {
        console.error("Error registering user:", error);
        return NextResponse.json({
            ok: false,
            message: "Internal Server Error"
        }, { status: 500 });
    }
}





export async function GET(req) {
    try {
        await connectionDB();
        const categories = await adminSchema.find();
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
        const response = await adminSchema.findByIdAndDelete(id);
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
