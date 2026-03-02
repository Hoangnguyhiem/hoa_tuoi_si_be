import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
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
        address: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            default: "../upload/default-avatar.jpeg",
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model.User || mongoose.model("User", userSchema);
