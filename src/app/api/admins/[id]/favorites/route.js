import { NextResponse } from "next/server";
import connectionDB from "../../../../lib/db";
import adminSchema from "../../../../lib/models/admins/adminSchema";

// POST method to update favorites list of a user
export async function POST(request, { params }) {
  try {
    await connectionDB();

    const { id } = params;
    const body = await request.json();
    const { list } = body;

    const updatedUser = await adminSchema.findByIdAndUpdate(
      id,
      { favorites: list },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Favorites updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating favorites:", error);
    return NextResponse.json(
      { message: "Unable to update favorites", error: error.message },
      { status: 500 }
    );
  }
}
