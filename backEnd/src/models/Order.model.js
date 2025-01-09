import mongoose from "mongoose";


const orderSchema = new mongoose.Schema(
    {
        user:{
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true
        },
        
        products:[
            {
                product:{
                    type: mongoose.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity:{
                    type: Number,
                    default: 1,
                    required: true
                }
            }
        ],
        address:{
            fullName:{
                type: String,
                required: true
            },
            mobile:{
                type: Number,
                required: true
            },
            city:{
                type: String,
                required: true
            },
            street:{
                type: String,
                required: true
            }
        },
        totalPrice:{
            type: Number,
            required: true
        },
        status:{
            type: String,
            default: "Created",
            // enum: ["Created, Processing", "Shipped", "Delivered", "Cancelled"]
        }
    },
    {
        timestamps: true
    }
)


export const Order = mongoose.model("Order", orderSchema)