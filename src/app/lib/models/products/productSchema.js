const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            // required: [true, 'Product name is required'],
            trim: true
        },
        description: {
            type: String,
            // required: [true, 'Description is required']
        },
        categories: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            // required: [true, 'Category is required']
        },
        brand: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brand',
            // required: [true, 'Brand is required']
        },
        stock: {
            type: Number,
            // required: [true, 'Stock is required'],
            min: [0, 'Stock cannot be negative']
        },
        sale: {
            type: Number,
            // default: 0,
            // min: 0,
            // max: 100
            required: true,
        },
        saleprice: {
            type: Number,
            // required: function () { return this.sale > 0; },
            // validate: {
            //     validator: function (v) {
            //         return v < this.originalPrice;
            //     },
            //     message: 'Sale price must be less than original price'
            // }
        },
        // this f
        images: {
            type: String,
            required: true
        },
        featureImage:{
            type: String,
            required: true
        },
        isFeature : {
            type: Boolean,
            default: false
        }
    }
)

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;