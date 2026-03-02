import mongoose from "mongoose"
import { Schema } from "mongoose"

const deliverySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            unique: true,
            required: true
        },
        province: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        note: {
            type: String
        }
    },
    { timestamps: true, versionKey: false }
)

export default mongoose.model.Delivery || mongoose.model("Delivery", deliverySchema)