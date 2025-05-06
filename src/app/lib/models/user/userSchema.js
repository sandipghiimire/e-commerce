import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isAdmin: {
        type: Boolean,
        default:false
    },
    favorites: [{ type: String }]
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
