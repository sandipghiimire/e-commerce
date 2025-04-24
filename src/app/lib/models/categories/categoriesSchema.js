const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    image:  { type: String, required: true }
});

module.exports =mongoose.models.Category || mongoose.model("Category", categoriesSchema);
