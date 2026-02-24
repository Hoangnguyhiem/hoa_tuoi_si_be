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
            ref: "Categories"
        },
        colorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Color"
        },
        price: {
            type: Number
        },
        quantity: {
            type: Number
        },
        total: {
            type: Number
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
            ref: "User"
        },
        deliveryId: {
            type: Schema.Types.ObjectId,
            ref: "Delivery"
        },
        note: {
            type: String
        },
        products: [productSchema],
        totalPrice: {
            type: Number
        },
        pay: {
            type: Number
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
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  next();
});

orderSchema.pre("save", function (next) {
  this.paid = this.totalPrice - this.pay;
  next();
});

productSchema.pre("save", function (next) {
    this.total = this.price * this.quantity;
    next();
});

export default mongoose.model.Order || mongoose.model("Order", orderSchema)