import mongoose from "mongoose";
import { Schema } from "mongoose";

const categoriesSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {timestamps: true, versionKey: false}
)

export default mongoose.model.Categories || mongoose.model("Categories", categoriesSchema)