import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const helperFunction = (req) => {
    try {
        const token = req.cookies.get("token")?.value || "";
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded.id)
        return decoded.id;
    } catch (error) {
        return NextResponse.json({ message: "Unable to get the token!!" }, { status: 400 })
    }
}
