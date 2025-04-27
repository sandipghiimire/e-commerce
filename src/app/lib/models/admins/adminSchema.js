const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: true,
    },
    image: { type: String, required: true }
});

module.exports = mongoose.models.Admin || mongoose.model("Admins", adminSchema);
