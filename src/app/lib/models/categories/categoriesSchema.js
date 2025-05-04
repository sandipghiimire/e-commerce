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

const Category = mongoose.models.Category || mongoose.model("Category", categoriesSchema);
export default Category;