const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
    },
    number:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    image: { type: String, required: true }
});

module.exports = mongoose.models.Admins || mongoose.model("Admins", adminSchema);
