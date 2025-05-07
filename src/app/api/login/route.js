import connectionDB from "../../lib/db";
import adminSchema from "../../lib/models/admins/adminSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export async function POST(req) {
    try {
        await connectionDB();

        const { email, password } = await req.json();

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        // Find user
        const user = await adminSchema.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        const token = jwt.sign({ 
            id: user._id, 
            isAdmin: user.isAdmin 
        }, process.env.JWT_SECRET, 
        {expiresIn: "1d"});

        const response = NextResponse.json({ message: "Login successful" });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}