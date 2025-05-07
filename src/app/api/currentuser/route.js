import adminSchema from "../../lib/models/admins/adminSchema";
import { helperFunction } from "../../Helper/helperFunction";
import { NextResponse } from "next/server";
import connectionDB from "../../lib/db";

// export async function GET(req) {
//     try {
//         const userId = helperFunction(req);

//         if (!userId) {
//             return NextResponse.json({ message: "Unauthorized!" }, { status: 401 });
//         }

//         const data = await adminSchema.findOne({ _id: userId }).select("-password");

//         return NextResponse.json({ data }, { status: 200 });
//     } catch (error) {
//         console.error("Error fetching admin:", error);
//         return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//     }
// }


// export async function GET(req) {
//   // now await the helper
//   const userId = await helperFunction();  
//   console.log("Decoded User ID:", userId);

//   if (!userId) {
//     return NextResponse.json(
//       { message: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   const data = await adminSchema
//     .findOne({ _id: userId })
//     .select("-password");

//   return NextResponse.json({ data }, { status: 200 });
// }




export async function GET(request){
    await connectionDB();
    try {
        const userId = helperFunction(request);
        console.log("his is user details", userId)
        const data = await adminSchema.findOne({_id: userId}).select('-password');
        return NextResponse.json({message:"User Found!!", data});
    } catch (error) {
        return NextResponse.json({message:"Unable to fetch the data!"},{status:400})
    }
}