import mongoose, { Schema } from "mongoose";

const colorSchema = new Schema(
    {
        name: {
            type: String
        }
    },
    { timestamps: true, versionKey: false }

)

export default mongoose.model.Color || mongoose.model("Color", colorSchema)
