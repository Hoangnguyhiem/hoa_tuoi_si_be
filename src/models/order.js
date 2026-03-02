import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categories",
            required: true
        },
        colorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Color",
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        bundle: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
        },
        status: {
            type: Boolean,
            default: false
        }

    }
)

const orderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        deliveryId: {
            type: Schema.Types.ObjectId,
            ref: "Delivery",
            required: true
        },
        note: {
            type: String
        },
        products: [productSchema],
        totalPrice: {
            type: Number
        },
        pay: {
            type: Number,
            default: 0
        },
        otherFee: {
            type: Number,
            default: 0
        },
        paid: {
            type: Number
        }
    },
    { timestamps: true, versionKey: false }
)

// → mỗi lần save order → tự tính total
orderSchema.pre("save", function (next) {
  this.totalPrice = this.products.reduce(
    (sum, item) => sum + item.price * item.bundle * item.quantity,
    0
  );
  next();
});

orderSchema.pre("save", function (next) {
  this.paid = this.totalPrice + this.otherFee - this.pay;
  next();
});

productSchema.pre("save", function (next) {
    this.total = this.price * this.bundle * this.quantity;
    next();
});

export default mongoose.model.Order || mongoose.model("Order", orderSchema)