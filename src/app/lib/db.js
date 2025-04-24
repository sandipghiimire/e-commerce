import mongoose from "mongoose";
import { NextResponse } from "next/server";

export default async function connectionDB(){
    try {
        const dbconn = await mongoose.connect(process.env.MONGO_CONN);
        if(dbconn){
            return NextResponse.json({message:"Connected Successfully!!"})
        } else {
            return NextResponse.json({message:"error while connecting!!"})
        }
    } catch (error) {
        return NextResponse.json({message:"Unable to connect to the database!"})
    }
}