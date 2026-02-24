import mongoose from "mongoose"
import { Schema } from "mongoose"

const deliverySchema = new Schema(
    {
        name: {
            type: String,
        },
        phone: {
            type: String,
            unique: true
        },
        province: {
            type: String
        },
        address: {
            type: String
        },
        type: {
            type: String
        },
        note: {
            type: String
        }
    },
    { timestamps: true, versionKey: false }
)

export default mongoose.model.Delivery || mongoose.model("Delivery", deliverySchema)