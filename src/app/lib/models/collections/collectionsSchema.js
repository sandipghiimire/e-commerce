import mongoose from 'mongoose';

const { Schema } = mongoose;

const collectionsSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Collection name is required'],
            trim: true,
        },
        subtitle: {
            type: String,
            required: [true, 'Subtitle is required'],
            trim: true,
        },
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, 'At least one product must be selected'],
            },
        ],
        image: {
            type: String,
            required: [true, 'Image URL is required'],
        },
    },
    {
        timestamps: true,
    }
);

const Collection = mongoose.models.Collection || mongoose.model("Collection", collectionsSchema);
export default Collection;