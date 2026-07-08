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
            required: true,
        },
        note: {
            type: String
        },
        products: [productSchema],
        userPhone: {
            type: String,
        },
        userAddress: {
            type: String,
        },
        pin: {
            type: Boolean,
            default: false
        },
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
        },
        status: {
            type: String,
            enum: [
                "pending",
                "success",
            ],
            default: "pending"
        }
    },
    { timestamps: true, versionKey: false }
)

const updateTotals = (order) => {

    order.products = order.products.map((item) => ({
        ...item,
        total: item.price * item.bundle * item.quantity
    }));

    order.totalPrice = order.products.reduce(
        (sum, item) => sum + item.total,
        0
    );

    order.paid =
        order.totalPrice +
        order.otherFee -
        order.pay;
};


orderSchema.statics.updateStatus = async function(orderId){

    const order = await this.findById(orderId);
    
    if(!order) return;

    const allCompleted = order.products.every(
        item=>item.status
    );

    order.status =
        allCompleted && order.paid===0
            ?"success"
            :"pending";

    await order.save();

}

orderSchema.pre("save", function (next) {
    updateTotals(this);
    next();
});

orderSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();
    updateTotals(update);
    next();
});




export default mongoose.model.Order || mongoose.model("Order", orderSchema)