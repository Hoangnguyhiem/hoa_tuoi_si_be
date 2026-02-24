import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
        },
        phone: {
            type: String,
            unique: true
        },
        address: {
            type: String,
        },
        avatar: {
            type: String,
            default: "../upload/default-avatar.jpeg",
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model.User || mongoose.model("User", userSchema);
