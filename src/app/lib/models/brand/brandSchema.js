const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image:  { type: String, required: true }
});

module.exports =mongoose.models.Brand || mongoose.model("Brands", brandSchema);
